<template>
    <el-card class="box-card" :style="'height:'+ cardHeight +';'">
        <div slot="header" class="clearfix">
            <span>{{ title }}</span>
            <el-button @click="exportExcel" style="float:right;padding: 3px 0;" type="text">导出</el-button>
        </div>
        <div style="width:100%;height:90%;">
            <div :style="'height:' + tableHeight + ';width: 100%'">
                <el-row :gutter="10" style="margin-bottom:1rem;">
                    <el-col :span="2" style="line-height:40px;">
                        <el-select v-model="search.company_id">
                            <el-option v-for="(item,key) in companies" :key="key" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="6">
                        <el-date-picker type="daterange" value-format="yyyy-MM-dd" format="yyyy-MM-dd" v-model="search.date" start-placeholde="开始日期" end-placeholde="结束日期" style="max-width:100%;"></el-date-picker>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="primary" @click="getData">搜索</el-button>
                    </el-col>
                </el-row>
                <pl-table :datas="list" :height-change="true" :span-method="objectSpanMethod" :pagination-show="false" border id="out-table" v-loading="loading" ref="plTable" header-drag-style use-virtual :row-height="50">
                    <pl-table-column label="签约人" prop="user_name"></pl-table-column>
                    <pl-table-column label="前台总流水" prop="total_money"></pl-table-column>
                    <pl-table-column label="直播总有效时长" prop="total_time"></pl-table-column>
                    <pl-table-column label="签约数量" prop="sign_count"></pl-table-column>
                    <!-- <pl-table-column label="未播主播数量" prop="not_live" width="100px;"></pl-table-column> -->
                    <pl-table-column label="公司" prop="company_name" width="120px;"></pl-table-column>
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
import companyApi from '@/api/company.js';

export default {
    data(){
        return {
            title: "",
            tableHeight: '200px',
            cardHeight: 'unset',
            all_money_title: '',
            month_title: '',
            day_title: '',
            list: [],
            companies: [],
            count: 0,
            search: {
                date: [],
                plat_id: '',
                page: 1,
                type: "",
            },
            loading: false,
        }
    },
    watch: {
        $route(){
            this.init()
        },
    },
    created(){
        this.init()
    },
    methods:{
        init(){
            this.search.type = this.$route.query.type
            switch(this.search.type){
                case '1':
                        this.title = "运营数据排名"
                    break;
                case '2':
                        this.title = "签约数据排名"
                    break;
            }
            this.search.date = [
                new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + (new Date().getDay()),
                new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + (new Date().getDay())
            ]
            this.getCompanies()
        },
        getData(){
            this.loading = true
            get(teamApi.signList, this.search).then((res) => {
                this.loading = false
                this.list = res.data.list
                if(this.list.length > 0){
                    this.tableHeight = '100%'
                    this.cardHeight = '100%'
                }else{
                    this.cardHeight = 'unset'
                    this.tableHeight = '200px'
                }
            })
        },
        getCompanies(){
            get(companyApi.list, { type: 'select' }).then((res) => {
                this.companies = res.data.list
                if(this.companies.length > 1){
                    this.companies.unshift({ id: "", name: "全部" })
                }
                this.search.company_id = this.companies[0].id
                this.getData()
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
        exportExcel () {
            const tHeader = ['签约人', '前台总流水', '主播总有效时长', '签约数量', '未播主播数量', '公司']
            const filterVal = ["user_name", "total_money", "total_time", "sign_count", "not_live", "company_name"]
            const list = this.list
            const data = formatJson(filterVal, list)
            exportJsonToExcel({

                header: tHeader, // 表头

                data: data, // 表格数据

                filename: '签约数据排名', // 表格名称

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
