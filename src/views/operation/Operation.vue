<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <el-input class="card-header-input" placeholder="关键词" v-model="search.keywords"></el-input>
            <el-date-picker
                class="offset-left-30"
                v-model="search.select_date"
                type="datetimerange"
                range-separator="-"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions">
            </el-date-picker>
            <el-button class="offset-left-30 btn-search" @click="getData">搜索</el-button>
        </div>
        <el-table stripe ref="multipleTable" :data="list" tooltip-effect="dark" :header-cell-style="{background:'#EFF5F9'}">
                
                <el-table-column label="类型" prop="type"></el-table-column>
                <el-table-column label="时间" prop="time"></el-table-column>
                <el-table-column label="内容" prop="content"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="showDetail(scope.row.id)" type="text" size="small">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination class="right offset-top-31 offset-bottom-46" background layout="prev, pager, next" :page-count="totalPage" @current-change="handleCurrentChange"></el-pagination>
            <el-dialog title="操作日志" :visible.sync="showDetailDialog.centerDialogVisible" width="800px" center>
                <div class="center break" v-html="detail.content"></div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="showDetailDialog.centerDialogVisible = false">关闭</el-button>
                </span>
                
            </el-dialog>
    </el-card>
</template>

<script>
export default {
    created(){
        this.getData()
    },
    data(){
        return {
            search:{
                keywords : "",
                select_date: [],
            },
            showDetailDialog: {
                centerDialogVisible: false,
            },
            size : 10,
            current : 1,
            totalPage: 5,
            total: 0,
            list: [
                {
                    id : 1,
                    type: '业务访问',
                    content: '操作内容内容',
                    time: "2019-08-09 10:20",
                },
                {
                    id : 2,
                    type: '权限访问',
                    content: '操作内容内容',
                    time: "2019-08-09 10:20",
                },
                {
                    id : 3,
                    type: '业务访问',
                    content: '操作内容内容',
                    time: "2019-08-09 10:20",
                },
            ],
            detail: {
                content: "操作日志操作日志操作日志操作日志操作日志操作日志操作日志操作日志操作日志操作日志操作日志操作日志操作日志操作日志操作日志操作日志"
            },
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
        }
    },
    methods:{
       
        getData(){
            var params = { current : this.current, size : this.size, buyerEmail : this.search.keywords, begin: this.search.select_date[0], end: this.search.select_date[1] }
            console.log(params)
            // var that = this
            // post(userApi.phoneUserList, params)
            // .then(function(res){
            //     that.list = res.data.list
            //     that.total = res.data.total
            //     that.current = res.data.pageNum
            //     that.totalPage = res.data.totalPage
            // }).catch(function(err){
            //     console.log('error')
            //     console.log(err)
            // })
        },
        showDetail(id){
            this.showDetailDialog.centerDialogVisible = true
            // var params = { id: id }
            // var that = this
            // post(userApi.phoneUserDetail, params).then(function(res){
            //     console.log(res)
            //     that.detail = res.data
            //     that.centerDialogVisible = true
            //     console.log(that.detail)
            // }).catch(function(err){
            //     console.log('error')
            //     console.log(err)
            // })
            // console.log(this.detail)
        },
        handleCurrentChange(val){
            this.current = val
            this.getData()
        },
    }
}
</script>

<style lang='less' scoped>
// .el-dialog--center .el-dialog__body{
//     text-align: center;
// }
.el-form > .add-user-dialog-label > label{
    color: black;
    font-weight: 400;
}
</style>
