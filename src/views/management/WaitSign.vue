<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>待签署主播列表</span>
        </div>
        <!-- <el-row :gutter="10" style="margin-bottom: 1rem;">
            <el-col :md="4" :sm="3" :lg="3">
                <el-input v-model="search.keyword" placeholder="输入关键字搜索"></el-input>
            </el-col>
            <el-col :md="3" :sm="3" :lg="3">
                <el-select style="width:100%;" v-model="search.company_id" filterable placeholder="筛选公司" @change="changeSearchCompany">
                    <el-option value="" label="全部"></el-option>
                    <el-option v-for="item in addDialog.companies" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-col>
            <el-col :md="3" :sm="3" :lg="3">
                <el-select style="width:100%;" v-model="search.sign_user_id" filterable placeholder="筛选签约人">
                    <el-option v-for="item in sign_users" :key="item.id" :label="item.rel_name" :value="item.id"></el-option>
                </el-select>
            </el-col>
            <el-col :md="3" :sm="3" :lg="3">
                <el-select style="width:100%;" v-model="search.operate_user_id" filterable placeholder="筛选运营人">
                    <el-option v-for="item in operate_users" :key="item.id" :label="item.rel_name" :value="item.id"></el-option>
                </el-select>
            </el-col>
            <el-col :md="3" :sm="3" :lg="3">
                <el-select style="width:100%;" v-model="search.plat_id" filterable placeholder="筛选平台">
                    <el-option value="" label="全部"></el-option>
                    <el-option v-for="item in addDialog.plats" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-col>
            <el-col :md="3" :sm="3" :lg="3">
                <el-select v-model="search.level" style="width: 100%;">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="(item,key) in addDialog.levels" :key="key" :value="item.id" :label="item.name"></el-option>
                </el-select>
            </el-col>
            <el-col :md="2" :sm="2" :lg="2">
                <el-button type="primary" @click="getData">搜索</el-button>
            </el-col>
            <el-col :md="3" :sm="4" :lg="4">
                <el-button type="primary" @click="add(0)">新增</el-button>
            </el-col>
        </el-row> -->
        <el-table id="managementTable" stripe ref="multipleTable" :data="list" tooltip-effect="dark" :header-cell-style="{background:'#EFF5F9'}" @selection-change="handleSelectionChange">
                <el-table-column type="selection"></el-table-column>
                <el-table-column fixed label="序号" type="index"></el-table-column>
                <el-table-column fixed label="主播实名" prop="actor.name" ></el-table-column>
                <el-table-column fixed label="主播昵称" prop="nickname"></el-table-column>
                <el-table-column label="平台" prop="plat.name"></el-table-column>
                <el-table-column label="身份证号" prop="actor.id_card_no"></el-table-column>
                <el-table-column label="联系电话" prop="actor.phone"></el-table-column>
                <el-table-column label="分成比例" prop="fenchengbi"></el-table-column>
                <el-table-column label="保底工资" prop="salary"></el-table-column>
                <el-table-column label="签约人" prop="sign_user.rel_name"></el-table-column>
                <el-table-column label="运营人" prop="operate_user.rel_name"></el-table-column>
                <el-table-column label="认证状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.actor.status == 0">未激活</span>
                        <span v-else-if="scope.row.actor.status == 1">未认证</span>
                        <span v-else-if="scope.row.actor.status == 2">审核通过</span>
                        <span v-else-if="scope.row.actor.status == 3">已提交,待审核</span>
                        <span v-else-if="scope.row.actor.status == 4">审核不通过</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="signUrl(scope.row.id)" type="text" size="small" style="display:block;">查看签署地址</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination class="right offset-top-31 offset-bottom-46" background layout="prev, pager, next" :page-count="totalPage" @current-change="handleCurrentChange"></el-pagination>
            <el-dialog title="签署地址" :visible.sync="urlDialog.show" width="30%">
                <span v-text="urlDialog.form.url"></span>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="urlDialog.show = false">关 闭</el-button>
                </span>
            </el-dialog>
    </el-card>
</template>

<script>
import { post, get} from '@/api/index.js';
import actorApi from '@/api/actor.js';
import bankApi from '@/api/bank.js';
import companyApi from '@/api/company.js';
import levelApi from '@/api/level.js';
import platApi from '@/api/plats.js';
import departmentApi from '@/api/department.js';
import FileSaver from 'file-saver';
import XLSX from 'xlsx';
import { string } from 'prop-types';
export default {
    created(){
        // this.getSignUsers()
        // this.getOPerateUsers()
        // this.getOperate()
        // this.getSigns()
        // this.getPlats()
        // this.getLevel()
        this.getData()
    },
    data(){
        return {
            sign_users: [],
            operate_users: [],
            search: {
                level: '',
                keyword: '',
                sign_user_id: '',
                operate_user_id: '',
                plat_id: "",
                company_id: "",
                status: "0,1,3,4",
            },
            keywords : "",
            select_date: "",
            size : 10,
            current : 1,
            totalPage: 0,
            contractDetailDialog: {
                show: false,
                detail: {
                    id: '',
                    actor_plat_id: '',
                    contract: '',
                    contract_until: '',
                    contract_date: '',
                }
            },
            list: [],
            multipleSelection : [],
            selectedIDs: [],
            urlDialog: {
                show: false,
                form: {
                    url: ""
                }
            }
        }
    },
    methods:{
        getSignUsers(){
            get(departmentApi.userListByType + '/2', this.search).then((res) => {
                this.sign_users = res.data.list
                this.sign_users.unshift({id: "", rel_name: "全部"})
                this.search.sign_user_id = this.sign_users[0].id
            })
        },
        getOPerateUsers(){
            get(departmentApi.userListByType + '/1', this.search).then((res) => {
                this.operate_users = res.data.list
                this.operate_users.unshift({id: "", rel_name: "全部"})
                this.search.operate_user_id = this.operate_users[0].id
            })
        },
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
            let ids = []
            this.multipleSelection.map((item)=> {
                ids.push(item.id)
            })
            this.selectedIDs = ids
        },
        getData(){
            get(actorApi.list, { 
                    page: this.current, 
                    level: this.search.level, 
                    keyword: this.search.keyword,
                    sign_user_id: this.search.sign_user_id,
                    operate_user_id: this.search.operate_user_id,
                    plat_id: this.search.plat_id,
                    company_id: this.search.company_id,
                    status: this.search.status
                }).then((res) => {
                    
                this.list = res.data.list.data
                this.totalPage = res.data.list.last_page
            })
        },
        handleCurrentChange(val){
            this.current = val
            this.getData()
        },
        changeSearchCompany(){
            this.getSignUsers()
            this.getOPerateUsers()
        },
        getLevel(){
            get(levelApi.list).then((res) => {
                this.addDialog.levels = res.data.list
            })
        },
        getPlats(){
            get(platApi.list).then((res) => {
                this.addDialog.plats = res.data.list
            })
        },
        getOperate(){
            if(typeof this.addDialog.form.actor.company_id != "undefined"){
                get(departmentApi.userListByType + '/' + 1, { company_id: this.addDialog.form.actor.company_id }).then((res) => {
                    this.addDialog.yunyings = res.data.list
                })
            }
        },
        getSigns(){
            if(typeof this.addDialog.form.actor.company_id != "undefined"){
                get(departmentApi.userListByType + '/' + 2, { company_id: this.addDialog.form.actor.company_id, type: "select", check: "sign" }).then((res) => {
                    this.addDialog.sign_users = res.data.list
                })
            }
        },
        signUrl(id){
            get(actorApi.signUrl + id).then((res) => {
                this.urlDialog.form.url = res.data.url
                this.urlDialog.show = true
            })
        },
    }
}
</script>

<style lang='less' scoped>

.actor-tab,.bank-tab,.sign-tab .el-col-4{
    text-align-last: justify;
}
</style>
