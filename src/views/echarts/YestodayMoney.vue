<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span v-text="title"></span>
        </div>
        <el-row :gutter="10">
            <el-col :span="5">
                <el-date-picker v-model="search.date" style="float: left;" align="left" type="date" placeholder="日期" :picker-options="pickerOptions"></el-date-picker>
            </el-col>
        </el-row>
        <el-table show-summary :summary-method="getSummaries" id="managementTable" stripe ref="multipleTable" :data="list" tooltip-effect="dark" :header-cell-style="{background:'#EFF5F9'}">
                <el-table-column fixed label="主播实名" prop="name"></el-table-column>
                <el-table-column fixed label="主播昵称" prop="nickname"></el-table-column>
                <el-table-column label="总流水(元)" prop="total_money"></el-table-column>
            </el-table>
            <el-pagination class="right offset-top-31 offset-bottom-46" background layout="prev, pager, next" :page-count="totalPage" @current-change="handleCurrentChange"></el-pagination>
    </el-card>
</template>

<script>
import { fPost, get} from '@/api/index.js';
import userApi from '@/api/user.js';
import FileSaver from 'file-saver';
import XLSX from 'xlsx';
export default {
    created(){
        this.getData()
    },
    data(){
        return {
            title: '',
            search: {
                date: '',
            },
            totalPage: 2,
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
            list: [
                {
                    name: '张三',   //真实姓名
                    nickname: '小花儿',
                    total_money: '20000', //总流水
                },
                {
                    name: '李四',   //真实姓名
                    nickname: '小鱼儿',
                    total_money: '15694', //总流水
                },
                {
                    name: '王二',   //真实姓名
                    nickname: '小花儿',
                    total_money: '20000', //总流水
                },
            ],
        }
    },
    created(){
        this.title = this.$route.query.title
        this.search.date = this.$route.query.date
    }, 
    methods:{
        
        getData(){
            // var params = { page: this.current}
            // var that = this
            // get(userApi.list, params)
            //     .then(function(res){
            //         that.list = res.data.list.data
            //         that.total = res.data.list.total
            //         that.current = res.data.list.current_page
            //         // that.totalPage = res.data.totalPage
            //     })
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
