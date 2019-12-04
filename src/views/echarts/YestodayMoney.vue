<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span v-text="title"></span>
        </div>
        <el-row :gutter="10">
            <el-col :span="6">
                <el-date-picker v-model="search.date" style="float: left;max-width:100%;" align="left" type="daterange" placeholder="日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
            </el-col>
            <el-col :span="3">
                <el-button type="primary" @click="searchData">搜索</el-button>
            </el-col>
        </el-row>
        <el-table show-summary :summary-method="getSummaries" id="managementTable" stripe ref="multipleTable" :data="list" tooltip-effect="dark" :header-cell-style="{background:'#EFF5F9'}">
                <el-table-column fixed label="主播昵称" prop="actor_plat.nickname"></el-table-column>
                <el-table-column fixed label="签约人" prop="actor_plat.sign_user.rel_name"></el-table-column>
                <el-table-column label="总流水(元)" :prop="money_field"></el-table-column>
            </el-table>
            <el-pagination class="right offset-top-31 offset-bottom-46" background layout="prev, pager, next" :page-count="totalPage" @current-change="handleCurrentChange"></el-pagination>
    </el-card>
</template>

<script>
import { get } from '@/api/index.js';
import platApi from '@/api/plats.js';
export default {
    created(){
        this.getData()
    },
    data(){
        return {
            title: '',
            plat_id: '',
            search: {
                date: [],
                page: 1,
            },
            money_field: '',
            totalPage: 1,
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                    picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24);
                    picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', date);
                    }
                }]
            },
            list: [],
        }
    },
    created(){
        this.title = this.$route.query.title
        this.plat_id = this.$route.query.plat_id
        this.search.date = [this.$route.query.startDate, this.$route.query.endDate]
        this.getData()
    }, 
    methods:{
        handleCurrentChange(val){
            this.search.page = val
            this.getData()
        },
        searchData(){
            this.search.page = 1
            this.getData()
        },
        getData(){
            get(platApi.platYestodayMoneyList + this.plat_id, this.search).then((res) => {
                this.list = res.data.list.data
                this.totalPage = res.data.list.last_page
                this.money_field = res.data.money_field
            })
        },
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
            if (index === 0) {
                sums[index] = '合计';
                return;
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
                sums[index] += ' 元';
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
.el-dialog--center .el-dialog__body{
    text-align: center;
}
.color-red:hover{
    color:red;
}
.color-blue:hover{
    color: #409EFF;
}
.el-row{
    margin-bottom: 20px;
}
</style>
