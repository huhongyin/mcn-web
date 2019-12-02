<template>
    <el-card class="box-card" :style="'height:'+ cardHeight +';'">
        <div slot="header" class="clearfix">
                    公司榜
        </div>
        <el-row :gutter="10">
            <el-col :span="2" style="line-height:40px;">
                <el-select v-model="search.company_id">
                    <el-option v-for="(company,key) in companies" :key="key" :label="company.name" :value="company.id"></el-option>
                </el-select>
            </el-col>
            <el-col :span="2" style="line-height:40px;">
                <el-select v-model="search.plat_id">
                    <el-option v-for="(plat,key) in plats" :key="key" :label="plat.name" :value="plat.id"></el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-date-picker type="daterange" value-format="yyyy-MM-dd" format="yyyy-MM-dd" v-model="search.date" start-placeholder="开始日期" end-placeholde="结束日期" style="max-width:100%;"></el-date-picker>
            </el-col>
            <el-col :span="3">
                <el-button type="primary" @click="getData">搜索</el-button>
            </el-col>
            <el-col :span="2" :offset="9">
                <el-button @click="exportExcel" style="float:right;">导出</el-button>
            </el-col>
        </el-row>
        <div style="width:100%;height:90%;margin-top:1rem;">
            <div :style="'height:' + tableHeight + ';width: 100%'">
                <pl-table :datas="list" :height-change="true" :span-method="objectSpanMethod" :pagination-show="false" border id="tableData" v-loading="loading" ref="plTable" header-drag-style use-virtual :row-height="50">
                    <pl-table-column label="序号" prop="id"></pl-table-column>
                    <pl-table-column label="主播昵称" prop="nickname"></pl-table-column>
                    <pl-table-column label="原始ID" prop="plat_actor_id"></pl-table-column>
                    <pl-table-column label="开播日期" prop="start_time"></pl-table-column>
                    <pl-table-column label="主播级别" prop="level.name" width="100px;"></pl-table-column>
                    <pl-table-column label="主播平台" prop="plat.name" width="120px;"></pl-table-column>
                    <pl-table-column :label="day_title" prop="day_money" width="120px;"></pl-table-column>
                    <pl-table-column label="上月同期收益" prop="last_month_money"></pl-table-column>
                    <pl-table-column label="时长" prop="time" width="100px;"></pl-table-column>
                    <pl-table-column :label="month_title" prop="total_money"></pl-table-column>
                    <pl-table-column label="日均收益" prop="day_avg"></pl-table-column>
                    <pl-table-column :label="all_money_title" prop="all_money"></pl-table-column>
                    <pl-table-column label="所属公司" prop="company.name"></pl-table-column>
                </pl-table>
            </div>
        </div>
    </el-card>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import { exportJsonToExcel, formatJson } from 'pl-export-excel'
import { get } from '@/api/index.js';
import teamApi from '@/api/team.js';
import platApi from '@/api/plats.js';
import companyApi from '@/api/company.js';

export default {
    data(){
        return {
            tableHeight: '200px',
            cardHeight: 'unset',
            all_money_title: '',
            month_title: '',
            day_title: '',
            list: [],
            plats: [],
            companies: [],
            count: 0,
            search: {
                date: [],
                plat_id: '',
                company_id: "",
                page: 1,
            },
            loading: false,
        }
    },
    created(){
        this.getCompanies()
        this.getPlat()
        this.search.date = [new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-01', new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()]
    },
    methods:{
        getData(){
            this.loading = true
            get(teamApi.companyList, this.search).then((res) => {
                this.loading = false
                this.list = res.data.list
                this.month_title = res.data.month
                this.day_title = res.data.day_title
                this.all_money_title = res.data.all_money_title
                if(this.list.length > 0){
                    this.tableHeight = '80%'
                    this.cardHeight = '120%'
                }else{
                    this.cardHeight = 'unset'
                    this.tableHeight = '200px'
                }
            })
        },
        getPlat(){
            get(platApi.list).then((res) => {
                this.plats = res.data.list
                // this.plats.unshift({id: "", name: "全平台"})
                this.search.plat_id = this.plats[0].id
                this.getData()
            })
        },
        getCompanies(){
            get(companyApi.list, { type: 'select' }).then((res) => {
                this.companies = res.data.list
                this.companies.unshift({id: '', name: "全部"})
            })
        },
        handleCurrentChange(page){
            this.search.page = page
            this.getData()
        },
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            if(row.row_type === 'total'){
                if(columnIndex == 0){
                    return {
                        rowspan: 0,
                        colspan: 0,
                    }
                }else if(columnIndex === 1){
                    var rowspan = 1
                    var colspan = 1;
                    if(row.rowspan > 0){
                        rowspan = row.rowspan
                    }
                    if(row.colspan > 0){
                        colspan = row.colspan
                    }

                    return {
                        rowspan: rowspan,
                        colspan: colspan,
                    }
                }else{
                    return {
                        colspan: 0,
                        rowspan: 0,
                    }
                }
            }
            return {
                rowspan: 1,
                colspan: 1,
            }
        },
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '合计';
                    return;
                }
                if(index === 2){
                    sums[index] = '';
                    return ;
                }
                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                    const value = Number(curr);
                    if (!isNaN(value)) {
                        return prev + curr;
                    } else {
                        return prev;
                    }
                    }, 0);
                    sums[index] += '';
                } else {
                    sums[index] = '';
                }
            });

            return sums;
        },
        exportExcel2 () {
            /* out-table关联导出的dom节点  */
            var wb = XLSX.utils.table_to_book(document.querySelector('#tableData'))
            /* get binary string as output */
            var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
            try {
                FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '药品信息.xlsx')
            } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
            return wbout
        },
        exportExcel () {
            const tHeader = ['序号', '主播昵称', '原始ID', '开播日期', '主播级别', '主播平台', this.day_title, '上月同期收益', '时长', this.month_title, '日均收益', this.all_money_title, '所属公司']
            const filterVal = ["id", "nickname", "plat_actor_id", "start_time", "level", "plat_name", "day_money", "last_month_money", "time", "total_money", "day_avg", "all_money", "company_name"]
            const list = this.list
            const data = formatJson(filterVal, list)
            exportJsonToExcel({

                header: tHeader, // 表头

                data: data, // 表格数据

                filename: '公司榜', // 表格名称

                autoWidth: true, // 自适应宽度

                bookType: 'xlsx' // 导出文件的类型

            })
        },
    }
}
</script>

<style lang='less' scoped>
    .el-table_2_column_19  {
        text-align: center;
    }
    .el-table .el-table--fit .el-table--border{
        height: 100%;
    }
    .ant-table-scroll{
        height: 100%;
    }
</style>
