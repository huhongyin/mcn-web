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
                    <pl-table-column label="签约人2" prop="user_name"></pl-table-column>
                    <pl-table-column label="前台总流水" prop="total_money"></pl-table-column>
                    <pl-table-column label="直播总有效时长" prop="total_time"></pl-table-column>
                    <pl-table-column label="签约数量" prop="sign_count"></pl-table-column>
                    <pl-table-column label="未播主播数量" prop="not_live" width="100px;"></pl-table-column>
                    <pl-table-column label="公司" prop="company_name" width="120px;"></pl-table-column>
                </pl-table>
                <pl-table v-if="this.search.plat_id == 3" :datas="list" :height-change="true" :pagination-show="false" border id="out-table" v-loading="loading" ref="plTable" header-drag-style use-virtual :row-height="50">
                    <pl-table-column label="签约人3" prop="user_name"></pl-table-column>
                    <pl-table-column label="前台总流水" prop="total_money"></pl-table-column>
                    <pl-table-column label="直播总有效时长" prop="total_time"></pl-table-column>
                    <pl-table-column label="签约数量" prop="sign_count"></pl-table-column>
                    <pl-table-column label="未播主播数量" prop="not_live" width="100px;"></pl-table-column>
                    <pl-table-column label="公司" prop="company_name" width="120px;"></pl-table-column>
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

                filename: '签约数据排名', // 表格名称

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
