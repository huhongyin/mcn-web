<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <!-- <el-input class="card-header-input" placeholder="账号" v-model="keywords"></el-input>
            <el-date-picker
                class="offset-left-30"
                v-model="select_date"
                type="datetimerange"
                range-separator="-"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions">
            </el-date-picker>
            <el-button class="offset-left-30 btn-search" @click="getData">搜索</el-button> -->
            <el-button type="primary">新增</el-button>
            <el-button icon="el-icon-download">导出</el-button>
        </div>
        <el-table stripe ref="multipleTable" :data="list" tooltip-effect="dark" :header-cell-style="{background:'#EFF5F9'}" @selection-change="handleSelectionChange">
                <el-table-column type="selection"></el-table-column>
                <el-table-column label="序号" type="index"></el-table-column>
                <el-table-column label="姓名" prop="name"></el-table-column>
                <el-table-column label="昵称" prop="nickname"></el-table-column>
                <el-table-column label="电话" prop="phone"></el-table-column>
                <el-table-column label="签约人" prop="sign.name"></el-table-column>
                <!-- <el-table-column label="运营分组" prop="group.name"></el-table-column>
                <el-table-column label="等级" prop="level"></el-table-column>
                <el-table-column label="签约时间" prop="sign_time"></el-table-column>
                <el-table-column label="分成模式" prop="cal_type"></el-table-column> -->
                <el-table-column label="签约平台">
                    <template slot-scope="scope">
                        <template v-for="(item,i)  in scope.row.plats">
                            <template v-if="typeof(scope.row.plats[i + 1]) != 'undefined'">
                                <span :key="i" v-text="item.plat.name + ','"></span>
                            </template>
                            <template v-else>
                                <span :key="i" v-text="item.plat.name"></span>
                            </template>
                        </template>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="signDetail(scope.row.id)" type="text" size="small">签约信息</el-button>
                        <el-button @click="userDetail(scope.row.id)" type="text" size="small">艺人信息</el-button>
                        <el-button @click="bankDetail(scope.row.id)" type="text" size="small">银行资料</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination class="right offset-top-31 offset-bottom-46" background layout="prev, pager, next" :total="total" @current-change="handleCurrentChange"></el-pagination>
            <el-dialog title="签约信息" :visible.sync="signDetailDialog.show" width="70%" center>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <span class="user-detail-text">运营分组：</span><span class="user-detail-value" v-text="signDetailDialog.detail.group.name"></span>
                    </el-col>
                    <el-col :span="8">
                        <span class="user-detail-text">运营负责人：</span><span class="user-detail-value" v-text="signDetailDialog.detail.prop_user.name"></span>
                    </el-col>
                    <el-col :span="8">
                        <span class="user-detail-text">招募负责人：</span><span class="user-detail-value" v-text="signDetailDialog.detail.get_user.name"></span>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <span class="user-detail-text">签约时间：</span><span class="user-detail-value" v-text="signDetailDialog.detail.sign_time"></span>
                    </el-col>
                    <el-col :span="8">
                        <span class="user-detail-text">等级：</span><span class="user-detail-value" v-text="signDetailDialog.detail.level"></span>
                    </el-col>
                    <el-col :span="8">
                        <span class="user-detail-text">分成模式：</span><span class="user-detail-value" v-text="signDetailDialog.detail.cal_type"></span>
                    </el-col>
                </el-row>
                <template v-for="(plat,key) in signDetailDialog.detail.plats">
                    <el-row :gutter="20" :key="key">
                        <el-col :span="8">
                            <span class="user-detail-text">签约平台：</span><span class="user-detail-value" v-text="plat.name"></span>
                        </el-col>
                        <el-col :span="8">
                            <span class="user-detail-text">签约平台ID：</span><span class="user-detail-value" v-text="plat.id"></span>
                        </el-col>
                        <el-col :span="8">
                            <span class="user-detail-text">签约有效期：</span><span class="user-detail-value" v-text="plat.untill"></span>
                        </el-col>
                    </el-row>
                </template>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="signDetailDialog.show = false">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog title="艺人信息" :visible.sync="userDetailDialog.show" width="70%" center>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <span class="user-detail-text">真实姓名：</span><span class="user-detail-value" v-text="userDetailDialog.detail.name"></span>
                    </el-col>
                    <el-col :span="8">
                        <span class="user-detail-text">照片：</span><span class="user-detail-value" v-text="userDetailDialog.detail.photo"></span>
                    </el-col>
                    <el-col :span="8">
                        <span class="user-detail-text">手机号：</span><span class="user-detail-value" v-text="userDetailDialog.detail.phone"></span>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <span class="user-detail-text">微信：</span><span class="user-detail-value" v-text="userDetailDialog.detail.wechat"></span>
                    </el-col>
                    <el-col :span="8">
                        <span class="user-detail-text">QQ：</span><span class="user-detail-value" v-text="userDetailDialog.detail.qq"></span>
                    </el-col>
                    <el-col :span="8">
                        <span class="user-detail-text">邮箱：</span><span class="user-detail-value" v-text="userDetailDialog.detail.email"></span>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <span class="user-detail-text">个人简介：</span><span class="user-detail-value" v-text="userDetailDialog.detail.desc"></span>
                    </el-col>
                    <el-col :span="8">
                        <span class="user-detail-text">特长：</span><span class="user-detail-value" v-text="userDetailDialog.detail.special"></span>
                    </el-col>
                    <el-col :span="8">
                        <span class="user-detail-text">外站经验：</span><span class="user-detail-value" v-text="userDetailDialog.detail.out_websiete_exp"></span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <span class="user-detail-text">备注：</span><span class="user-detail-value" v-text="userDetailDialog.detail.remark"></span>
                    </el-col>
                </el-row>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="userDetailDialog.show = false">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog title="银行信息" :visible.sync="bankDetailDialog.show" width="70%" center>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <span class="user-detail-text">开户姓名：</span><span class="user-detail-value" v-text="bankDetailDialog.detail.name"></span>
                    </el-col>
                    <el-col :span="8">
                        <span class="user-detail-text">银行卡号：</span><span class="user-detail-value" v-text="bankDetailDialog.detail.bank_no"></span>
                    </el-col>
                    <el-col :span="8">
                        <span class="user-detail-text">开户银行：</span><span class="user-detail-value" v-text="bankDetailDialog.detail.bank_name"></span>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <span class="user-detail-text">开户支行：</span><span class="user-detail-value" v-text="bankDetailDialog.detail.o_bank_name"></span>
                    </el-col>
                    <el-col :span="8">
                        <span class="user-detail-text">支付宝：</span><span class="user-detail-value" v-text="bankDetailDialog.detail.ali_pay"></span>
                    </el-col>
                </el-row>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="bankDetailDialog.show = false">确 定</el-button>
                </span>
            </el-dialog>
    </el-card>
</template>

<script>
import { fPost, get} from '@/api/index.js';
import userApi from '@/api/user.js';
export default {
    created(){
        this.getData()
    },
    data(){
        return {
            centerDialogVisible : false,
            keywords : "",
            select_date: "",
            size : 10,
            current : 1,
            totalPage: 0,
            total: 0,
            signDetailDialog: {
                show: false,
                detail: {
                    id: 1,
                    group: {
                        id: 1,
                        name: '运营小组一'
                    },
                    prop_user: {
                        id: 1,
                        name: '负责人一',
                    },
                    get_user: {
                        id: 1,
                        name: '招募人一',
                    },
                    sign_time: '2019-08-15 10:14:20', //签约时间,
                    sign_type: '游戏主播', //签约类型
                    level: 'A级',
                    cal_type: '上月总流水*0.8*0.5', //提成计算公式
                    plats: [
                        {
                            id: 1,
                            name: '火山小视频',
                            untill: '2020-07-08'
                        },
                        {
                            id: 2,
                            name: '抖音',
                            untill: '2020-07-08'
                        },
                    ],
                }
            },
            userDetailDialog: {
                show: false,
                detail: {
                    id: 1,
                    name: '张三',
                    photo: 'http://www.baidu.com', //照片,
                    phone: '18244192319', //手机号
                    id_card: '511323199403294011',
                    cal_type: '上月总流水*0.8*0.5', //提成计算公式
                    wechat: 'zhangsan', //微信
                    qq: '1186121410',
                    email: 'zhangsan@qq.com',
                    desc: '个人简介个人简介',
                    special: '唱歌', //特长
                    out_websiete_exp: '外站经验',
                    remark: '备注备注备注备注',
                }
            },
            bankDetailDialog: {
                show: false,
                detail: {
                    id: 1,
                    name: '张三',
                    bank_no: '623105105819538283', //银行卡号,
                    bank_name: '中国银行', //开户行
                    o_bank_name: '工行', //支行
                    ali_pay: '18215185813', //支付宝
                }
            },
            list: [],
            multipleSelection : [],
            selectedIDs: [],
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
            let ids = []
            this.multipleSelection.map((item)=> {
                ids.push(item.id)
            })
            this.selectedIDs = ids
        },
        frozen(type, id){
            if(type == 'checkbox'){
                id = this.selectedIDs
            }else{
                id = [id]
            }
            // var params = { "ids" : id }
            var params = id
            var that = this
            post(userApi.frozenUser, params).then(function(res){
                if(res.code == 200){
                    that.getData()
                }
            })
        },
        unFrozen(type, id){
            if(type == 'checkbox'){
                id = this.selectedIDs
            }else{
                id = [id]
            }
            // var params = { "ids" : id }
            var params = id
            var that = this
            post(userApi.unFrozenUser, params).then(function(res){
                if(res.code == 200){
                    that.getData()
                }
            })
        },
        getData(){
            var params = { page: this.current}
            var that = this
            get(userApi.list, params)
                .then(function(res){
                    that.list = res.data.list.data
                    that.total = res.data.list.total
                    that.current = res.data.list.current_page
                    // that.totalPage = res.data.totalPage
                })
        },
        signDetail(id){
            //签约信息查看
            this.signDetailDialog.id = id
            this.signDetailDialog.show = true
            return false
            // let params = { id: id }
            // let that = this
            // fPost(userApi.phoneUserDetail, params).then(function(res){
            //     that.detail = res.data
            //     that.centerDialogVisible = true
            // })
        },
        userDetail(id){
            this.userDetailDialog.id = id
            this.userDetailDialog.show = true
        },
        bankDetail(id){
            this.bankDetailDialog.id = id
            this.bankDetailDialog.show = true
        },
        handleCurrentChange(val){
            this.current = val
            this.getData()
        }
    }
}
</script>

<style lang='less' scoped>
.el-dialog--center .el-dialog__body{
    text-align: center;
}
.color-red:hover{
    color:red;
}
.color-blue:hover{
    color: #409EFF;
}
.el-row{
    margin-bottom: 20px;
}
</style>
