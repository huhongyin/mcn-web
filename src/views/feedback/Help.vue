<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <el-input class="card-header-input" v-model="search.keywords" placeholder="关键词"></el-input>
            <el-button class="offset-left-30 btn-search" @click="getData()">搜索</el-button>
            <el-button class="right btn-search" @click="add(0)">增加</el-button>
        </div>
        <el-table stripe ref="multipleTable" :data="list" tooltip-effect="dark" :header-cell-style="{background:'#EFF5F9'}">
                <el-table-column label="序号" type="index"></el-table-column>
                <el-table-column label="问题" prop="questionTitle"></el-table-column>
                <el-table-column label="帮助信息详情" prop="answerDetail" show-overflow-tooltip=""></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="showDetail(scope.row.id)" type="text" size="small">查看</el-button>
                        <el-button @click="add(scope.row.id)" type="text" size="small">修改</el-button>
                        <el-button @click="deleteData(scope.row.id)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination class="right offset-top-31 offset-bottom-46" background layout="prev, pager, next" :page-count="totalPage" @current-change="handleCurrentChange"></el-pagination>
            <el-dialog title="帮助信息详情" :visible.sync="detail.show" center>
                <div class="center">
                    <el-row>
                        <el-col :span="24">
                            <label class="user-detail-text">问题题目：<span class="user-detail-value" v-text="detail.info.questionTitle"></span></label>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <label class="user-detail-text">问题描述：<span class="user-detail-value" v-text="detail.info.answerDetail"></span></label>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <label class="modify-time right">修改时间：<label class="modify-time" v-text="detail.info.updateTime"></label></label>
                        </el-col>
                    </el-row>
                </div>

                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="detail.show = false">确 定</el-button>
                    <el-button @click="detail.show = false">取 消</el-button>
                </span>
            </el-dialog>
            <el-dialog :title="modify.title" :visible.sync="modify.show" center>
                <div class="center">
                    <el-form :model="modify.info" ref="addHelpForm">
                        <el-form-item label="" class="o-center" prop="questionTitle">
                            <label class="user-detail-text w-30">帮助信息标题：</label><el-input class="w-70" v-model="modify.info.questionTitle" autocomplete="off" placeholder="请输入帮助信息标题"></el-input>
                        </el-form-item>
                        <el-form-item label="" class="o-center" prop="answerDetail">
                            <label class="user-detail-text w-30">帮助信息描述：</label><el-input class="w-70" type="textarea" v-model="modify.info.answerDetail" placeholder="请输入帮助信息描述"></el-input>
                        </el-form-item>
                    </el-form>
                </div>

                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="doAdd('addHelpForm')">保 存</el-button>
                    <el-button @click="modify.show = false">取 消</el-button>
                </span>
            </el-dialog>
    </el-card>
</template>

<script>
import { mkdir } from 'fs';
import { fPost, get, post} from '@/api/index.js';
import helpApi from '@/api/help.js';
export default {
    created(){
        this.getData()
    },
    data(){
        return {
            search:{
                keywords: "",
            },
            size : 10,
            current : 1,
            totalPage: 0,
            total: 0,
            list: [],
            detail: {
                show: false,
                info: {}
            },
            modify: {
                show: false,
                formLabelWidth: '120px',
                info: {}
            },
            rules: {
                questionTitle: [
                    { required: true, message: '请输入帮助信息标题', trigger: 'blur' }
                ],
                answerDetail: [
                    { required: true, message: '请输入帮助信息描述', trigger: 'blur' }
                ],
            },
        }
    },
    methods:{
        getData(){
            var params = { current : this.current, size : this.size, keywords: this.search.keywords }
            var that = this
            fPost(helpApi.list, params)
                .then(function(res){
                    that.list = res.data.list
                    that.total = res.data.total
                    that.current = res.data.pageNum
                    that.totalPage = res.data.totalPage
                })
        },
        showDetail(id){
            var params = { helpId: id }
            let that = this
            get(helpApi.detail, params).then(function(res){
                that.detail.info = res.data
                that.detail.show = true
            })
        },
        deleteData(id){
            var params = [id]
            let that = this
            post(helpApi.delete, params).then((res) => {
                that.$message({
                    message: res.data,
                    type: 'success',
                    duration: 1000,
                })
                that.getData()
            })
        },
        add(id){
            if(id > 0){
                var params = { helpId: id }
                let that = this
                get(helpApi.detail, params).then(function(res){
                    that.modify.info.id = id
                    that.modify.title = '修改帮助信息'
                    that.modify.info = res.data
                    that.modify.show = true
                })
            }else{
                this.modify.info = {}
                this.modify.title = '添加帮助信息'
                this.modify.show = true
            }
        },
        doAdd(form){
            this.$refs[form].validate((valid) => {
                if(valid){
                    let that = this
                    let params = { id: this.modify.info.id, answerDetail: this.modify.info.answerDetail, questionTitle: this.modify.info.questionTitle }
                    let url = ((typeof(this.modify.info.id) != 'undefined') ? helpApi.update : helpApi.add)
                    fPost(url, params).then((res) => {
                        that.modify.show = false
                        that.getData()
                        that.$message({
                            type: 'success',
                            duration: 1000,
                            message: res.data
                        })
                    })
                }
            })
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

.modify-time{
    font-weight: bold;
    color: black;
}
</style>
