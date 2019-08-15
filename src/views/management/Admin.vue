<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <el-input class="card-header-input" placeholder="账号/用户名" v-model="search.keywords"></el-input>
            <el-select v-model="search.role" placeholder="角色" class="offset-left-30">
                <el-option
                v-for="item in search.roleList"
                :key="item.roleId"
                :label="item.roleName"
                :value="item.roleId">
                </el-option>
            </el-select>
            <el-button class="offset-left-30 btn-search" @click="getData">搜索</el-button>
            <el-button class="right" type="primary" @click="addUser(0)">新增</el-button>
            <el-button class="right" @click="deleteData()">删除</el-button>
        </div>
        <el-table stripe ref="multipleTable" :data="list" tooltip-effect="dark" :header-cell-style="{background:'#EFF5F9'}" @selection-change="handleSelectionChange">
                <el-table-column type="selection"></el-table-column>
                <el-table-column label="序号" type="index"></el-table-column>
                <el-table-column label="账号" prop="username"></el-table-column>
                <el-table-column label="姓名" prop="managerName"></el-table-column>
                <el-table-column label="性别" prop="sex"></el-table-column>
                <el-table-column label="角色" prop="roleName"></el-table-column>
                <el-table-column label="修改时间" prop="updateTime"></el-table-column>
                <el-table-column label="备注" prop="remark"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="userDetail(scope.row.id)" type="text" size="small">详情</el-button>
                        <el-button @click="addUser(scope.row.id)" type="text" size="small">编辑</el-button>
                        <el-button @click="resetPsd(scope.row.id)" type="text" size="small">重置密码</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination class="right offset-top-31 offset-bottom-46" background layout="prev, pager, next" :page-count="totalPage" @current-change="handleCurrentChange"></el-pagination>
            <el-dialog title="用户详情" :visible.sync="showDetailDialog.centerDialogVisible" width="800px" center>
                <div class="center">
                    <div>
                        <span class="user-detail-text">账号：</span><span class="user-detail-value" v-text="detail.username"></span>
                    </div>
                    <div>
                        <span class="user-detail-text">姓名：</span><span class="user-detail-value" v-text="detail.managerName"></span>
                    </div>
                    <div>
                        <span class="user-detail-text">性别：</span><span class="user-detail-value" v-text="detail.sex">女</span>
                    </div>
                    <div>
                        <span class="user-detail-text">角色：</span><span class="user-detail-value" v-text="detail.roleName">超级管理员</span>
                    </div>
                    <div class="remark">
                        <span class="user-detail-text">备注：</span><span class="user-detail-value" v-text="detail.remark"></span>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="showDetailDialog.centerDialogVisible = false">保 存</el-button>
                    <el-button @click="showDetailDialog.centerDialogVisible = false">取 消</el-button>
                </span>
                
            </el-dialog>
            <el-dialog :title="addUserDialog.addUserTitle" :visible.sync="addUserDialog.addUserDialogVisible" width="800px" center>
                <div class="center">
                    <el-form :rules="addUserDialog.rules" ref="addForm" :model="addUserDialog.form">
                        <el-input v-model="addUserDialog.form.id" type="hidden" autocomplete="off"></el-input>
                        <!-- <el-form-item label="账号" class="add-user-dialog-label" :label-width="addUserDialog.formLabelWidth"> -->
                        <el-form-item prop="username" label="账号：" :label-width="addUserDialog.formLabelWidth">
                            <el-input v-model="addUserDialog.form.username" autocomplete="off" required></el-input>
                        </el-form-item>
                        <el-form-item prop="managerName" label="姓名：" :label-width="addUserDialog.formLabelWidth">
                            <el-input v-model="addUserDialog.form.managerName" autocomplete="off" required></el-input>
                        </el-form-item>
                        <el-form-item prop="sex" label="性别：" :label-width="addUserDialog.formLabelWidth">
                            <el-select v-model="addUserDialog.form.sex" placeholder="请选择性别" required>
                                <el-option :key="i" v-for="(item, i) in addUserDialog.sexes" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <!-- <el-form-item label="角色" class="add-user-dialog-label" :label-width="addUserDialog.formLabelWidth"> -->
                        <el-form-item prop="roleId" label="角色：" :label-width="addUserDialog.formLabelWidth">
                            <el-select v-model="addUserDialog.form.roleId" placeholder="请选择角色" required>
                                <el-option :key="i" v-for="(item, i) in search.roleList" :label="item.roleName" :value="item.roleId"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="备注：" :label-width="addUserDialog.formLabelWidth">
                            <el-input type="textarea" v-model="addUserDialog.form.remark" rows="5" required></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitForm('addForm')">保 存</el-button>
                    <el-button @click="addUserDialog.addUserDialogVisible = false">取 消</el-button>
                </span>
            </el-dialog>
    </el-card>
</template>

<script>
import { mkdir } from 'fs';
import { fPost, get, post} from '@/api/index.js';
import adminApi from '@/api/admin.js';
import roleApi from '@/api/role.js';
import { constants } from 'crypto';
export default {
    created(){
        this.getRole()
        this.getData()
    },
    data(){
        return {
            search:{
                roleList:[
                    
                ],
                keywords : "",
                role: "",
            },
            addUserDialog:{
                addUserTitle : '新增用户',
                addUserDialogVisible: false,
                form:{

                },
                rules: {
                    managerName: [
                        { required: true, message: '请输入账号', trigger: 'blur' }
                    ],
                    // remark: [
                    //     { required: true, message: '请输入备注', trigger: 'blur' }
                    // ],
                    roleId: [
                        { required: true, message: '请选择角色', trigger: 'blur' }
                    ],
                    sex: [
                        { required: true, message: '请选择性别', trigger: 'blur' }
                    ],
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ]
                },
                sexes: [
                    {
                        label: '男',
                        value: 1,
                    },
                    {
                        label: '女',
                        value: 2,
                    },
                ],
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
            ],
            detail: {
                
            },
            multipleSelection : [],
            selectIds: [],
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
            this.multipleSelection = val
            let ids  = []
            this.multipleSelection.map((item) => {
                ids.push(item.id)
            })
            this.selectIds = ids
        },
        getData(){
            var params = { current : this.current, size : this.size, username : this.search.keywords, roleId: this.search.role }
            var that = this
            fPost(adminApi.adminList, params)
            .then(function(res){
                that.list = res.data.list
                that.total = res.data.total
                that.current = res.data.pageNum
                that.totalPage = res.data.totalPage
            }).catch(function(err){
                console.log('error')
                console.log(err)
            })
        },
        userDetail(id){
            // this.showDetailDialog.centerDialogVisible = true
            var params = { id: id }
            var that = this
            fPost(adminApi.adminDetail, params).then(function(res){
                that.detail = res.data
                that.showDetailDialog.centerDialogVisible = true
            }).catch(function(err){
                console.log('error')
                console.log(err)
            })
        },
        addUser(id){
            this.addUserDialog.form = {}
            let that = this
            if(id > 0){
                this.addUserDialog.addUserTitle = '编辑用户信息'
                fPost(adminApi.adminDetail, { id : id }).then(function(res){
                    that.addUserDialog.form = res.data
                    that.addUserDialog.sexes.map(function(item){
                        if(item.label == res.data.sex){
                            that.addUserDialog.form.sex = item.value
                            that.addUserDialog.form.sex_label = item.label
                        }
                    })
                    
                    if(that.search.roleList != null){
                        that.search.roleList.map(function(item){
                            if(item.roleName == res.data.roleName){
                                that.addUserDialog.form.roleId = item.roleId
                                that.addUserDialog.form.roleName = item.roleName
                            }
                        })
                    }
                })
            }
            this.addUserDialog.addUserDialogVisible = true
        },
        submitForm(formName){
            let that = this
            let url = (this.addUserDialog.form.id > 0 ? adminApi.editAdmin : adminApi.addAdmin)
            var params = { id: this.addUserDialog.form.id, managerName: this.addUserDialog.form.managerName, password: '', remark: this.addUserDialog.form.remark, roleId: this.addUserDialog.form.roleId, sex: this.addUserDialog.form.sex, username: this.addUserDialog.form.username }
        
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    fPost(url, params).then(function(res){
                        that.$message({
                            message: res.data,
                            duration: 1000,
                            type: 'success'
                        });
                        that.addUserDialog.addUserDialogVisible = false
                        that.getData()
                    })
                } else {
                    return false;
                }
            });
            
        },
        getRole(){
            let that = this
            get(roleApi.allRole, {}).then(function(res){
                that.search.roleList = res.data 
            })
        },
        handleCurrentChange(val){
            this.current = val
            this.getData()
        },
        deleteData(){
            var params = this.selectIds
            var that = this
            post(adminApi.deleteAdmin, params).then(function(res){
                if(res.code == 200){
                    that.getData()
                }
            })
        },
        resetPsd(id){
            let that = this
            fPost(adminApi.resetPsd, {id : id}).then((res) => {
                that.$message({
                    message: res.data,
                    type: 'success', 
                    duration: 1000,
                })
            })
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
