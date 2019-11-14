<template>
    <el-card class="box-card" :style="'height:'+ cardHeight +';'">
        <div slot="header" class="clearfix">
            <el-row :gutter="10">
                <el-col :span="2" style="line-height:40px;">
                    结算单
                </el-col>
                <el-col :span="4" style="line-height:40px;">
                    <el-select v-model="search.plat_id" @change="getData">
                        <el-option v-for="(item,key) in plats" :key="key" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-date-picker @change="getData" type="month" value-format="yyyy-MM" format="yyyy-MM" v-model="search.date" placeholder="选择月份" style="max-width:100%;"></el-date-picker>
                </el-col>
                <el-col :span="2" :offset="12">
                    <el-button @click="exportExcel" style="float:right;">导出</el-button>
                </el-col>
            </el-row>
        </div>
        <div style="width:100%;height:90%;">
            <div :style="'height:' + tableHeight + ';width: 100%'" v-show="this.search.plat_id > 0">
                <pl-table v-if="this.search.plat_id == 1" :datas="list" :height-change="true" :pagination-show="false" border id="out-table" v-loading="loading" ref="plTable" header-drag-style use-virtual :row-height="50">
                    <pl-table-column label="抖音号" prop="douyin_id"></pl-table-column>
                    <pl-table-column label="昵称" prop="nickname"></pl-table-column>
                    <pl-table-column label="有效天数" prop="youxiao_days"></pl-table-column>
                    <pl-table-column label="有效时长（h）" prop="youxiao_time"></pl-table-column>
                    <pl-table-column label="直播流水（音浪）" prop="live_money"></pl-table-column>
                    <pl-table-column label="活动流水（音浪）" prop="activity_money"></pl-table-column>
                    <pl-table-column label="主播收入（元）" prop="actor_money"></pl-table-column>
                    <pl-table-column label="公会收入（元）" prop="guild_money"></pl-table-column>
                    <pl-table-column label="公会分成" prop="guild_fencheng"></pl-table-column>
                    <pl-table-column label="主播分成" prop="actor_fencheng"></pl-table-column>
                    <pl-table-column label="未成年退款（元）" prop="young_money"></pl-table-column>
                    <pl-table-column label="所属公司" prop="company_name"></pl-table-column>
                </pl-table>
                <pl-table v-if="this.search.plat_id == 2" :datas="list" :height-change="true" :pagination-show="false" border id="out-table" v-loading="loading" ref="plTable" header-drag-style use-virtual :row-height="50">
                    <pl-table-column label="UID" prop="plat_actor_id"></pl-table-column>
                    <pl-table-column label="昵称" prop="nickname"></pl-table-column>
                    <pl-table-column label="频道" prop="channel_name"></pl-table-column>
                    <pl-table-column label="主播类型" prop="actor_type_name"></pl-table-column>
                    <pl-table-column label="主播等级" prop="plat_level"></pl-table-column>
                    <pl-table-column label="公会ID" prop="plat_guild_id"></pl-table-column>
                    <pl-table-column label="公会名称" prop="guild_name"></pl-table-column>
                    <pl-table-column label="入驻时长(月)" prop="join_time"></pl-table-column>
                    <pl-table-column label="有效直播天数" prop="month_youxiao_days"></pl-table-column>
                    <pl-table-column label="直播有效时长(小时)" prop="live_time"></pl-table-column>
                    <pl-table-column label="原始礼物映币" prop="money"></pl-table-column>
                    <pl-table-column label="基准礼物映币" prop="base_money"></pl-table-column>
                    <pl-table-column label="实名状态" prop="rel_name_status"></pl-table-column>
                    <pl-table-column label="自提比例" prop="bili"></pl-table-column>
                    <pl-table-column label="对公付款实际扣减映币数" prop="duigong"></pl-table-column>
                    <pl-table-column label="自定义系数" prop="zidingyixishu"></pl-table-column>
                    <pl-table-column label="自定义基础映币" prop="zidingyi_base_money"></pl-table-column>
                    <pl-table-column label="新平台翻倍" prop="new_plat_double"></pl-table-column>
                    <pl-table-column label="新平台翻倍映币" prop="new_plat_double_money"></pl-table-column>
                    <pl-table-column label="最终翻倍系数" prop="finnal_double_money"></pl-table-column>
                    <pl-table-column label="结算翻倍映币--结算值" prop="end_double_money_end"></pl-table-column>
                    <pl-table-column label="结算翻倍映币--调整值" prop="end_double_money_tiaozheng"></pl-table-column>
                    <pl-table-column label="公会结算翻倍映币--映币" prop="guild_double_money"></pl-table-column>
                    <pl-table-column label="主播结算翻倍映币--映币" prop="actor_double_money"></pl-table-column>
                    <pl-table-column label="结算基础映币--结算值" prop="jiesuan_base_money_jiesuan"></pl-table-column>
                    <pl-table-column label="结算基础映币--调整值" prop="jiesuan_base_money_tiaozheng"></pl-table-column>
                    <pl-table-column label="总结算映币" prop="total_jiesuan_money"></pl-table-column>
                    <pl-table-column label="对公付款：结算翻倍+映币+底薪收益（元）" prop="duigong_money"></pl-table-column>
                    <pl-table-column label="奖金" prop="more_money"></pl-table-column>
                    <pl-table-column label="有效主播" prop="youxiao_actor"></pl-table-column>
                    <pl-table-column label="公会提成" prop="guild_ticheng"></pl-table-column>
                    <pl-table-column label="公会提成总金额（元）" prop="guild_ticheng_money"></pl-table-column>
                    <pl-table-column label="映币结算金额--映币" prop="yinbi_jiesuan_money"></pl-table-column>
                    <pl-table-column label="公会结算总金额" prop="guild_total_money"></pl-table-column>
                    <pl-table-column label="所属公司" prop="company_name"></pl-table-column>
                    <pl-table-column label="是否一倍结算" prop="is_one"></pl-table-column>
                </pl-table>
                <pl-table v-if="this.search.plat_id == 3" :datas="list" :height-change="true" :pagination-show="false" border id="out-table" v-loading="loading" ref="plTable" header-drag-style use-virtual :row-height="50">
                    <pl-table-column label="播主昵称" prop="nickname"></pl-table-column>
                    <pl-table-column label="播主姓名" prop="rel_name"></pl-table-column>
                    <pl-table-column label="陌陌号" prop="plat_actor_id"></pl-table-column>
                    <pl-table-column label="性别" prop="sex_name"></pl-table-column>
                    <pl-table-column label="播主等级" prop="plat_level"></pl-table-column>
                    <pl-table-column label="所属经纪人" prop="agent_user_name"></pl-table-column>
                    <pl-table-column label="经纪人陌陌号" prop="plat_gent_user_id"></pl-table-column>
                    <pl-table-column label="连麦陌币" prop="lianmai_money"></pl-table-column>
                    <pl-table-column label="非连麦陌币" prop="feilianmai_money"></pl-table-column>
                    <pl-table-column label="总陌币" prop="total_money"></pl-table-column>
                    <pl-table-column label="结算方式" prop="settlement_name"></pl-table-column>
                    <pl-table-column label="播主分成金额(元)" prop="actor_money"></pl-table-column>
                    <pl-table-column label="公会分成金额(元)" prop="guild_money"></pl-table-column>
                    <pl-table-column label="播主奖励(元)" prop="actor_more_money"></pl-table-column>
                    <pl-table-column label="其他奖励(元)" prop="other_more_money"></pl-table-column>
                    <pl-table-column label="当月入会前收益(元)" prop="current_money_before_money"></pl-table-column>
                    <pl-table-column label="个税(元)" prop="personal_income_tax"></pl-table-column>
                    <pl-table-column label="提现金额(元)" prop="draw_money"></pl-table-column>
                    <pl-table-column label="风控扣款(元)" prop="fengkong_money"></pl-table-column>
                    <pl-table-column label="结算金额(元)" prop="jiesuan_money"></pl-table-column>
                    <pl-table-column label="实际收入(元)" prop="act_money"></pl-table-column>
                    <pl-table-column label="所属公司" prop="company_name"></pl-table-column>
                </pl-table>
                <pl-table v-if="this.search.plat_id == 4" :datas="list" :height-change="true" :pagination-show="false" border id="out-table" v-loading="loading" ref="plTable" header-drag-style use-virtual :row-height="50">
                    <pl-table-column label="火山号" prop="huoshan_id"></pl-table-column>
                    <pl-table-column label="昵称" prop="nickname"></pl-table-column>
                    <pl-table-column label="有效天数" prop="youxiao_days"></pl-table-column>
                    <pl-table-column label="有效时长（h）" prop="youxiao_time"></pl-table-column>
                    <pl-table-column label="直播流水（火力）" prop="live_money"></pl-table-column>
                    <pl-table-column label="活动流水（火力）" prop="activity_money"></pl-table-column>
                    <pl-table-column label="主播收入（元）" prop="actor_money"></pl-table-column>
                    <pl-table-column label="公会收入（元）" prop="guild_money"></pl-table-column>
                    <pl-table-column label="公会分成" prop="guild_fencheng"></pl-table-column>
                    <pl-table-column label="主播分成" prop="actor_fencheng"></pl-table-column>
                    <pl-table-column label="未成年退款（元）" prop="young_money"></pl-table-column>
                    <pl-table-column label="所属公司" prop="company_name"></pl-table-column>
                </pl-table>
            </div>
        </div>
    </el-card>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import { exportJsonToExcel, formatJson } from 'pl-export-excel'
import { get } from '@/api/index.js';
import teamApi from '@/api/team.js';
import companyApi from '@/api/company.js';
import platApi from '@/api/plats.js';

export default {
    data(){
        return {
            tableHeight: '200px',
            cardHeight: 'unset',
            tHeader: [],
            filterVal: [],
            list: [],
            plats: [],
            count: 0,
            search: {
                plat_id: '',
                date: '',
            },
            loading: false,
        }
    },
    created(){
        this.getPlats()
        this.search.date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1)
    },
    methods:{
        getData(){
            this.loading = true
            get(teamApi.endList, this.search).then((res) => {
                this.loading = false
                this.list = res.data.list
                if(this.list.length > 0){
                    this.tableHeight = '100%'
                    this.cardHeight = '100%'
                }else{
                    this.cardHeight = 'unset'
                    this.tableHeight = '200px'
                }
            })
        },
        getPlats(){
            get(platApi.list).then((res) => {
                this.plats = res.data.list
                this.search.plat_id = this.plats[0].id
                this.getData()
            })
        },
        exportExcel () {
            switch(this.search.plat_id){
                case 1:
                        this.tHeader = ['抖音号', '昵称', '有效天数', '有效时长（h）', '直播流水（音浪）', '活动流水（音浪）', '主播收入（元）', '公会收入（元）', '公会分成', '主播分成', '未成年退款（元）', '所属公司']
                        this.filterVal = ["douyin_id", "nickname", "youxiao_days", "youxiao_time", "live_money", "activity_money", "actor_money", "guild_money", "guild_fencheng", "actor_fencheng", "young_money", "company_name"]
                    break;
                case 2:
                        this.tHeader = ["UID", "昵称", "频道","主播类型","主播等级","公会ID","公会名称", "入驻时长(月)","有效直播天数","直播有效时长(小时)","原始礼物映币","基准礼物映币","实名状态","自提比例","对公付款实际扣减映币数","自定义系数","自定义基础映币","新平台翻倍","新平台翻倍映币","最终翻倍系数","结算翻倍映币--结算值","结算翻倍映币--调整值","公会结算翻倍映币--映币","主播结算翻倍映币--映币","结算基础映币--结算值","结算基础映币--调整值","总结算映币","对公付款：结算翻倍+映币+底薪收益（元）","奖金","有效主播","公会提成","公会提成总金额（元）","映币结算金额--映币","公会结算总金额","所属公司","是否一倍结算"]
                        this.filterVal = ["plat_actor_id", "nickname", "channel_name","actor_type_name","plat_level","plat_guild_id","guild_name", "join_time","month_youxiao_days","live_time","money","base_money","rel_name_status","bili","duigong","zidingyixishu","zidingyi_base_money","new_plat_double","new_plat_double_money","finnal_double_money","end_double_money_end","end_double_money_tiaozheng","guild_double_money","actor_double_money","jiesuan_base_money_jiesuan","jiesuan_base_money_tiaozheng","total_jiesuan_money","duigong_money","more_money","youxiao_actor","guild_ticheng","guild_ticheng_money","yinbi_jiesuan_money","guild_total_money","company_name","is_one"]
                    break;
                case 3:
                        this.tHeader = ['播主昵称', '播住姓名', '陌陌号', '性别', '播主等级', '所属经纪人', '经纪人陌陌号', '连麦陌币', '非连麦陌币', '总陌币', '结算方式', '播主分成金额(元)', '公会分成金额(元)', '播主奖励(元)', '其他奖励(元)', '当月入会前收益(元)', '个税(元)', '提现金额(元)', '风控扣款(元)', '结算金额(元)', '实际收入(元)', '所属公司']
                        this.filterVal = ["nickname","rel_name","plat_actor_id","sex_name","plat_level","agent_user_name","plat_gent_user_id","lianmai_money","feilianmai_money","total_money","settlement.name","actor_money","guild_money","actor_more_money","other_more_money","current_money_before_money","personal_income_tax","draw_money","fengkong_money","jiesuan_money","act_money","company_name"]
                    break;
                case 4:
                        this.tHeader = ['抖音号', '昵称', '有效天数', '有效时长（h）', '直播流水（音浪）', '活动流水（音浪）', '主播收入（元）', '公会收入（元）', '公会分成', '主播分成', '未成年退款（元）', '所属公司']
                        this.filterVal = ["douyin_id", "nickname", "youxiao_days", "youxiao_time", "live_money", "activity_money", "actor_money", "guild_money", "guild_fencheng", "actor_fencheng", "young_money", "company_name"]
                    break;
            }
            const list = this.list
            const data = formatJson(this.filterVal, list)
            exportJsonToExcel({

                header: this.tHeader, // 表头

                data: data, // 表格数据

                filename: '结算单-' + this.search.date, // 表格名称

                autoWidth: true, // 自适应宽度

                bookType: 'xlsx' // 导出文件的类型

            })
        },
    }
}
</script>

<style lang='less' scoped>
    .el-table_2_column_19  {
        text-align: center;
    }
    .el-table .el-table--fit .el-table--border{
        height: 100%;
    }
    .ant-table-scroll{
        height: 100%;
    }
</style>
