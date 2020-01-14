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
                <el-button type="primary" style="float:right;" @click="updateFlowConfig(0)">新增</el-button>
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
                            <el-button type="text" @click="deleteFlowConfig(scope.row.id)">删除</el-button>
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
                        <el-form-item label="流程类型">
                            <el-select style="width: 100%;" @change="changeFlowType" v-model="updateFlowConfigDialog.info.type">
                                <el-option  v-for="(type,key) in updateFlowConfigDialog.types" :key="key" :label="type.label" :value="type.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="所属公司">
                            <el-select @change="changeAddFlowCompany" v-model="updateFlowConfigDialog.info.company_id" style="width:100%;">
                                <el-option v-for="(company, key) in companies" :key="key" :label="company.name" :value="company.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="流程名称">
                            <el-input v-model="updateFlowConfigDialog.info.name"></el-input>
                        </el-form-item>
                        <el-form-item v-show="updateFlowConfigDialog.show_auto_sign" label="扶持金额触发数值">
                            <el-input v-model="updateFlowConfigDialog.info.support_money" placeholder="请输入扶持金额触发数值,不填默认不触发"></el-input>
                        </el-form-item>
                        <el-form-item v-show="updateFlowConfigDialog.show_auto_sign" label="底薪触发数值">
                            <el-input v-model="updateFlowConfigDialog.info.salary" placeholder="请输入底薪触发数值,不填默认不触发"></el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="审批步骤" name="second">
                        <el-row :gutter="10">
                            <el-col :span="4">
                                <el-button type="primary" @click="addStep">新增步骤</el-button>
                            </el-col>
                        </el-row>
                        <!-- <template v-if="updateFlowConfigDialog.info.flow_config_steps.length > 0"> -->
                            <draggable v-model="updateFlowConfigDialog.info.flow_config_steps" @update="datadragEnd" :options = "{animation:500}">
                                <el-row style="margin-top:1rem;" :gutter="10" v-for="(item, key) in updateFlowConfigDialog.info.flow_config_steps" :key="key">
                                    <el-col :span="2">
                                        <span v-if="item.sort != ''" v-text="item.sort + ':'"></span>
                                        <span></span>
                                    </el-col>
                                    <el-col :span="18">
                                        <el-select filterable style="width:100%;" v-model="item.user_ids">
                                            <el-option v-for="(user, k) in users" :key="k" :label="user.rel_name" :value="user.id"></el-option>
                                        </el-select>
                                    </el-col>
                                    <el-col :span="4">
                                        <el-button type="danger" size="small" @click="deleteStep(item.id, item.index)">删除</el-button>
                                    </el-col>
                                </el-row>
                            </draggable>
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
import draggable from 'vuedraggable'

export default {
    components: {
        draggable
    },
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
                types: [
                    {
                        label: "自动签",
                        value: "auto_sign",
                    },
                    {
                        label: "其他",
                        value: "other",
                    }
                ],
                info: {
                    id: "",
                    name: "",
                    type: "auto_sign",
                    support_money: 0,
                    salary: 0,
                    flow_config_steps: [],
                },
            },
            list: [],
            total: 0,
            companies: [],
            users: [],
            default_type: "auto_sign"
        }
    },
    created(){
        this.getCompanies()
    },
    methods: {
        changeFlowType(val){
            this.updateFlowConfigDialog.types.map((type) => {
                var key = "show_" + type.value
                if(type.value != val){
                    this.$set(this.updateFlowConfigDialog, key, false)
                }else{
                    this.$set(this.updateFlowConfigDialog, key, true)
                }
            })
        },
        datadragEnd(evt) {
            evt.preventDefault();
        },
        searchData(){
            this.search.page = 1
            this.getData()
        },
        deleteFlowConfig(id){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                post(flowApi.deleteFlowConfig + id).then((res) => {
                    if(res.code == 1){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.search.page = 1
                        this.getData()
                    }else{
                        this.$message.error(res.msg)
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
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
            this.updateFlowConfigDialog.info = {
                id: 0,
                name: "",
                type: this.default_type,
                flow_config_steps: [],
            }
            if(flowConfigId != 0){
                get(flowApi.flowConfigDetail + flowConfigId).then((res) => {
                    this.updateFlowConfigDialog.info = res.data.info
                    if(typeof this.updateFlowConfigDialog.info.params != "undefined"){
                        for (const key in this.updateFlowConfigDialog.info.params) {
                            if (this.updateFlowConfigDialog.info.params.hasOwnProperty(key)) {
                                const element = this.updateFlowConfigDialog.info.params[key];
                                
                                this.$set(this.updateFlowConfigDialog.info, key, element)
                            }
                        }
                        // this.updateFlowConfigDialog.info.params.map((v,k) => {
                        //     this.$set(this.updateFlowConfigDialog.info, k, v)
                        // })
                    }
                    //获取公司下用户数据
                    this.getUserByCompanyId(this.updateFlowConfigDialog.info.company_id, false)
                    this.updateFlowConfigDialog.show = true
                })
            }else{
                this.updateFlowConfigDialog.show = true
            }

            this.changeFlowType(this.updateFlowConfigDialog.info.type)
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
                this.getData()
            })
        },
        deleteStep(stepId, index){
            this.updateFlowConfigDialog.info.flow_config_steps.map((item, key) => {
                if(typeof stepId != "undefined" && stepId != null && stepId != ""){
                    if(item.id == stepId){
                        this.updateFlowConfigDialog.info.flow_config_steps.splice(key, 1)
                    }
                }else{
                    if(index == key){
                        this.updateFlowConfigDialog.info.flow_config_steps.splice(key, 1)
                    }
                }
            })
        },
        addStep(){
            var maxSort
            var index
            if(typeof this.updateFlowConfigDialog.info == "undefined" || typeof this.updateFlowConfigDialog.info.flow_config_steps == 'undefined' || this.updateFlowConfigDialog.info.flow_config_steps.length <= 0){
                maxSort = 0
                index = 0
            }else{
                maxSort = this.updateFlowConfigDialog.info.flow_config_steps[this.updateFlowConfigDialog.info.flow_config_steps.length - 1].sort
                index = this.updateFlowConfigDialog.info.flow_config_steps.length
            }
            var item = {
                id: "",
                user_ids: [],
                sort: "",
                index: index,
            }
            this.updateFlowConfigDialog.info.flow_config_steps.push(item)
        },
        saveFlowConfig(){
            post(flowApi.createOrUpdateFlowConfig + this.updateFlowConfigDialog.info.id, this.updateFlowConfigDialog.info).then((res) => {
                if(res.code != 1){
                    this.$message.error(res.msg)
                    return false
                }

                this.$message.success(res.msg)
                this.updateFlowConfigDialog.show = false
                this.getData()
            })
        }
    }
}
</script>
<style scoped>

</style>