<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <el-row :gutter="10">
                <el-col :span="4">团队日榜</el-col>
                <el-col :span="4" :offset="16">
                    <el-button @click="exportExcel" style="float:right;">导出</el-button>
                </el-col>
            </el-row>
        </div>
        <el-table :data="list" border :span-method="objectSpanMethod" id="out-table">
        <!-- <el-table :data="list" border> -->
            <el-table-column label="序号" prop="id" fixed></el-table-column>
            <el-table-column label="负责人" prop="operate_user.rel_name" fixed></el-table-column>
            <el-table-column label="序号" prop="ids" fixed></el-table-column>
            <el-table-column label="主播昵称" prop="nickname" fixed></el-table-column>
            <el-table-column label="主播ID" prop="plat_actor_id" fixed width="100px;"></el-table-column>
            <el-table-column label="扶持截止日期" prop="actor_plat_sign.support_endtime" width="120px;"></el-table-column>
            <el-table-column label="扶持金额" prop="actor_plat_sign.support_money"></el-table-column>
            <el-table-column label="开播日期" prop="start_time" width="100px;"></el-table-column>
            <el-table-column label="平台" prop="plat.name"></el-table-column>
            <el-table-column label="主播级别" prop="level.name"></el-table-column>
            <el-table-column label="应有时长" prop="should_time"></el-table-column>
            <el-table-column label="应播天数" prop="should_day"></el-table-column>
            <el-table-column label="时长" prop="time"></el-table-column>
            <el-table-column label="有效天数" prop="youxiaotianshu"></el-table-column>
            <el-table-column label="1日收入" prop="one_day_money"></el-table-column>
            <el-table-column :label="month_title" prop="month_money" width="100px;"></el-table-column>
            <el-table-column label="日均收票" prop="day_avg"></el-table-column>
            <el-table-column label="备注" prop="remark"></el-table-column>
        </el-table>
    </el-card>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import { get } from '@/api/index.js';
import teamApi from '@/api/team.js';

export default {
    created(){
        this.getData()
    },
    data(){
        return {
            month_title: '',
            list: [],
            count: [],
        }
    },
    methods:{
        getData(){
            get(teamApi.dayList).then((res) => {
                this.list = res.data.list
                this.count = res.data.count
                this.month_title = res.data.month + '月总收入'
            })
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
</style>
