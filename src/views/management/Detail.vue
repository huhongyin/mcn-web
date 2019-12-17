<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <el-row :gutter="20">
                <el-col :span="3" :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
                    <el-input class="card-header-input" placeholder="关键词" v-model="search.keywords"></el-input>
                </el-col>
                <el-col :span="3" :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
                    <el-select v-model="search.company" placeholder="公司">
                        <el-option
                        v-for="item in search.companies"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="3" :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
                    <el-select v-model="search.department" placeholder="部门">
                        <el-option
                        v-for="item in search.departments"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="7" :xs="3" :sm="3" :md="10" :lg="8" :xl="8">
                    <el-date-picker
                        style="width:100%;"
                        v-model="search.select_date"
                        type="datetimerange"
                        range-separator="-"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </el-col>
                <el-col :span="2" :xs="2" :sm="2" :md="3" :lg="5" :xl="5">
                    <el-button class="offset-left-30 btn-search" @click="getData">搜索</el-button>
                </el-col>
            </el-row>
        </div>
        <el-table stripe ref="multipleTable" :data="list" tooltip-effect="dark" :header-cell-style="{background:'#EFF5F9'}">
                <!-- <el-table-column type="selection"></el-table-column> -->
                <el-table-column label="序号" type="index"></el-table-column>
                <el-table-column label="主播名" prop="username"></el-table-column>
                <el-table-column label="所属平台" prop="plat.name"></el-table-column>
                <el-table-column label="扶持金额" prop="more_money"></el-table-column>
                <el-table-column label="礼物收入" prop="yestoday_money"></el-table-column>
                <el-table-column label="分成模式" prop="cal_type"></el-table-column>
                <el-table-column label="公司收益" prop="company_money"></el-table-column>
                <el-table-column label="个人收益" prop="person_money"></el-table-column>
                <el-table-column label="时长" prop="time"></el-table-column>
                <el-table-column label="备注" prop="remark" show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="userDetail(scope.row.id)" type="text" size="small">详情</el-button>
                        <el-button @click="addUser(scope.row.id)" type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination class="right offset-top-31 offset-bottom-46" background layout="prev, pager, next" :page-count="totalPage" @current-change="handleCurrentChange"></el-pagination>
            <el-dialog title="用户详情" :visible.sync="showDetailDialog.centerDialogVisible" width="800px" center>
                <div class="center">
                    <div>
                        <span class="user-detail-text">主播名：</span><span class="user-detail-value" v-text="detail.username"></span>
                    </div>
                    <div>
                        <span class="user-detail-text">年龄：</span><span class="user-detail-value" v-text="detail.age"></span>
                    </div>
                    <div>
                        <span class="user-detail-text">所属平台：</span><span class="user-detail-value" v-text="detail.plat.name"></span>
                    </div>
                    <div>
                        <span class="user-detail-text">昨日礼物流水：</span><span class="user-detail-value" v-text="detail.yestoday_money"></span>
                    </div>
                    <div>
                        <span class="user-detail-text">上月应发工资：</span><span class="user-detail-value" v-text="detail.last_month_money"></span>
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
                    <!-- <el-form :rules="addUserDialog.rules" ref="addForm" :model="addUserDialog.form"> -->
                    <el-form ref="addForm" :model="addUserDialog.form">
                        <el-input v-model="addUserDialog.form.id" type="hidden" autocomplete="off"></el-input>
                        <!-- <el-form-item label="账号" class="add-user-dialog-label" :label-width="addUserDialog.formLabelWidth"> -->
                        <el-form-item prop="username" label="主播名：" :label-width="addUserDialog.formLabelWidth">
                            <el-input v-model="addUserDialog.form.username" autocomplete="off" required></el-input>
                        </el-form-item>
                        <el-form-item prop="yestoday_money" label="昨日礼物流水：" :label-width="addUserDialog.formLabelWidth">
                            <el-input v-model="addUserDialog.form.yestoday_money" autocomplete="off" required></el-input>
                        </el-form-item>
                        <el-form-item label="所属平台：" :label-width="addUserDialog.formLabelWidth">
                            <el-select style="width:100%;" v-model="addUserDialog.form.plat.name" placeholder="请选择平台" required>
                                <el-option :key="i" v-for="(item, i) in search.platsList" :label="item.name" :value="item.id"></el-option>
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
import { fPost } from '@/api/index.js';
import adminApi from '@/api/admin.js';
export default {
    created(){
        this.getRole()
        this.getData()
    },
    data(){
        return {
            search:{
                platsList:[
                    {
                        id: 1,
                        name: '抖音'
                    },
                    {
                        id: 2,
                        name: '陌陌'
                    },
                    {
                        id: 3,
                        name: '火山小视频'
                    },
                ],
                select_date: '',
                keywords : "",
                plats: "",
                fenzu: "",
                company: "",
                department: "",
                companies: [
                    {
                        id: "",
                        name: "全部"
                    },
                    {
                        id: 1,
                        name: "子公司一"
                    },
                ],
                departments: [
                    {
                        id: "",
                        name: "全部"
                    },
                    {
                        id: 1,
                        name: "运营部一"
                    },
                ],
                fenzuList: [
                    {
                        id: 1,
                        name: '运营小组一'
                    },
                    {
                        id: 2,
                        name: '运营小组二'
                    },
                    {
                        id: 3,
                        name: '运营小组三'
                    },
                ]
            },
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            addUserDialog:{
                addUserTitle : '新增用户',
                addUserDialogVisible: false,
                form:{
                    plat: {
                        id: 1,
                        name: '抖音'
                    }
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
                form: {
                    id: "",
                },
                centerDialogVisible: false,
            },
            size : 10,
            current : 1,
            totalPage: 0,
            total: 0,
            list: [
                {
                    id: 1,
                    username: '晓晓',
                    more_money: 2001,
                    plat: {
                        id: 1,
                        name: '抖音'
                    },
                    yestoday_money: 2000,
                    remark: '备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注',
                    date: '2019年7月23日',
                    gift_in: '2000',
                    cal_type: '基础工资+流水*0.6',
                    time: '8小25分', //在线时长,
                    company_money: '1500', //公司收益,
                    person_money: '400', //个人收益
                },
                {
                    id: 2,
                    username: '晓晓1',
                    more_money: 2001,
                    plat: {
                        id: 1,
                        name: '抖音'
                    },
                    yestoday_money: 2000,
                    remark: '备注备注备注',
                    date: '2019年7月23日',
                    gift_in: '2000',
                    cal_type: '基础工资+流水*0.6',
                    time: '8小25分', //在线时长,
                    company_money: '1500', //公司收益,
                    person_money: '400', //个人收益
                },
                {
                    id: 2,
                    username: '晓晓2',
                    more_money: 2001,
                    plat: {
                        id: 1,
                        name: '抖音'
                    },
                    yestoday_money: 2000,
                    remark: '备注备注备注',
                    date: '2019年7月23日',
                    gift_in: '2000',
                    cal_type: '基础工资+流水*0.6',
                    time: '8小25分', //在线时长,
                    company_money: '1500', //公司收益,
                    person_money: '400', //个人收益
                },
            ],
            detail: {
                id: 1,
                username: '晓晓',
                yestoday_money: 2100,
                remark: '备注备注备注备注',
                plat: {
                    id: 1,
                    name: '陌陌'
                }
            },
            multipleSelection : [],
            selectIds: [],
        }
    },
    methods:{
        getData(){
            // var params = { current : this.current, size : this.size, username : this.search.keywords, roleId: this.search.role }
            // var that = this
            // fPost(adminApi.adminList, params)
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
        userDetail(id){
            this.showDetailDialog.form.id = id
            this.showDetailDialog.centerDialogVisible = true
            // var params = { id: id }
            // var that = this
            // fPost(adminApi.adminDetail, params).then(function(res){
            //     that.detail = res.data
            //     that.showDetailDialog.centerDialogVisible = true
            // }).catch(function(err){
            //     console.log('error')
            //     console.log(err)
            // })
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
            this.addUserDialog.addUserDialogVisible = false 
            return false
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
            // let that = this
            // get(roleApi.allRole, {}).then(function(res){
            //     that.search.roleList = res.data 
            // })
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
