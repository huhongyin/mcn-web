<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>部门列表</span>
            <el-button class="right" type="text" @click="add(0)">新增</el-button>
            <!-- <el-row :gutter="10">
                <el-col :span="4">
                    <el-select v-model="search.company_id">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="(item, key) in search.companies" :key="key" :value="item.id" :label="item.name"></el-option>
                    </el-select>
                </el-col>
                <el-col :sm="8">
                    <el-button class="btn-search" @click="searchData">搜索</el-button>
                </el-col>
                <el-col :span="12">
                    <el-button class="right" type="primary" style="float:right;" @click="add(0)">新增</el-button>
                </el-col>
            </el-row> -->
        </div>
        <!-- <el-table stripe ref="multipleTable" :data="list" tooltip-effect="dark" :header-cell-style="{background:'#EFF5F9'}">
                <el-table-column label="序号" type="index"></el-table-column>
                <el-table-column label="部门名" prop="name"></el-table-column>
                <el-table-column label="负责人" prop="user.rel_name"></el-table-column>
                <el-table-column label="所属公司" prop="company.name"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="add(scope.row.id)" type="text" size="small">编辑</el-button>
                        <el-button @click="deleteDepartment(scope.row.id)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination class="right offset-top-31 offset-bottom-46" background layout="prev, pager, next" :total="total" @current-change="handleCurrentChange"></el-pagination> -->
            <el-row :gutter="10">
                <el-tree :data="data" node-key="id" default-expand-all :expand-on-click-node="false">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <el-col :span="6">
                            <span>{{ node.label }}</span>
                        </el-col>
                        <el-col :span="6">
                            <span>{{ data.company_name }}</span>
                        </el-col>
                        <el-col :span="6">
                            <span>{{ data.user_name }}</span>
                        </el-col>
                        <el-col :span="2">
                            <span>
                                <el-button
                                    type="text"
                                    size="mini"
                                    @click="() => edit(node, data)">
                                    编辑
                                </el-button>
                                <el-button
                                    type="text"
                                    size="mini"
                                    @click="() => remove(node, data)">
                                    删除
                                </el-button>
                            </span>
                        </el-col>
                    </span>
                </el-tree>
            </el-row>
            <!-- TODO 文字间距设置 -->
            <el-dialog :title="addDialog.addTitle" :visible.sync="addDialog.addDialogVisible" width="800px" center @close="close">
                <div class="center break">
                    <el-form :model="addDialog.form">
                        <el-input v-model="addDialog.form.id" type="hidden" autocomplete="off"></el-input>
                        <!-- <el-form-item label="账号" class="add-user-dialog-label" :label-width="addUserDialog.formLabelWidth"> -->
                        <el-form-item label="部门名称：" :label-width="addDialog.formLabelWidth">
                            <el-input v-model="addDialog.form.name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="所属公司：" :label-width="addDialog.formLabelWidth">
                            <el-cascader style="width:100%;" v-model="addDialog.form.company_id" :options="search.companies" :props="{ expandTrigger: 'hover', checkStrictly: 'true' }" @change="handleChange"></el-cascader>
                            <!-- <el-select style="width:100%;" v-model="addDialog.form.company_id" @change="changeCompany">
                                <el-option v-for="(item,key) in search.companies" :key="key" :label="item.name" :value="item.id"></el-option>
                            </el-select> -->
                        </el-form-item>
                        <el-form-item label="负责人：" :label-width="addDialog.formLabelWidth">
                            <el-select style="width:100%;" v-model="addDialog.form.user_id">
                                <el-option v-for="(item,key) in search.users" :key="key" :label="item.rel_name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="部门类型：" :label-width="addDialog.formLabelWidth">
                            <el-select style="width:100%;" v-model="addDialog.form.type">
                                <el-option v-for="(item,key) in search.dep_types" :key="key" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="doAdd">保 存</el-button>
                    <el-button @click="close">取 消</el-button>
                </span>
            </el-dialog>
    </el-card>
</template>

<script>
import { get, post} from '@/api/index.js';
import departmentApi from '@/api/department.js';
import companyApi from '@/api/company.js';
import userApi from '@/api/user.js';
export default {
    created(){
        this.getDepTypes()
        this.getUsers(0)
        this.getCompany()
        this.getData()
    },
    data(){
        return {
            data: [],
            search:{
                company_id: "",
                companies: [],
                users: [],
                dep_types:[],
            },
            addDialog:{
                addTitle : '新增部门',
                addDialogVisible: false,
                form:{
                    id: 0,
                    company_id : "",
                    name: "",
                    user_id: "",
                    type: 0,
                },
                formLabelWidth: '130px',
            },
            current : 1,
            total: 0,
            list: [],
        }
    },
    methods:{
        getData(){
            let params = { current : this.current, company_id: this.search.company_id }
            get(departmentApi.list, params).then((res) => {
                this.list = res.data.list.data
                this.total = res.data.list.total
                this.data = res.data.list
            })
        },
        edit(node, data) {
            this.add(data.id)
        },

        remove(node, data) {
            this.deleteDepartment(data.id)
        },
        getCompany(){
            let that = this
            get(departmentApi.parents).then((res) =>{
                that.search.companies = res.data.list
            })
        },
        getUsers(company_id){
            let that = this
            get(userApi.list, { type: 'select', company_id: company_id }).then((res) =>{
                that.search.users = res.data.list
            })
        },
        add(id){
            if(id > 0){
                //编辑时要获取对应角色的权限数据
                this.addDialog.addTitle = '编辑部门'
                get(departmentApi.detail + '/' + id).then((res) => {
                    this.addDialog.form.id = id
                    this.addDialog.form.name = res.data.info.name
                    this.addDialog.form.company_id = res.data.info.company_id
                    this.addDialog.form.user_id = res.data.info.user_id
                    this.addDialog.form.type = parseInt(res.data.info.type)
                    this.changeCompany()
                    this.addDialog.addDialogVisible = true
                })
            }else{
                this.addDialog.addTitle = '新增部门'
                this.addDialog.addDialogVisible = true
            }
        },
        doAdd(){
            let that = this
            post(departmentApi.add + '/' + this.addDialog.form.id, { info: this.addDialog.form }).then((res) => {
                that.$message({
                    type: 'success',
                    message: res.msg,
                })

                that.addDialog.form.id = 0
                that.addDialog.form.company_id = ""
                that.addDialog.form.name = ""
                that.addDialog.form.user_id = ""
                that.addDialog.addDialogVisible = false
                that.addDialog.form.type = 0
                that.getData()
            })
        },
        close(){
            this.addDialog.form.id = 0
            this.addDialog.form.company_id = ""
            this.addDialog.form.name = ""
            this.addDialog.form.user_id = ""
            this.addDialog.addDialogVisible = false
            this.addDialog.form.type = 0
        },
        handleCurrentChange(val){
            this.current = val
            this.getData()
        },
        searchData(){
            this.current = 1
            this.getData()
        },
        changeCompany(){
            this.getUsers(this.addDialog.form.company_id[0])
        },
        deleteDepartment(id){
            var params = { ids: [id].join(',') }

            post(departmentApi.delete, params).then( (res) => {
                this.$message({
                    type: 'success',
                    message: res.msg
                })
                this.getData()
            } )
        },
        getDepTypes(){
            get(departmentApi.types).then((res) => {
                this.search.dep_types = res.data.list
            })
        },
        handleChange(value) {
            console.log(value);
        }
    }
}
</script>

<style lang='less' scoped>
.el-form > .add-user-dialog-label > label{
    color: black;
    font-weight: 400;
}
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
