<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <el-input class="card-header-input" v-model="search.keywords" placeholder="输入关键字搜索"></el-input>
            <el-button class="offset-left-30 btn-search" @click="getData">搜索</el-button>
            <!-- <el-button class="right" type="primary" @click="add(0)">新增</el-button>
            <el-button class="right" @click="deleteData('checkbox', 0)">删除</el-button> -->
        </div>
        <el-table stripe ref="multipleTable" :data="list" tooltip-effect="dark" :header-cell-style="{background:'#EFF5F9'}" @selection-change="handleSelectionChange">
                <!-- <el-table-column type="selection"></el-table-column> -->
                <el-table-column label="序号" type="index"></el-table-column>
                <el-table-column label="公司名" prop="company_name"></el-table-column>
                <el-table-column label="上月总收入" prop="last_month_money"></el-table-column>
                <el-table-column label="总收入" prop="total_money"></el-table-column>
                <!-- <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="add(scope.row.id)" type="text" size="small">详情</el-button>
                        <el-button @click="deleteData('sigle', scope.row.roleId)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column> -->
            </el-table>
            <el-pagination class="right offset-top-31 offset-bottom-46" background layout="prev, pager, next" :page-count="totalPage" @current-change="handleCurrentChange"></el-pagination>
            <el-dialog title="角色详情" :visible.sync="showDetailDialog.centerDialogVisible" width="800px" center>
                <div class="center break">
                    <span v-for="(item,i) in detail.role_detail" :key="i">
                        <template v-if="detail.role_detail[i + 1] != null">
                            {{ item }},
                        </template>
                        <template v-else>
                            {{ item }}
                        </template>
                    </span>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="showDetailDialog.centerDialogVisible = false">关闭</el-button>
                </span>
                
            </el-dialog>
            <el-dialog :title="addUserDialog.addUserTitle" :visible.sync="addUserDialog.addUserDialogVisible" width="800px" center>
                <div class="center break">
                    <el-form :model="addUserDialog.form">
                        <el-input v-model="addUserDialog.form.id" type="hidden" autocomplete="off"></el-input>
                        <!-- <el-form-item label="账号" class="add-user-dialog-label" :label-width="addUserDialog.formLabelWidth"> -->
                        <el-form-item label="角色名称：" :label-width="addUserDialog.formLabelWidth">
                            <el-input v-model="addUserDialog.form.roleName" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="权限：" :label-width="addUserDialog.formLabelWidth">
                        <el-checkbox :indeterminate="addUserDialog.isIndeterminate" v-model="addUserDialog.checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                        <div style="margin: 15px 0;"></div>
                        <el-checkbox-group v-model="addUserDialog.form.permissions" @change="handleCheckedCitiesChange">
                            <el-checkbox v-for="rule in ruleList" :label="rule" :key="rule.id">{{rule.permissionName}}</el-checkbox>
                        </el-checkbox-group>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="doAdd()">保 存</el-button>
                    <el-button @click="addUserDialog.addUserDialogVisible = false">取 消</el-button>
                </span>
            </el-dialog>
    </el-card>
</template>

<script>
import { mkdir } from 'fs';
import { fPost, get, post} from '@/api/index.js';
import roleApi from '@/api/role.js';
import ruleApi from '@/api/rule.js';
import { instanceOf } from 'prop-types';
export default {
    created(){
        this.getRules()
        this.getData()
    },
    data(){
        return {
            search:{
                keywords: "",
            },
            addUserDialog:{
                addUserTitle : '新增角色',
                addUserDialogVisible: false,
                form:{
                    roleId: 0,
                    roleName : '',
                    permissions: []
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
                checkAll: false,
                isIndeterminate: true,
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
                    id: 1,
                    company_name: '子公司一',
                    last_month_money: 150000,
                    total_money: 1500000,
                },
                {
                    id: 2,
                    company_name: '子公司二',
                    last_month_money: 150000,
                    total_money: 1500000,
                },
                {
                    id: 3,
                    company_name: '子公司三',
                    last_month_money: 150000,
                    total_money: 1500000,
                },
            ],
            detail: {
                role_detail: "超级管理员，操作工超级管理员，操作工超级管理员，操作工超级管理员，操作工超级管理员，操作工超级管理员，操作工超级管理员，操作工超级管理员，操作工超级管理员，操作工超级管理员，操作工超级管理员，操作工"
            },
            multipleSelection : [],
            selectIds: [],
            ruleList: [],
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
            val.map((item) => {
                this.selectIds.push(item.roleId)
            })
        },
        getData(){
            // var params = { current : this.current, size : this.size, roleName : this.search.keywords }
            // var that = this
            // fPost(roleApi.list, params)
            //     .then(function(res){
            //         that.list = res.data.list
            //         that.total = res.data.total
            //         that.current = res.data.pageNum
            //         that.totalPage = res.data.totalPage
            //     }).catch(function(err){
            //         console.log('error')
            //         console.log(err)
            //     })
        },
        ruleDetail(id){
            let that = this
            var params = { roleId : id }
            fPost(roleApi.detail, params).then((res) => {
                this.detail.role_detail = res.data
                this.showDetailDialog.centerDialogVisible = true
            })
        },
        add(id){
            this.addUserDialog.addUserDialogVisible = true
            return false
            this.retRole()
            // this.getRules()
            if(id != 0){
                //编辑时要获取对应角色的权限数据
                let that = this
                this.addUserDialog.form.roleId = id
                fPost(roleApi.roleDetail, { roleId : id }).then((res) => {
                    that.addUserDialog.form.roleName = roleName
                    var ruleIds = res.data
                    that.ruleList.map((item) => {
                        if(ruleIds.includes(item.id)){
                            that.addUserDialog.form.permissions.push(item)
                        }
                    })

                    that.addUserDialog.addUserTitle = '编辑角色'
                    let checkedCount = that.addUserDialog.form.permissions.length;
                    that.addUserDialog.checkAll = checkedCount === that.ruleList.length;
                    that.addUserDialog.isIndeterminate = checkedCount > 0 && checkedCount < that.ruleList.length;
                    that.addUserDialog.addUserDialogVisible = true
                })
            }else{
                this.addUserDialog.addUserTitle = '新增角色'
                let checkedCount = this.addUserDialog.form.permissions.length;
                this.addUserDialog.checkAll = checkedCount === this.ruleList.length;
                this.addUserDialog.isIndeterminate = checkedCount > 0 && checkedCount < this.ruleList.length;
                this.addUserDialog.addUserDialogVisible = true
            }
        },
        retRole(){
            this.addUserDialog.form.roleId = 0
            this.addUserDialog.form.permissions = []
            this.addUserDialog.form.roleName = ''
        },
        doAdd(){
            let that = this
            this.dealPermission()
            let url = (this.addUserDialog.form.roleId > 0) ? roleApi.update : roleApi.add
            fPost(url, this.addUserDialog.form).then((res) => {
                that.getData()
                that.addUserDialog.addUserDialogVisible = false
                that.$message({
                    type: 'success',
                    message: res.data,
                    duration: 1000,
                })
            })
        },
        dealPermission(){
            let permissions = []
            this.addUserDialog.form.permissions.map((item) => {
                permissions.push(item.id)
            })
            permissions = permissions.join(',')
            this.addUserDialog.form.permissions = permissions
        },
        getRules(){
            let that = this
            get(ruleApi.list, {}).then((res) => {
                console.log(res)
                that.ruleList = res.data
            })
        },
        deleteData(type, id){
            let that = this
            let ids = []
            if(type == 'checkbox'){
                ids = this.selectIds
            }else{
                ids = [id]
            }

            post(roleApi.delete, ids).then((res) => {
                that.getData()
            })
        },
        handleCurrentChange(val){
            this.current = val
            this.getData()
        },
        handleCheckAllChange(val) {
            this.addUserDialog.form.permissions = val ? this.ruleList : []
            this.addUserDialog.isIndeterminate = false
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.addUserDialog.checkAll = checkedCount === this.ruleList.length;
            this.addUserDialog.isIndeterminate = checkedCount > 0 && checkedCount < this.ruleList.length;
        }
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
