<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <el-row :gutter="10">
                <el-col :span="4">
                    <el-input placeholder="关键字"></el-input>
                </el-col>
                <el-col :sm="8">
                    <el-button class="btn-search" @click="getData">搜索</el-button>
                </el-col>
                <el-col :span="12">
                    <el-button class="right" type="primary" style="float:right;" @click="add(0)">新增</el-button>
                </el-col>
            </el-row>
            <!-- <el-button class="right" @click="">删除</el-button> -->
        </div>
        <el-table stripe ref="multipleTable" :data="list" tooltip-effect="dark" :header-cell-style="{background:'#EFF5F9'}" @selection-change="handleSelectionChange">
                <!-- <el-table-column type="selection"></el-table-column> -->
                <el-table-column label="序号" type="index"></el-table-column>
                <el-table-column label="用户名" prop="username"></el-table-column>
                <el-table-column label="手机号" prop="phone"></el-table-column>
                <el-table-column label="公司" prop="company.name"></el-table-column>
                <el-table-column label="分组" prop="group.name"></el-table-column>
                <!-- <el-table-column label="部门" prop="department.name"></el-table-column> -->
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status==1">在职</span>
                        <span v-else>离职</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="add(scope.row.id)" type="text" size="small">编辑</el-button>
                        <el-button @click="showDetail(scope.row.id)" type="text" size="small">查看</el-button>
                        <el-button type="text" size="small">删除</el-button>
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
// import { mkdir } from 'fs';
import { get} from '@/api/index.js';
// import userApi from '@/api/user.js';
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
                type: "",
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
                    username: 'admin',
                    phone: "18244251413",
                    company: {
                        id: 1,
                        name: '子公司一'
                    },
                    group: {
                        id: 1,
                        name: '运营小组一'
                    },
                    status: 1,
                },
                {
                    id : 1,
                    username: 'admin',
                    phone: "18244251413",
                    company: {
                        id: 1,
                        name: '子公司一'
                    },
                    group: {
                        id: 1,
                        name: '运营小组一'
                    },
                    status: 1,
                },
                {
                    id : 1,
                    username: 'admin',
                    phone: "18244251413",
                    company: {
                        id: 1,
                        name: '子公司一'
                    },
                    group: {
                        id: 1,
                        name: '运营小组一'
                    },
                    // department: {
                    //     id: 1,
                    //     name: '人事部'
                    // },
                    status: 1,
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
        getData(){
            // var params = { current : this.current, size : this.size, buyerEmail : this.search.keywords }
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
            this.showDetailDialog.id = id
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
            if(id > 0){
                //编辑时要获取对应角色的权限数据
                this.addDialog.addTitle = '编辑场景类型'
            }else{
                this.addDialog.addTitle = '新增场景类型'
            }
            this.addDialog.addDialogVisible = true
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
