<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>流程管理</span>
        </div>
        <el-row :gutter="10" style="margin-bottom:1rem;">
            <el-col :span="3">
                <el-select v-model="search.company_id">
                    <el-option v-for="(company, key) in companies" :key="key" :value="company.id" :label="company.name"></el-option>
                </el-select>
            </el-col>
            <el-col :span="3">
                <el-input placeholder="输入关键字搜索" v-model="search.keyword"></el-input>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" @click="searchData">搜索</el-button>
            </el-col>
            <el-col :span="3" :offset="13">
                <el-button type="primary" style="float:right;" @click="addTemplate">新增</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-table stripe :data="list" tooltip-effect="dark" :header-cell-style="{background:'#EFF5F9'}">
                    <el-table-column fixed label="所属公司" prop="company.name"></el-table-column>
                    <el-table-column fixed label="流程名称" prop="name"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" @click="updateFlowConfig(scope.row.id)">编辑</el-button>
                            <el-button type="text" @click="showFlowSteps(scope.row)">查看步骤</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination class="right offset-top-31 offset-bottom-46" background :total="total" layout="total, prev, pager, next"></el-pagination>
            </el-col>
        </el-row>
        <el-dialog center :title="checkStepDialog.title" :visible.sync="checkStepDialog.show">
            <div>
                <el-steps align-center :active="checkStepDialog.info.length">
                    <el-step v-for="(item, key) in checkStepDialog.info" :key="key" :title="item.title">
                    </el-step>
                </el-steps>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="checkStepDialog.show = false">取 消</el-button>
                <el-button type="primary" @click="checkStepDialog.show = false">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog center title="编辑流程" :visible.sync="updateFlowConfigDialog.show">
            <el-form :model="updateFlowConfigDialog.info" label-width="80px">
                <el-tabs v-model="activeName2" type="border-card">
                    <el-tab-pane label="流程信息" name="first">
                        <el-form-item label="所属公司">
                            <el-select @change="changeAddFlowCompany" v-model="updateFlowConfigDialog.info.company_id" style="width:100%;">
                                <el-option v-for="(company, key) in companies" :key="key" :label="company.name" :value="company.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="流程名称">
                            <el-input v-model="updateFlowConfigDialog.info.name"></el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="审批步骤" name="second">
                        <el-row :gutter="10">
                            <el-col :span="4">
                                <el-button type="primary" @click="addStep">新增步骤</el-button>
                            </el-col>
                        </el-row>
                        <!-- <template v-if="updateFlowConfigDialog.info.flow_config_steps.length > 0"> -->
                            <el-row style="margin-top:1rem;" :gutter="10" v-for="(item, key) in updateFlowConfigDialog.info.flow_config_steps" :key="key">
                                <el-col :span="2">
                                    <span v-text="item.sort + ':'"></span>
                                </el-col>
                                <el-col :span="18">
                                    <el-select style="width:100%;" multiple v-model="item.user_ids">
                                        <el-option v-for="(user, k) in users" :key="k" :label="user.rel_name" :value="user.id"></el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="4">
                                    <el-button type="danger" size="small" @click="deleteStep(item.id)">删除</el-button>
                                </el-col>
                            </el-row>
                        <!-- </template> -->
                    </el-tab-pane>
                </el-tabs>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="updateFlowConfigDialog.show = false">取 消</el-button>
                <el-button type="primary" @click="saveFlowConfig">保 存</el-button>
            </span>
        </el-dialog>
    </el-card>
    
</template>
<script>
import flowApi from "@/api/flow"
import userApi  from "@/api/user"
import companyApi from "@/api/company"
import { get, post } from "@/api/index"

export default {
    data(){
        return {
            activeName2: "first",
            search: {
                keyword: "",
                company_id: "",
                page: 1,
            },
            checkStepDialog: {
                title: "",
                height: 0,
                show: false,
                info: {}
            },
            updateFlowConfigDialog: {
                show: false,
                info: {
                    id: "",
                    name: "",
                    flow_config_steps: [],
                },
            },
            list: [],
            total: 0,
            companies: [],
            users: [],
        }
    },
    created(){
        this.getCompanies()
        this.getData()
    },
    methods: {
        searchData(){
            this.search.page = 1
            this.getData()
        },
        changeAddFlowCompany(companyId){
            this.getUserByCompanyId(companyId, true)
        },
        showFlowSteps(data){
            this.checkStepDialog.title = data.name + "审批步骤"
            this.checkStepDialog.info = data.flow_config_steps
            this.checkStepDialog.info.map((item, key) => {
                var title = "审批人:"
                if(item.users.length > 0){
                    item.users.map((i) => {
                        if(title != "审批人:"){
                            title  = title + ',' + i.rel_name
                        }else{
                            title = title + i.rel_name
                        }
                    })
                }
                this.checkStepDialog.info[key].title = title
            })
            this.checkStepDialog.height = data.flow_config_steps.length * 100
            this.checkStepDialog.show = true
        },
        updateFlowConfig(flowConfigId){
            get(flowApi.flowConfigDetail + flowConfigId).then((res) => {
                this.updateFlowConfigDialog.info = res.data.info
                //获取公司下用户数据
                this.getUserByCompanyId(this.updateFlowConfigDialog.info.company_id, false)
                this.updateFlowConfigDialog.show = true
            })
        },
        getUserByCompanyId(companyId, flag){
            get(userApi.list, { type: "select", company_id: companyId }).then((res) => {
                this.users = res.data.list
                if(this.updateFlowConfigDialog.info.flow_config_steps.length > 0 && flag){
                    this.updateFlowConfigDialog.info.flow_config_steps.map((item, key) => {
                        this.updateFlowConfigDialog.info.flow_config_steps[key].user_ids = new Array()
                    })
                }
            })
        },
        getData(){
            get(flowApi.flowConfigList, this.search).then((res) => {
                this.list = res.data.list.data
                this.total = res.data.total
            })
        },
        getCompanies(){
            get(companyApi.list, { type: "select" }).then((res) => {
                this.companies = res.data.list
                if(this.companies.length > 1){
                    this.search.company_id = this.companies[0].id
                }
            })
        },
        deleteStep(stepId){
            this.updateFlowConfigDialog.info.flow_config_steps.map((item, key) => {
                if(item.id == stepId){
                    this.updateFlowConfigDialog.info.flow_config_steps.splice(key, 1)
                }
            })
        },
        addStep(){
            var maxSort
            if(typeof this.updateFlowConfigDialog.info == "undefined"){
                maxSort = 0
            }else{
                maxSort = this.updateFlowConfigDialog.info.flow_config_steps[this.updateFlowConfigDialog.info.flow_config_steps.length - 1].sort
            }
            var item = {
                id: "",
                user_ids: [],
                sort: maxSort + 1,
            }
            this.updateFlowConfigDialog.info.flow_config_steps.push(item)
        },
        addTemplate(){

        },
        saveFlowConfig(){
            post(flowApi.createOrUpdateFlowConfig + this.updateFlowConfigDialog.info.id, this.updateFlowConfigDialog.info).then((res) => {

            })
        }
    }
}
</script>
<style scoped>

</style>