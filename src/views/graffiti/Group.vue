<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <el-input class="card-header-input" placeholder="关键词" v-model="search.keywords"></el-input>
            <el-button class="offset-left-30 btn-search" @click="getData">搜索</el-button>
            <el-button class="right" type="primary" @click="add(0)">新增</el-button>
            <el-button class="right" @click="">删除</el-button>
        </div>
        <el-table stripe ref="multipleTable" :data="list" tooltip-effect="dark" :header-cell-style="{background:'#EFF5F9'}" @selection-change="handleSelectionChange">
                <el-table-column type="selection"></el-table-column>
                <el-table-column label="序号" type="index"></el-table-column>
                <el-table-column label="分组名" prop="name"></el-table-column>
                <el-table-column label="管理员">
                    <template slot-scope="scope">
                        <template v-for="(item,key) in scope.row.users">
                            <template v-if="typeof(scope.row.users[key + 1]) != 'undefined'">
                                <span :key="key" v-text="item.name + ','"></span>
                            </template>
                            <template v-else>
                                <span :key="key" v-text="item.name"></span>
                            </template>
                        </template>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <!-- <el-button @click="add(scope.row.id)" type="text" size="small">编辑</el-button> -->
                        <el-button @click="showDetail(scope.row.id)" type="text" size="small">详情</el-button>
                        <el-button @click="" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination class="right offset-top-31 offset-bottom-46" background layout="prev, pager, next" :page-count="totalPage" @current-change="handleCurrentChange"></el-pagination>
            <el-dialog title="场景类型详情" :visible.sync="showDetailDialog.centerDialogVisible" width="800px" center>
                <div class="center">
                    <div>
                        <span class="user-detail-text">场景类型：</span><span class="user-detail-value" v-html="detail.type"></span>
                    </div>
                    <div>
                        <span class="user-detail-text">备注：</span><span class="user-detail-value" v-html="detail.remark"></span>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="showDetailDialog.centerDialogVisible = false">保存</el-button>
                    <el-button type="default" @click="showDetailDialog.centerDialogVisible = false">取消</el-button>
                </span>
                
            </el-dialog>
            <!-- TODO 文字间距设置 -->
            <el-dialog :title="addDialog.addTitle" :visible.sync="addDialog.addDialogVisible" width="800px" center>
                <div class="center break">
                    <el-form :model="addDialog.form">
                        <el-input v-model="addDialog.form.id" type="hidden" autocomplete="off"></el-input>
                        <!-- <el-form-item label="账号" class="add-user-dialog-label" :label-width="addUserDialog.formLabelWidth"> -->
                        <el-form-item label="场景类型：" :label-width="addDialog.formLabelWidth">
                            <el-input v-model="addDialog.form.name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="备注：" :label-width="addDialog.formLabelWidth">
                            <el-input type="textarea" v-model="addDialog.form.remark" rows="5"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="doAddUser()">保 存</el-button>
                    <el-button @click="addDialog.addDialogVisible = false">取 消</el-button>
                </span>
            </el-dialog>
    </el-card>
</template>

<script>
import { mkdir } from 'fs';
import { get, post} from '@/api/index.js';
import userApi from '@/api/user.js';
export default {
    created(){
        this.getData()
    },
    data(){
        return {
            search:{
                types:[
                    {
                        value: 1,
                        label: "建筑"
                    },
                    {
                        value: 2,
                        label: "人物"
                    },
                    {
                        value: 3,
                        label: "动物"
                    },
                ],
                keyword: "",
                type: "",
                provide: "",
                select_date: [],
            },
            addDialog:{
                addTitle : '新增场景类型',
                addDialogVisible: false,
                form:{
                    id: 0,
                    name : '建筑',
                    remark: '备注备注',
                },
                formLabelWidth: '130px',
            },
            showDetailDialog: {
                centerDialogVisible: false,
            },
            size : 10,
            current : 1,
            totalPage: 0,
            total: 0,
            list: [
                {
                    id : 1,
                    name: "运营小组一",
                    users: [
                        {
                            id: 1,
                            name: 'admin'
                        },{
                            id: 2,
                            name: 'test1'
                        },
                    ]
                },
                {
                    id : 1,
                    name: "运营小组二",
                    users: [
                        {
                            id: 1,
                            name: 'admin'
                        },{
                            id: 2,
                            name: 'test1'
                        },
                    ]
                },
                {
                    id : 1,
                    name: "运营小组儿",
                    users: [
                        {
                            id: 1,
                            name: 'admin'
                        },{
                            id: 2,
                            name: 'test1'
                        },
                    ]
                },
            ],
            detail: {
                type: "人物",
                remark: "备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注",
            },
            multipleSelection : [],
            ruleList:[
                {label:"用户管理-手机用户", value: "1"},
                {label:"用户管理-管理员", value: "2"},
                {label:"用户管理-角色管理", value: "3"},
                {label:"用户管理-修改密码", value: "4"},
                {label:"用户管理-涂鸦分类", value: "5"},
            ],
        }
    },
    methods:{
        toggleSelection(rows) {
            if (rows) {
            rows.forEach(row => {
                this.$refs.multipleTable.toggleRowSelection(row);
            });
            } else {
            this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        frozen(type){
            console.log(type)
        },
        getData(){
            var params = { current : this.current, size : this.size, keywords : this.search.keywords, provide: this.search.provide, begin : this.search.select_date[0], end : this.search.select_date[1] }
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
        add(id){
            this.$router.push({path: '/addModel', 'query': {id : id}})
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
