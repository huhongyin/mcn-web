<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <el-row :gutter="10">
                <el-col :span="4">
                    <el-select v-model="search.company_id" @change="changeCompany">
                                <el-option label="全部" value=""></el-option>
                        <el-option v-for="(item, key) in search.companies" :key="key" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-select v-model="search.department_id">
                                <el-option label="全部" value=""></el-option>
                        <el-option v-for="(item, key) in search.departments" :key="key" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-input placeholder="关键字" v-model="search.keywords"></el-input>
                </el-col>
                <el-col :sm="4">
                    <el-button class="btn-search" @click="searchData">搜索</el-button>
                </el-col>
                <el-col :span="8">
                    <el-button class="right" type="primary" style="float:right;" @click="add(0)">新增</el-button>
                </el-col>
            </el-row>
        </div>
        <el-table stripe ref="multipleTable" :data="list" tooltip-effect="dark" :header-cell-style="{background:'#EFF5F9'}">
                <el-table-column label="序号" type="index"></el-table-column>
                <el-table-column label="姓名" prop="rel_name"></el-table-column>
                <el-table-column label="登录名" prop="name"></el-table-column>
                <el-table-column label="邮箱" prop="email"></el-table-column>
                <el-table-column label="公司" prop="company.name"></el-table-column>
                <el-table-column label="部门" prop="department.name"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="add(scope.row.id)" type="text" size="small">编辑</el-button>
                        <el-button @click="showDetail(scope.row)" type="text" size="small">查看</el-button>
                        <el-button type="text" size="small" @click="deleteUser(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination class="right offset-top-31 offset-bottom-46" background layout="prev, pager, next" :page-count="totalPage" @current-change="handleCurrentChange"></el-pagination>
            
            <el-dialog title="用户详情" :visible.sync="detail.centerDialogVisible" center class="user-detail">
                <el-row>
                    <el-col :span="3" :offset="8">
                        用户名:
                    </el-col>
                    <el-col :span="12" :offset="1">
                        <label v-text="detail.data.name"></label>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3" :offset="8">
                        邮箱:
                    </el-col>
                    <el-col :span="12" :offset="1">
                        <label v-text="detail.data.email"></label>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3" :offset="8">
                        所属公司:
                    </el-col>
                    <el-col :span="12" :offset="1">
                        <label v-text="detail.data.company.name"></label>
                    </el-col>
                </el-row>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="detail.centerDialogVisible = false">关闭</el-button>
                </span>
            </el-dialog>
            <!-- TODO 文字间距设置 -->
            <el-dialog :title="addDialog.addTitle" :visible.sync="addDialog.addDialogVisible" width="800px" center>
                <div class="center break">
                    <el-form :model="addDialog.form">
                        <el-input v-model="addDialog.form.id" type="hidden" autocomplete="off"></el-input>
                        <!-- <el-form-item label="账号" class="add-user-dialog-label" :label-width="addUserDialog.formLabelWidth"> -->
                        <el-form-item label="姓名：" :label-width="addDialog.formLabelWidth">
                            <el-input v-model="addDialog.form.rel_name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="登录账号：" :label-width="addDialog.formLabelWidth">
                            <el-input v-model="addDialog.form.name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱：" :label-width="addDialog.formLabelWidth">
                            <el-input type="email" v-model="addDialog.form.email" rows="5"></el-input>
                        </el-form-item>
                        <el-form-item label="所属公司：" :label-width="addDialog.formLabelWidth">
                            <el-select v-model="addDialog.form.company_id" style="width:100%;" @change="changeAddCompany">
                                <el-option label="全部" value=""></el-option>
                                <el-option v-for="(item,key) in addDialog.companies" :key="key" :value="item.id" :label="item.name"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="所属部门：" :label-width="addDialog.formLabelWidth">
                            <el-select v-model="addDialog.form.department_id" style="width:100%;">
                                <el-option label="全部" value=""></el-option>
                                <el-option v-for="(item,key) in addDialog.departments" :key="key" :value="item.id" :label="item.name"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="密码：" :label-width="addDialog.formLabelWidth">
                            <el-input type="password" v-model="addDialog.form.password" rows="5" placeholder="不输入密码为默认密码"></el-input>
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
import { get, post} from '@/api/index.js';
import userApi from '@/api/user.js';
import companyApi from '@/api/company.js';
import departmentApi from '@/api/department.js';
export default {
    created(){
        this.getCompany()
        this.getData()
    },
    data(){
        return {
            search: {
                keywords: "",
                company_id: "",
                department_id: "",
                companies: [],
                departments: [],
            },
            addDialog:{
                addTitle : '新增用户',
                addDialogVisible: false,
                companies: [],
                departments: [],
                form:{
                    id: 0,
                    rel_name: '',
                    name : '',
                    password: '',
                    email: '',
                    company_id: "",
                    department_id: "",
                },
                formLabelWidth: '130px',
            },
            detail: {
                data: {
                    name: "",
                    company: {
                        name: "",
                    }
                },
                centerDialogVisible: false,
            },
            current : 1,
            totalPage: 0,
            list: [],
        }
    },
    methods:{
        getData(){
            var params = { page : this.current, keywords: this.search.keywords, company_id: this.search.company_id, department_id: this.search.department_id }
            let that = this
            get(userApi.list, params).then((res) => {
                that.list = res.data.list.data
                that.totalPage = res.data.list.last_page
            })
        },
        getCompany(){
            let that = this
            get(companyApi.list, { type: 'select', company_id: this.search.company_id }).then((res) =>{
                that.search.companies = res.data.list
                that.addDialog.companies = res.data.list
            })
        },
        getDepartment(company_id){
            let that = this
            get(departmentApi.list, { type: 'select', company_id: company_id }).then((res) =>{
                that.search.departments = res.data.list
                that.addDialog.departments = res.data.list
            })
        },
        showDetail(data){
            this.detail.data = data
            this.detail.centerDialogVisible = true
        },
        add(id){
            if(id > 0){
                //编辑时要获取对应角色的权限数据
                this.addDialog.addTitle = '编辑用户'
                //获取用户详情
                let that = this
                get(userApi.detail + '/' + id, {}).then((res) => {
                    that.addDialog.form.id = id
                    that.addDialog.form.rel_name = res.data.info.rel_name
                    that.addDialog.form.name = res.data.info.name
                    that.addDialog.form.email = res.data.info.email
                    that.addDialog.form.company_id = res.data.info.company_id
                    that.changeAddCompany()
                })
            }else{
                this.addDialog.addTitle = '新增用户'
            }

            this.addDialog.addDialogVisible = true
        },
        doAddUser(){
            let that = this
            post(userApi.add + '/' + this.addDialog.form.id, { user: this.addDialog.form }).then((res) => {
                that.$message({
                    type: 'success',
                    message: res.msg,
                })

                that.addDialog.form.id = ""
                that.addDialog.form.rel_name = ""
                that.addDialog.form.name = ""
                that.addDialog.form.email = ""
                that.addDialog.form.company_id = ""
                that.addDialog.form.department_id = ""
                that.addDialog.addDialogVisible = false
                that.getData()
            })
        },
        handleCurrentChange(val){
            this.current = val
            this.getData()
        },
        changeCompany(){
            this.search.department_id = ""
            this.getDepartment(this.search.company_id)
        },
        changeAddCompany(){
            this.getAddDepartment()
        },
        getAddDepartment(){
            let that = this
            get(departmentApi.list, { type: 'select', company_id: this.addDialog.form.company_id }).then((res) =>{
                that.addDialog.departments = res.data.list
            })
        },
        searchData(){
            this.current = 1
            this.getData()
        },
        deleteUser(id){
            var params = { ids: [id].join(',') }
            post(userApi.delete, params).then((res) => {
                this.$message({
                    type: 'success',
                    message: res.msg
                })

                this.getData()
            })
        }
    }
}
</script>

<style lang='less' scoped>
// .el-dialog--center .el-dialog__body{
//     text-align: center;
// }

.user-detail{
    .el-row {
        margin-bottom: .2rem;
        .el-col-3{
            text-align: right;
            text-align-last: justify;
        }
    }
}
</style>
