<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span v-text="title"></span>
            <!-- <span style="color:red;">(共{{ total }}人)</span> -->
        </div>
        <el-table show-summary :summary-method="calTime" stripe :data="list" tooltip-effect="dark" :header-cell-style="{background:'#EFF5F9'}">
            <el-table-column fixed label="主播实名" prop="name"></el-table-column>
            <el-table-column fixed label="主播昵称" prop="nickname"></el-table-column>
            <el-table-column label="平台" prop="plat.name"></el-table-column>
            <el-table-column label="在线时长" prop="time"></el-table-column>
        </el-table>
        <el-pagination class="right offset-top-31 offset-bottom-46" background :total="total" layout="total, prev, pager, next" @current-change="handleCurrentChange"></el-pagination>
    </el-card>
</template>

<script>
import { fPost, get} from '@/api/index.js';
import userApi from '@/api/user.js';
import FileSaver from 'file-saver';
import XLSX from 'xlsx';
import { string } from 'prop-types';
export default {
    created(){
        this.getData()
    },
    data(){
        return {
            total: 3,
            title: '',
            totalPage: 1,
            list: [
                {
                    name: '张三',   //真实姓名
                    nickname: '小花儿',
                    plat: {
                        name: '抖音', //所属平台
                    },
                    time: '20小时34分',
                },
                {
                    name: '李四',   //真实姓名
                    nickname: '小鱼儿',
                    plat: {
                        name: '火山', //所属平台
                    },
                    time: '20小时34分',
                },
                {
                    name: '王二',   //真实姓名
                    nickname: '小花儿',
                    plat: {
                        name: '抖音', //所属平台
                    },
                    time: '20小时34分',
                },
            ],
        }
    },
    created(){
        this.title = this.$route.query.title
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
        calTime(param){
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '合计';
                    return;
                }

                const values = data.map(item => item[column.property]);

                if(index == 3){
                    let num = 0
                    values.map(function(value){
                        var str = value.replace('分', '')
                        var arr = str.split('小时')
                        var hour = arr[0]
                        var minute = arr[1]
                        num += parseInt(hour) * 60 + parseInt(minute)
                    })
                    let h = parseInt(num / 60)
                    let m = num % 60
                    sums[index] = h + '小时' + m + '分钟'
                }else{
                    sums[index] = ''
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
