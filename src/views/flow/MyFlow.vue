<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            我的流程
        </div>
        <el-tabs type="border-card" @tab-click="tabClick" v-model="search.type">
            <el-tab-pane name="myFlow" label="我发起的">
                <el-table :data="list" style="width: 100%">
                    <el-table-column prop="flow_config.name" label="流程名称"></el-table-column>
                    <el-table-column label="当前审核人">
                        <template slot-scope="scope">
                            <template v-if="scope.row.current_check_user_names.length > 0">
                                <span v-for="(user, key) in scope.row.current_check_user_names" :key="key" v-text="user.rel_name + ','"></span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column prop="status_name" label="状态"></el-table-column>
                    <el-table-column prop="created_date" label="发起时间"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" @click="showFlowSteps(scope.row)">查看过程</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination style="float:right;margin-top:1rem;" background layout="prev, pager, next" @current-change="currentChange" :page-count="total"></el-pagination>
            </el-tab-pane>
            <el-tab-pane name="waitCheck" label="待我审核">
                <el-table :data="list" style="width: 100%">
                    <el-table-column prop="flow_config.name" label="流程名称"></el-table-column>
                    <el-table-column label="当前审核人">
                        <template slot-scope="scope">
                            <template v-if="scope.row.current_check_user_names.length > 0">
                                <span v-for="(user, key) in scope.row.current_check_user_names" :key="key" v-text="user.rel_name + ','"></span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column prop="status_name" label="状态"></el-table-column>
                    <el-table-column prop="created_date" label="发起时间"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" @click="checkFlow(scope.row)">审核</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination style="float:right;margin-top:1rem;" background layout="prev, pager, next" @current-change="currentChange" :page-count="total"></el-pagination>
            </el-tab-pane>
            <el-tab-pane name="hadCheck" label="我已审核">
                <el-table :data="list" style="width: 100%">
                    <el-table-column prop="flow_config.name" label="流程名称"></el-table-column>
                    <el-table-column label="发起人" prop="apply_user.rel_name"></el-table-column>
                    <el-table-column prop="status_name" label="状态"></el-table-column>
                    <el-table-column prop="created_date" label="发起时间"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" @click="showFlowSteps(scope.row)">查看过程</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination style="float:right;margin-top:1rem;" background layout="prev, pager, next" @current-change="currentChange" :page-count="total"></el-pagination>
            </el-tab-pane>
        </el-tabs>
        
        <el-dialog center :title="checkStepDialog.title" :visible.sync="checkStepDialog.show">
            <div :style="'height:' + checkStepDialog.height + 'px;'">
                <el-steps direction="vertical" align-center :active="checkStepDialog.active">
                    <el-step :status="item.processStatus" v-for="(item, key) in checkStepDialog.info" :key="key" :title="item.title" :description="item.description"></el-step>
                </el-steps>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="checkStepDialog.show = false">取 消</el-button>
                <el-button type="primary" @click="checkStepDialog.show = false">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog center :title="checkFlowDialog.title" :visible.sync="checkFlowDialog.show">
            <el-form :model="checkFlowDialog.form">
                <el-form-item label="结果">
                    <el-select v-model="checkFlowDialog.form.status" style="width: 100%;">
                        <el-option :value="1" label="通过"></el-option>
                        <el-option :value="-1" label="驳回"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="checkFlowDialog.form.remark" placeholder="审批备注" type="textarea"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="checkFlowDialog.show = false">取 消</el-button>
                <el-button type="primary" @click="doCheclFlow">确 定</el-button>
            </span>
        </el-dialog>
    </el-card>
</template>
<script>
import { get, post } from "@/api/index"
import flowApi from "@/api/flow"

export default {
    data(){
        return {
            list: [],
            total: 0,
            search: {
                type: "myFlow",
                page: 1,
            },
            checkStepDialog: {
                title: "",
                height: 0,
                active: 0,
                show: false,
                info: {}
            },
            checkFlowDialog: {
                show: false,
                title: "",
                form: {
                    id: "",
                    status: 1,
                    remark: ""
                }
            }
        }
    },
    created(){
        this.getData()
    },
    methods: {
        tabClick(tab, event){
            this.search.page = 1
            this.list = []
            this.search.type = tab.name
            this.getData()
        },
        getData(){
            get(flowApi.getFlowList, this.search).then((res) => {
                this.list = res.data.list.data
                this.total = res.data.list.last_page
            })
        },
        currentChange(page){
            this.search.page = page
            this.getData()
        },
        showFlowSteps(data){
            this.checkStepDialog.title = "审批日志"
            this.checkStepDialog.info = data.flow_steps

            var hasError = false
            var hasProcess = false
            this.checkStepDialog.info.map((item, key) => {
                console.log(item)
                var title = "审批人:"
                var description = "状态:";
                var processStatus = "wait"
                if(!hasProcess){
                    processStatus = "process"
                    hasProcess = true
                }else{
                    processStatus = "wait"
                }
                if(item.status == 1){
                    processStatus = "success"
                    description += "通过;审核时间:" + item.flow_log.created_date + ";备注:" + item.flow_log.remark
                    this.checkStepDialog.active = this.checkStepDialog.active + 1
                }else if(item.status == -1){
                    processStatus = "error"
                    hasError = true
                    description += "驳回;审核时间:" + item.flow_log.created_date + ";备注:" + item.flow_log.remark
                }else {
                    if(hasError){
                        description += "不需要审核;"
                    }else{
                        description += "待审核;"
                    }
                }
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
                this.checkStepDialog.info[key].description = description
                this.checkStepDialog.info[key].processStatus = processStatus
            })
            this.checkStepDialog.height = data.flow_steps.length * 100
            this.checkStepDialog.show = true
        },
        checkFlow(data){
            this.checkFlowDialog.title = data.apply_user.rel_name + "发起的()" + data.flow_config.name + "审核"
            this.checkFlowDialog.form.id = data.id
            this.checkFlowDialog.show = true
        },
        doCheclFlow(){
            const loading = this.$loading({
                lock: true,
                text: '提交中，请不要刷新页面',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            post(flowApi.checkFlow + this.checkFlowDialog.form.id, this.checkFlowDialog.form).then((res) => {
                loading.close()
                if(res.code == 1){
                    this.checkFlowDialog.show = false
                    this.$message.success(res.msg)
                    this.getData()
                }else{
                    this.$message.error(res.msg)
                }
            }).catch((err) => {
                loading.close()
            })
        },
    }
}
</script>
<style scoped>

</style>