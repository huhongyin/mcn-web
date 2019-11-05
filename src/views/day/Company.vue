<template>
    <el-card class="box-card" :style="'height:'+ cardHeight +';'">
        <div slot="header" class="clearfix">
            <el-row :gutter="10">
                <el-col :span="2" style="line-height:40px;text-align:center;">
                    公司榜
                </el-col>
                <el-col :span="4">
                    <el-date-picker type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" v-model="search.date" placeholder="选择查询截止日期" style="max-width:100%;"></el-date-picker>
                </el-col>
                <el-col :span="3">
                    <el-button type="primary" @click="getData">搜索</el-button>
                </el-col>
                <el-col :span="2" :offset="13">
                    <el-button @click="exportExcel" style="float:right;">导出</el-button>
                </el-col>
            </el-row>
        </div>
        <div style="width:100%;height:100%;">
            <div :style="'height:' + tableHeight + ';width: 100%'">
                <pl-table :datas="list" :height-change="true" :pagination-show="false" border id="out-table" v-loading="loading" ref="plTable" header-drag-style use-virtual :row-height="50">
                    <pl-table-column label="序号" prop="id" fixed></pl-table-column>
                    <pl-table-column label="主播昵称" prop="nickname" fixed></pl-table-column>
                    <pl-table-column label="原始ID" prop="plat_actor_id" fixed></pl-table-column>
                    <pl-table-column label="开播日期" prop="start_time" fixed></pl-table-column>
                    <pl-table-column label="主播级别" prop="level.name" fixed width="100px;"></pl-table-column>
                    <pl-table-column label="主播平台" prop="plat.name" width="120px;"></pl-table-column>
                    <pl-table-column label="上月同期收益" prop="last_month_money"></pl-table-column>
                    <pl-table-column label="时长" prop="time" width="100px;"></pl-table-column>
                    <pl-table-column :label="month_title" prop="total_money"></pl-table-column>
                    <pl-table-column label="日均收益" prop="day_avg"></pl-table-column>
                    <pl-table-column label="累积总收益" prop="all_money"></pl-table-column>
                    <pl-table-column label="所属公司" prop="company.name"></pl-table-column>
                </pl-table>
            </div>
        </div>
    </el-card>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import { get } from '@/api/index.js';
import teamApi from '@/api/team.js';

export default {
    data(){
        return {
            tableHeight: '200px',
            cardHeight: 'unset',
            month_title: '',
            list: [],
            count: 0,
            search: {
                date: '',
                page: 1,
            },
            loading: false,
        }
    },
    created(){
        this.getData()
        this.search.date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
    },
    methods:{
        getData(){
            this.loading = true
            get(teamApi.companyList, this.search).then((res) => {
                this.loading = false
                this.list = res.data.list
                this.month_title = res.data.month + '月总收入'
                if(this.list.length > 0){
                    this.tableHeight = '100%'
                    this.cardHeight = '100%'
                }else{
                    this.cardHeight = 'unset'
                    this.tableHeight = '200px'
                }
            })
        },
        handleCurrentChange(page){
            this.search.page = page
            this.getData()
        },
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            if(columnIndex === 0 || columnIndex === 1){
                var rowspan = 0
                var colspan = 0;
                if(typeof(row.rowspan) != 'undefined'){
                    rowspan = row.rowspan - 1
                }
                if(typeof(row.colspan) != 'undefined'){
                    colspan = row.colspan
                }
                if(row.type == 'total' && columnIndex === 0){
                    rowspan = 1
                    return {
                        rowspan: rowspan,
                        colspan: colspan,
                    }
                }
                return {
                    rowspan: rowspan,
                    colspan: colspan,
                }
            }else if(columnIndex > 0 && columnIndex < 12){
                if(row.type == 'total'){
                    return {
                        rowspan: 0,
                        colspan: 0,
                    }
                }
            }else{
                return {
                    rowspan: 1,
                    colspan: 1,
                }
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
            var id = "#out-table"
            var title = '团队日榜.xlsx'
            var fix = document.querySelector('.el-table__fixed');
            var wb;
            if (fix) {
                wb = XLSX.utils.table_to_book(document.querySelector(id).removeChild(fix));
                document.querySelector(id).appendChild(fix);
            } else {
                wb = XLSX.utils.table_to_book(document.querySelector(id));
            }
            /* get binary string as output */
            var wbout = XLSX.write(wb, {
                bookType: 'xlsx',
                bookSST: true,
                type: 'array'
            });
            try {
                FileSaver.saveAs(
                new Blob([wbout], {
                    type: 'application/octet-stream'
                }),
                title
                );
            } catch (e) {
                if (typeof console !== 'undefined') console.log(e, wbout);
            }
            return wbout;
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
