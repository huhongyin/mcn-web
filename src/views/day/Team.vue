<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            团队日榜
        </div>
        <el-table :data="list" border :span-method="objectSpanMethod">
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
            // if (columnIndex === 0) {
            //     if(rowIndex === 0){
            //         return {
            //             rowspan: (this.list.length - 1),
            //             colspan: 1,
            //         }
            //     } else if(rowIndex == (this.list.length - 1)){
            //         return {
            //             rowspan: 1,
            //             colspan: 12,
            //         }
            //     }else{
            //         return {
            //             rowspan: 0,
            //             colspan: 0,
            //         }
            //     }
            // }else if(columnIndex === 1){
            //     if(rowIndex === 0){
            //         return {
            //             rowspan: (this.list.length - 1),
            //             colspan: 1,
            //         }
            //     }else{
            //         return {
            //             rowspan: 0,
            //             colspan: 0,
            //         }
            //     }
            // }else if(columnIndex > 0 && columnIndex < 12){
            //     if(rowIndex == (this.list.length - 1)){
            //         return {
            //             rowspan: 0,
            //             colspan: 0,
            //         }
            //     }
            // }
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
        }
    }
}
</script>

<style lang='less' scoped>
    .el-table_2_column_19  {
        text-align: center;
    }
</style>
