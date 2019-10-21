<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <el-row :gutter="10">
                <el-col :span="4">
                    <el-input v-model="search.keyword" placeholder="输入关键字搜索"></el-input>
                </el-col>
                <el-col :span="4">
                    <el-select v-model="search.level" style="width: 100%;">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="(item,key) in addDialog.levels" :key="key" :value="item.id" :label="item.name"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" @click="getData">搜索</el-button>
                </el-col>
                <el-col :span="4" :offset="10">
                    <el-button icon="el-icon-download" @click="exportExcel">导出</el-button>
                    <el-button type="primary" @click="add(0)">新增</el-button>
                </el-col>
            </el-row>
        </div>
        <el-table id="managementTable" stripe ref="multipleTable" :data="list" tooltip-effect="dark" :header-cell-style="{background:'#EFF5F9'}" @selection-change="handleSelectionChange">
                <el-table-column type="selection"></el-table-column>
                <el-table-column fixed label="序号" type="index"></el-table-column>
                <el-table-column fixed label="主播实名" prop="actor.name" ></el-table-column>
                <el-table-column fixed label="主播昵称" prop="nickname"></el-table-column>
                <el-table-column label="平台" prop="plat.name"></el-table-column>
                <el-table-column label="身份证号" prop="actor.id_card_no"></el-table-column>
                <el-table-column label="联系电话" prop="actor.phone"></el-table-column>
                <el-table-column label="分成比例" prop="fencheng_bili"></el-table-column>
                <el-table-column label="保底工资" prop="baodi_salary"></el-table-column>
                <el-table-column label="开播时间" prop="start_time"></el-table-column>
                <el-table-column label="签约人" prop="sign_user.rel_name"></el-table-column>
                <el-table-column label="运营人" prop="operate_user.rel_name"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="add(scope.row.id)" type="text" size="small" style="margin-left:10px;display:block;">编辑</el-button>
                        <!-- <el-button @click="signDetail(scope.row.id)" type="text" size="small" style="display:block;">流水信息</el-button> -->
                        <el-button @click="userDetail(scope.row.id)" type="text" size="small" style="display:block;">艺人信息</el-button>
                        <el-button @click="bankDetail(scope.row.id)" type="text" size="small" style="display:block;">银行资料</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-table id="managementExportTble" v-show="showExportTable" stripe :data="export_list" tooltip-effect="dark">
                <el-table-column type="selection"></el-table-column>
                <el-table-column fixed label="序号" type="index"></el-table-column>
                <el-table-column fixed label="主播实名" prop="actor.name" ></el-table-column>
                <el-table-column fixed label="主播昵称" prop="nickname"></el-table-column>
                <el-table-column label="平台" prop="plat.name"></el-table-column>
                <el-table-column label="身份证号" prop="actor.id_card_no"></el-table-column>
                <el-table-column label="联系电话" prop="actor.phone"></el-table-column>
                <el-table-column label="分成比例" prop="fencheng_bili"></el-table-column>
                <el-table-column label="保底工资" prop="baodi_salary"></el-table-column>
                <el-table-column label="开播时间" prop="start_time"></el-table-column>
                <el-table-column label="签约人" prop="sign_user.rel_name"></el-table-column>
                <el-table-column label="运营人" prop="operate_user.rel_name"></el-table-column>
            </el-table>
            <el-pagination class="right offset-top-31 offset-bottom-46" background layout="prev, pager, next" :page-count="totalPage" @current-change="handleCurrentChange"></el-pagination>
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
                        <span class="user-detail-text">实名：</span><span class="user-detail-value" v-text="userDetailDialog.detail.actor.name"></span>
                    </el-col>
                    <el-col :span="8">
                        <span class="user-detail-text">艺名：</span><span class="user-detail-value" v-text="userDetailDialog.detail.nickname"></span>
                    </el-col>
                    <el-col :span="8">
                        <span class="user-detail-text">生日：</span><span class="user-detail-value" v-text="userDetailDialog.detail.actor.birthday"></span>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <span class="user-detail-text">联系电话：</span><span class="user-detail-value" v-text="userDetailDialog.detail.actor.phone"></span>
                    </el-col>
                    <el-col :span="8">
                        <span class="user-detail-text">身份证：</span><span class="user-detail-value" v-text="userDetailDialog.detail.actor.id_card_no"></span>
                    </el-col>
                    <el-col :span="8">
                        <span class="user-detail-text">住址：</span><span class="user-detail-value" v-text="userDetailDialog.detail.actor.address"></span>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <span class="user-detail-text">所属公司：</span><span class="user-detail-value" v-text="userDetailDialog.detail.company.name"></span>
                    </el-col>
                    <el-col :span="8">
                        <span class="user-detail-text">运营：</span><span class="user-detail-value" v-text="userDetailDialog.detail.operate_user.rel_name"></span>
                    </el-col>
                    <el-col :span="8">
                        <span class="user-detail-text">签约人：</span><span class="user-detail-value" v-text="userDetailDialog.detail.sign_user.rel_name"></span>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <span class="user-detail-text">所属平台：</span><span class="user-detail-value" v-text="userDetailDialog.detail.plat.name"></span>
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
                        <span class="user-detail-text">开户银行：</span><span class="user-detail-value" v-text="bankDetailDialog.detail.bank.name"></span>
                    </el-col>
                </el-row>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="bankDetailDialog.show = false">确 定</el-button>
                </span>
            </el-dialog>

            <!-- 新增弹窗 -->
            <el-dialog title="新增艺人" :visible.sync="addDialog.dialogVisible">
                
                <el-form :rules="addDialog.rules" ref="addUserForm" class="demo-ruleForm" :model="addDialog.form">
                    <el-tabs v-model="addDialog.activeName" type="border-card">
                        <el-tab-pane label="艺人信息" name="actor_field" class="actor-tab">
                            <el-form-item label="" prop="actor.company_id">
                                <el-col :span="4">所属公司</el-col>
                                <el-col :span="19" :offset="1">
                                    <el-select v-model="addDialog.form.actor.company_id" style="width: 100%;" placeholder="请选择公司" @change="changeCompany">
                                        <el-option v-for="(item,key) in addDialog.companies" :key="key" :label="item.name" :value="item.id"></el-option>
                                    </el-select>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="" prop="actor.name">
                                <el-col :span="4">实名</el-col>
                                <el-col :span="19" :offset="1">
                                    <el-input placeholder="请输入实名" v-model="addDialog.form.actor.name"></el-input>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="" prop="actor.nickname">
                                <el-col :span="4">艺名</el-col>
                                <el-col :span="19" :offset="1">
                                    <el-input placeholder="请输入艺名" v-model="addDialog.form.actor.nickname"></el-input>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="" prop="actor.plat_id">
                                <el-col :span="4">平台</el-col>
                                <el-col :span="19" :offset="1">
                                    <el-select v-model="addDialog.form.actor.plat_id" style="width: 100%;" placeholder="请选择平台" @change="changePlat">
                                        <el-option v-for="(item,key) in addDialog.plats" :key="key" :label="item.name" :value="item.id"></el-option>
                                    </el-select>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="" prop="actor.wx_code">
                                <el-col :span="4">微信号</el-col>
                                <el-col :span="19" :offset="1">
                                    <el-input placeholder="请输入微信号" v-model="addDialog.form.actor.wx_code"></el-input>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="" prop="actor.phone">
                                <el-col :span="4">联系电话</el-col>
                                <el-col :span="19" :offset="1">
                                    <el-input placeholder="请输入联系电话" v-model="addDialog.form.actor.phone"></el-input>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="" prop="actor.id_card_no">
                                <el-col :span="4">身份证号码</el-col>
                                <el-col :span="19" :offset="1">
                                    <el-input placeholder="请输入身份证号码" v-model="addDialog.form.actor.id_card_no"></el-input>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="" prop="actor.birthday">
                                <el-col :span="4">生日</el-col>
                                <el-col :span="19" :offset="1">
                                    <el-date-picker value-format="yyyy-MM-dd" style="width:100%;" placeholder="请选择生日" v-model="addDialog.form.actor.birthday"></el-date-picker>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="" prop="actor.address">
                                <el-col :span="4">住址</el-col>
                                <el-col :span="19" :offset="1">
                                    <el-input placeholder="请输入住址" v-model="addDialog.form.actor.address"></el-input>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="" prop="actor.old_id">
                                <el-col :span="4">原始ID</el-col>
                                <el-col :span="19" :offset="1">
                                    <el-input placeholder="请输入原始ID" v-model="addDialog.form.actor.old_id"></el-input>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="" v-show="addDialog.showNowId" prop="actor.now_id">
                                <el-col :span="4">现用ID</el-col>
                                <el-col :span="19" :offset="1">
                                    <el-input placeholder="请输入现用ID" v-model="addDialog.form.actor.now_id"></el-input>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="" prop="actor.level">
                                <el-col :span="4">等级</el-col>
                                <el-col :span="19" :offset="1">
                                    <el-select v-model="addDialog.form.actor.level" style="width: 100%;" placeholder="请选择等级">
                                        <el-option v-for="(item,key) in addDialog.levels" :key="key" :label="item.name" :value="item.id"></el-option>
                                    </el-select>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="" prop="actor.yunying_user_id">
                                <el-col :span="4">运营</el-col>
                                <el-col :span="19" :offset="1">
                                    <el-select v-model="addDialog.form.actor.yunying_user_id" style="width: 100%;" placeholder="请选择运营负责人">
                                        <el-option v-for="(item,key) in addDialog.yunyings" :key="key" :label="item.name" :value="item.id"></el-option>
                                    </el-select>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="" prop="actor.sign_user_id">
                                <el-col :span="4">签约人</el-col>
                                <el-col :span="19" :offset="1">
                                    <el-select v-model="addDialog.form.actor.sign_user_id" style="width: 100%;" placeholder="请选择签约人">
                                        <el-option v-for="(item,key) in addDialog.sign_users" :key="key" :label="item.name" :value="item.id"></el-option>
                                    </el-select>
                                </el-col>
                            </el-form-item>
                        </el-tab-pane>
                        <el-tab-pane label="签约信息" name="money_field" class="sign-tab">
                            <el-form-item label="" prop="sign.fuchijine">
                                <el-col :span="4">扶持金额</el-col>
                                <el-col :span="19" :offset="1">
                                    <el-input placeholder="请输入扶持金额" v-model="addDialog.form.sign.fuchijine"></el-input>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="" prop="sign.yifuchijine">
                                <el-col :span="4">已扶持金额</el-col>
                                <el-col :span="19" :offset="1">
                                    <el-input placeholder="请输入已扶持金额" v-model="addDialog.form.sign.yifuchijine"></el-input>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="" prop="sign.yitoufangdoujiajine">
                                <el-col :span="4">已投放都加金额</el-col>
                                <el-col :span="19" :offset="1">
                                    <el-input placeholder="请输入已投放都加金额" v-model="addDialog.form.sign.yitoufangdoujiajine"></el-input>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="" prop="sign.meiriyingboshichang">
                                <el-col :span="4">每日应播时长</el-col>
                                <el-col :span="19" :offset="1">
                                    <el-input placeholder="请输入每日应播时长" v-model="addDialog.form.sign.meiriyingboshichang"></el-input>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="" prop="sign.yitourushuabi">
                                <el-col :span="4">已投入刷币</el-col>
                                <el-col :span="19" :offset="1">
                                    <el-input placeholder="请输入已投入刷币" v-model="addDialog.form.sign.yitourushuabi"></el-input>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="" prop="sign.fuchijiezhishijian">
                                <el-col :span="4">扶持截止时间</el-col>
                                <el-col :span="19" :offset="1">
                                    <el-date-picker style="width:100%;" value-format="yyyy-MM-dd" placeholder="请选择扶持截止时间" v-model="addDialog.form.sign.fuchijiezhishijian"></el-date-picker>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="" prop="sign.yichongzhizhubozhanghu">
                                <el-col :span="4">已充值主播账户</el-col>
                                <el-col :span="19" :offset="1">
                                    <el-input placeholder="请输入已充值主播账户" v-model="addDialog.form.sign.yichongzhizhubozhanghu"></el-input>
                                </el-col>
                            </el-form-item>
                        </el-tab-pane>
                        <el-tab-pane label="银行资料" name="bank_field" class="bank-tab">
                            <el-form-item label="" prop="bank.id">
                                <el-col :span="4">开户银行</el-col>
                                <el-col :span="19" :offset="1">
                                    <el-select style="width:100%;" v-model="addDialog.form.bank.id">
                                        <el-option v-for="(item,key) in addDialog.banks" :key="key" :label="item.name" :value="item.id"></el-option>
                                    </el-select>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="" prop="bank.bank_no">
                                <el-col :span="4">银行卡号</el-col>
                                <el-col :span="19" :offset="1">
                                    <el-input placeholder="请输入银行卡号" v-model="addDialog.form.bank.bank_no"></el-input>
                                </el-col>
                            </el-form-item>
                        </el-tab-pane>
                    </el-tabs>
                </el-form>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="addDialog.dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitForm('addUserForm')">确 定</el-button>
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
export default {
    created(){
        this.getBankOptions()
        this.getOperate()
        this.getSigns()
        this.getPlats()
        this.getLevel()
        this.getCompany()
        this.getData()
    },
    data(){
        return {
            search: {
                level: '',
                keyword: '',
            },
            addDialog: {
                showNowId: false,
                dialogVisible: false,
                activeName: 'actor_field',
                banks: [],
                levels: [],
                yunyings: [],
                companies: [],
                sign_users: [],
                plats: [],
                form: {
                    actor: {
                        id: "",
                        name: '',
                        nickname: '',
                        plat_id: '',
                        wx_code: '',
                        old_id: '',
                        now_id: '',
                        level: '',
                        yunying_user_id: '',
                        sign_user_id: '',
                        company_id: '',
                        phone: '',
                        id_card_no: '',
                        birthday: '',
                        address: '',
                    },
                    bank: {
                        id: "",
                        bank_no: "",
                    },
                    sign: {
                        fuchijine: 0,
                        yifuchijine: 0,
                        yitoufangdoujiajine: 0,
                        meiriyingboshichang: 0,
                        yitourushuabi: 0,
                        fuchijiezhishijian: "",
                        yichongzhizhubozhanghu: 0,
                    },
                },
                rules: {
                    actor: {
                        name: [
                            { required: true, message: '请输入实名', trigger: 'blur' }
                        ],
                        company_id: [
                            { required:true, message: '请选择公司', trigger: 'change' }
                        ],
                        nickname: [
                            { required: true, message: '请输入艺名', trigger: 'blur' }
                        ],
                        plat_id: [
                            { required: true, message: '请选择平台', trigger: 'change' }
                        ],
                        old_id: [
                            { required: true, message: '请输入原始ID', trigger: 'blur' }
                        ],
                        level: [
                            { required: true, message: '请选择等级', trigger: 'change' }
                        ],
                        yunying_user_id: [
                            { required: true, message: '请选择运营', trigger: 'change' }
                        ],
                        sign_user_id: [
                            { required: true, message: '请选择签约人', trigger: 'change' }
                        ],
                    },
                    sign: {
                        meiriyingboshichang: [
                            { required: true, message: '请输入每日应播时长', trigger: 'blur' }
                            // { required: true, type: 'text', message: '请输入每日应播时长,单位为分钟,并且是数字' }
                        ],
                    }
                }
            },
            centerDialogVisible : false,
            keywords : "",
            select_date: "",
            size : 10,
            current : 1,
            totalPage: 0,
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
                    nickname: '',
                    operate_user: {
                        id: '',
                        rel_name: '',
                    },
                    sign_user: {
                        id: '',
                        rel_name: '',
                    },
                    company: {
                        id: '',
                        name: '',
                    },
                    plat: {
                        id: '',
                        name: '',
                    },
                    actor: {
                        id: '',
                        name: '',
                    }
                }
            },
            bankDetailDialog: {
                show: false,
                detail: {
                    id: "",
                    bank_no: "",
                    bank: {

                    }
                }
            },
            list: [],
            export_list: [],
            showExportTable: false,
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
        getData(){
            get(actorApi.list, { page: this.current, level: this.search.level, keyword: this.search.keyword }).then((res) => {
                this.list = res.data.list.data
                this.totalPage = res.data.list.last_page
            })
        },
        handleCurrentChange(val){
            this.current = val
            this.getData()
        },
        exportExcel () {
            //获取导出的数据列表，然后导出
            get(actorApi.list, { type: 'export', level: this.search.level, keyword: this.search.keyword }).then((res) => {
                this.export_list = res.data.list
                this.showExportTable = true
            
                /* generate workbook object from table */
                let wb = XLSX.utils.table_to_book(document.querySelector('#managementExportTble'));
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
            })
        },
        add(id){
            if (this.$refs["addUserForm"]!==undefined) {
                this.$refs["addUserForm"].resetFields();
            }
            if(id > 0){
                get(actorApi.edit + "/" + id).then((res) => {
                    var data = res.data.info
                    data.bank.bank_no = data.bank_no
                    this.addDialog.form.bank = data.bank
                    data.actor.nickname = data.nickname
                    data.actor.plat_id = data.plat_id
                    data.actor.old_id = data.plat_actor_id
                    data.actor.now_id = data.now_id
                    data.actor.level = (data.level_id == 0) ? '' : data.level_id
                    data.actor.yunying_user_id = data.operate_user_id
                    data.actor.sign_user_id = data.sign_user_id
                    data.actor.company_id = data.company_id
                    this.addDialog.form.actor = data.actor
                    this.addDialog.form.sign.fuchijine = data.actor_plat_sign.support_money
                    this.addDialog.form.sign.yifuchijine = data.actor_plat_sign.supported_money
                    this.addDialog.form.sign.yitoufangdoujiajine = data.actor_plat_sign.yitoufangdoujia
                    this.addDialog.form.sign.meiriyingboshichang = data.actor_plat_sign.day_time
                    this.addDialog.form.sign.yitourushuabi = data.actor_plat_sign.yitourushuabi
                    this.addDialog.form.sign.fuchijiezhishijian = data.actor_plat_sign.support_endtime
                    this.addDialog.form.sign.yichongzhizhubozhanghu = data.actor_plat_sign.recharge
                })
            }

            this.addDialog.dialogVisible = true
        },
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    post(actorApi.add + '/' + this.addDialog.form.actor.id, this.addDialog.form).then((res) => {
                        this.$message({
                            type: "success",
                            message: res.msg
                        })
                        this.getData()
                        this.addDialog.dialogVisible = false
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        changeCompany(){
            this.addDialog.form.actor.yunying_user_id = ""
            this.addDialog.form.actor.sign_user_id = ""
            this.addDialog.form.bank.id = ""
            this.getBankOptions()
            this.getOperate()
            this.getSigns()
        },
        getBankOptions(){
            get(bankApi.optionList, { type: 'select', company_id: this.addDialog.form.company_id }).then((res) => {
                this.addDialog.banks = res.data.list
            })
        },
        getCompany(){
            get(companyApi.list, { type: 'select' }).then((res) =>{
                this.addDialog.companies = res.data.list
            })
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
        changePlat(){
            if(this.addDialog.form.actor.plat_id == 1){
                this.addDialog.showNowId = true
            }else{
                this.addDialog.showNowId = false
            }
        },
        getOperate(){
            get(departmentApi.userListByType + '/' + 1, { company_id: this.addDialog.form.actor.company_id }).then((res) => {
                this.addDialog.yunyings = res.data.list
            })
        },
        getSigns(){
            get(departmentApi.userListByType + '/' + 2, { company_id: this.addDialog.form.actor.company_id }).then((res) => {
                this.addDialog.sign_users = res.data.list
            })
        },
        bankDetail(id){
            //银行信息
            get(actorApi.bankInfo + '/' + id).then((res) => {
                this.bankDetailDialog.detail = res.data.info
                this.bankDetailDialog.show = true
            })
        },
        userDetail(id){
            get(actorApi.detail + '/' + id).then((res) => {
                this.userDetailDialog.detail = res.data.info
                this.userDetailDialog.show = true
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
