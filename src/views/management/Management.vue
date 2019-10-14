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
            <!-- <el-button type="primary">新增</el-button> -->
            <el-button icon="el-icon-download" @click="exportExcel">导出</el-button>
        </div>
        <el-table id="managementTable" stripe ref="multipleTable" :data="list" tooltip-effect="dark" :header-cell-style="{background:'#EFF5F9'}" @selection-change="handleSelectionChange">
                <el-table-column type="selection"></el-table-column>
                <el-table-column fixed label="序号" type="index"></el-table-column>
                <el-table-column fixed label="主播实名" prop="name" width="80px"></el-table-column>
                <el-table-column fixed label="主播昵称" prop="nickname" width="80px"></el-table-column>
                <el-table-column label="平台" prop="plat.name" width="80px"></el-table-column>
                <el-table-column label="身份证号" prop="id_card_no"></el-table-column>
                <el-table-column label="联系电话" prop="phone" width="120px"></el-table-column>
                <el-table-column label="分成比例" prop="fencheng_bili" width="80px"></el-table-column>
                <el-table-column label="保底工资" prop="baodi_salary" width="80px"></el-table-column>
                <el-table-column label="开播时间" prop="start_time" width="120px"></el-table-column>
                <el-table-column label="签约人" prop="sign.name" width="80px"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="signDetail(scope.row.id)" type="text" size="small">流水信息</el-button>
                        <el-button @click="userDetail(scope.row.id)" type="text" size="small">艺人信息</el-button>
                        <el-button @click="bankDetail(scope.row.id)" type="text" size="small">银行资料</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination class="right offset-top-31 offset-bottom-46" background layout="prev, pager, next" :total="total" @current-change="handleCurrentChange"></el-pagination>
            <el-dialog title="签约信息" :visible.sync="signDetailDialog.show" width="70%" center>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <span class="user-detail-text">当日直播时长（分）：</span><span class="user-detail-value" v-text="signDetailDialog.detail.day_live_minutes"></span>
                    </el-col>
                    <el-col :span="8">
                        <span class="user-detail-text">当日流水：</span><span class="user-detail-value" v-text="signDetailDialog.detail.day_money"></span>
                    </el-col>
                    <el-col :span="8">
                        <span class="user-detail-text">当日小视频数：</span><span class="user-detail-value" v-text="signDetailDialog.detail.day_min_video"></span>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <span class="user-detail-text">当日点赞量：</span><span class="user-detail-value" v-text="signDetailDialog.detail.day_dianzan"></span>
                    </el-col>
                    <el-col :span="8">
                        <span class="user-detail-text">当日转发量：</span><span class="user-detail-value" v-text="signDetailDialog.detail.day_zhuanfa"></span>
                    </el-col>
                    <el-col :span="8">
                        <span class="user-detail-text">有效直播天数：</span><span class="user-detail-value" v-text="signDetailDialog.detail.intime_days"></span>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <span class="user-detail-text">当月应播时长：</span><span class="user-detail-value" v-text="signDetailDialog.detail.month_should_time"></span>
                    </el-col>
                    <el-col :span="8">
                        <span class="user-detail-text">每日应播时长：</span><span class="user-detail-value" v-text="signDetailDialog.detail.day_should_time"></span>
                    </el-col>
                    <el-col :span="8">
                        <span class="user-detail-text">当月未达标时长：</span><span class="user-detail-value" v-text="signDetailDialog.detail.month_less_time"></span>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <span class="user-detail-text">当月未达标天数：</span><span class="user-detail-value" v-text="signDetailDialog.detail.month_less_day"></span>
                    </el-col>
                    <el-col :span="8">
                        <span class="user-detail-text">当月总时长：</span><span class="user-detail-value" v-text="signDetailDialog.detail.month_total_time"></span>
                    </el-col>
                    <el-col :span="8">
                        <span class="user-detail-text">扶持截止时间：</span><span class="user-detail-value" v-text="signDetailDialog.detail.fuchi_end_time"></span>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <span class="user-detail-text">扶持金额：</span><span class="user-detail-value" v-text="signDetailDialog.detail.fuchi_money"></span>
                    </el-col>
                    <el-col :span="8">
                        <span class="user-detail-text">已扶持金额：</span><span class="user-detail-value" v-text="signDetailDialog.detail.had_fuchi_money"></span>
                    </el-col>
                    <el-col :span="8">
                        <span class="user-detail-text">已充值主播账户：</span><span class="user-detail-value" v-text="signDetailDialog.detail.had_pay_actor"></span>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <span class="user-detail-text">已投放都加金额：</span><span class="user-detail-value" v-text="signDetailDialog.detail.had_doujia"></span>
                    </el-col>
                    <el-col :span="8">
                        <span class="user-detail-text">已投入刷币：</span><span class="user-detail-value" v-text="signDetailDialog.detail.had_pay"></span>
                    </el-col>
                    <el-col :span="8">
                        <span class="user-detail-text">总流水：</span><span class="user-detail-value" v-text="signDetailDialog.detail.total_money"></span>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <span class="user-detail-text">奖励：</span><span class="user-detail-value" v-text="signDetailDialog.detail.draw"></span>
                    </el-col>
                    <el-col :span="8">
                        <span class="user-detail-text">扣除其他：</span><span class="user-detail-value" v-text="signDetailDialog.detail.other"></span>
                    </el-col>
                    <el-col :span="8">
                        <span class="user-detail-text">应付主播收益：</span><span class="user-detail-value" v-text="signDetailDialog.detail.should_pay"></span>
                    </el-col>
                </el-row>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="signDetailDialog.show = false">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog title="艺人信息" :visible.sync="userDetailDialog.show" width="70%" center>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <span class="user-detail-text">微信号：</span><span class="user-detail-value" v-text="userDetailDialog.detail.wx_code"></span>
                    </el-col>
                    <el-col :span="8">
                        <span class="user-detail-text">原始ID：</span><span class="user-detail-value" v-text="userDetailDialog.detail.old_id"></span>
                    </el-col>
                    <el-col :span="8">
                        <span class="user-detail-text">现用ID：</span><span class="user-detail-value" v-text="userDetailDialog.detail.now_id"></span>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <span class="user-detail-text">等级：</span><span class="user-detail-value" v-text="userDetailDialog.detail.level"></span>
                    </el-col>
                    <el-col :span="8">
                        <span class="user-detail-text">运营负责人：</span><span class="user-detail-value" v-text="userDetailDialog.detail.work.name"></span>
                    </el-col>
                    <el-col :span="8">
                        <span class="user-detail-text">所属部门：</span><span class="user-detail-value" v-text="userDetailDialog.detail.department.name"></span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <span class="user-detail-text">所属公司：</span><span class="user-detail-value" v-text="userDetailDialog.detail.company.name"></span>
                    </el-col>
                </el-row>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="userDetailDialog.show = false">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog title="银行信息" :visible.sync="bankDetailDialog.show" width="70%" center>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <span class="user-detail-text">银行卡号：</span><span class="user-detail-value" v-text="bankDetailDialog.detail.bank_no"></span>
                    </el-col>
                    <el-col :span="12">
                        <span class="user-detail-text">开户银行：</span><span class="user-detail-value" v-text="bankDetailDialog.detail.bank_name"></span>
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
import FileSaver from 'file-saver';
import XLSX from 'xlsx';
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
                    day_live_minutes: '60分钟',
                    day_money: '1000元',
                    day_min_video: '2000',
                    day_dianzan: '31241',
                    day_zhuanfa: '21',
                    intime_days: '15天',
                    month_should_time: '100小时',
                    day_should_time: '6小时',
                    month_less_time: '10小时',
                    month_less_day: '0.5天',
                    month_total_time: '90小时',
                    fuchi_end_time: '2019-09-29',
                    fuchi_money: '2000元',
                    had_fuchi_money: '1000元',
                    had_pay_actor: '800元',
                    had_doujia: '100元',
                    had_pay: '20',
                    total_money: '20000',
                    draw: '1000',
                    other: '200元',
                    should_pay: '5000元',
                }
            },
            userDetailDialog: {
                show: false,
                detail: {
                    wx_code: 'point_this', //微信号
                    old_id: '124124', //原始id
                    new_id: '21414', //现用id
                    level: '100级', //主播等级
                    work: {
                        name: '张三', //运营负责人
                    },
                    department: {
                        name: '测试部门', //所属部门
                    },
                    company: {
                        name: '成都', //所属公司
                    }
                }
            },
            bankDetailDialog: {
                show: false,
                detail: {
                    bank_no: '623105105819538283', //银行卡号,
                    bank_name: '中国银行', //开户行
                }
            },
            list: [
                {
                    name: '李静',   //真实姓名
                    id_card_no: '211323199403244011', //身份证
                    phone: '18244251418',   //电话
                    wx_code: 'point_this',  //微信号
                    old_id: '12345',   //原始id
                    now_id: '21221',  //现用id
                    fencheng_bili: '50%',  //分成比例
                    baodi_salary: '2000', //保底工资
                    nickname: '梦', //主播昵称
                    level: '100级', //主播等级
                    start_time: '每晚八点', //开播时间
                    sign:{
                        name: '张三', //签约人
                    },
                    work: {
                        name: '李四', //运营负责人
                    },
                    department: {
                        name: '测试部门', //所属部门
                    },
                    company: {
                        name: '北京', //所属公司
                    },
                    plat: {
                        name: '抖音', //所属平台
                    }
                }
            ],
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
            // var params = { page: this.current}
            // var that = this
            // get(userApi.list, params)
            //     .then(function(res){
            //         that.list = res.data.list.data
            //         that.total = res.data.list.total
            //         that.current = res.data.list.current_page
            //         // that.totalPage = res.data.totalPage
            //     })
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
        },
        exportExcel () {
            /* generate workbook object from table */
            let wb = XLSX.utils.table_to_book(document.querySelector('#managementTable'));
            /* get binary string as output */
            let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
            try {
                FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '主播数据.xlsx');
            } catch (e)
            {
                if (typeof console !== 'undefined')
                    console.log(e, wbout)
            }
            return wbout
        },
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
