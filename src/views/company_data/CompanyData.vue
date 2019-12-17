<template>
    <el-card class="box-card" :style="'height:'+ cardHeight +';'">
        <div slot="header" class="clearfix">
            <el-row :gutter="10">
                <el-col :span="2" style="line-height:40px;">
                    公司数据
                </el-col>
                <el-col :span="6">
                    <el-date-picker @change="changeDate" type="daterange" value-format="yyyy-MM-dd" format="yyyy-MM-dd" v-model="search.date" start-placeholder="开始日期" end-placeholder="结束日期" style="max-width:100%;"></el-date-picker>
                </el-col>
                <el-col :span="3">
                    <el-button type="primary" @click="getData">搜索</el-button>
                </el-col>
                <el-col :span="2" :offset="11">
                    <!-- <el-button @click="exportExcel" style="float:right;">导出</el-button> -->
                </el-col>
            </el-row>
        </div>
        <div style="width:100%;height:90%;">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane :label="item" :name="'tab-' + item" v-for="(item,key) in tabs" :key="key" class="doubleThTable">
                    <el-table v-loading="loading" :data="list[item]['list']" :header-cell-class-name="headerRowClass" :header-cell-style="setHeaderRowStyle" :header-row-style="headerRowStype">
                        <el-table-column :label="item + '各公司数据'">
                            <el-table-column prop="title">
                                <template slot="header">
                                    <span style="
                                        position: absolute;
                                        right: 0;
                                        top: 0;
                                    ">平台</span>
                                        <div style="
                                        padding: 0;
                                        width: 2px;
                                        height: 30px;
                                        background-color: black;
                                        display: inline-table;
                                        transform: rotate(-30deg);
                                    ">
                                    </div>
                                        <span style="
                                        position: absolute;
                                        bottom: 0;
                                        left: 0;
                                    ">公司</span>
                                </template>
                            </el-table-column>
                            <el-table-column v-for="(plat,key) in plats" :key="key" :label="plat.name">
                                <el-table-column label="昨日前台流水" :prop="'yestoday_money_' + plat.id"></el-table-column>
                                <el-table-column label="前台流水" :prop="'total_money_' + plat.id"></el-table-column>
                                <el-table-column :label="list[item]['day'] + '月总流水'" :prop="'month_money_' + plat.id"></el-table-column>
                            </el-table-column>
                            <el-table-column label="当日前台流水" prop="current_date_money"></el-table-column>
                            <el-table-column label="昨日前台流水" prop="yestoday_date_total"></el-table-column>
                            <el-table-column label="当月前台流水" prop="current_month_money"></el-table-column>
                            <el-table-column label="上月同期收益" prop="last_date_month_money"></el-table-column>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </div>
    </el-card>
</template>

<script>
import { exportJsonToExcel, formatJson } from 'pl-export-excel'
import { get } from '@/api/index.js';
import platApi from '@/api/plats.js';
import companyDataApi from '@/api/company_data.js';

export default {
    data(){
        return {
            tableHeight: '200px',
            cardHeight: 'unset',
            activeName: "",
            day: "",
            loading: false,
            tabs: [],
            plats: [],
            list: [],
            search: {
                date: [],
            },
        }
    },
    created(){
        this.getPlat()
        this.search.date = [new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(), new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()];
        // this.initTabs()
    },
    methods:{
        getPlat(){
            get(platApi.list).then((res) => {
                this.plats = res.data.list
                this.search.plat_id = this.plats[0].id
                this.getData()
            })
        },
        initTabs(){
            this.search.date.map((element, key) => {
                if(key < (this.search.date.length - 1)){
                    this.tabs.push(element)
                }
            })

            this.activeName = 'tab-' + this.tabs[0]
        },
        changeDate(){
            // this.tabs = []
            this.getData()
        },
        getData(){
            this.loading = true
            get(companyDataApi.companyDataList, this.search).then((res) => {
                this.list = res.data.list
                this.tabs = res.data.dates
                this.activeName = 'tab-' + this.tabs[0]
                this.loading = false
            })
        },
        exportExcel () {
            const tHeader = ['序号', '主播昵称', '原始ID', '开播日期', '主播级别', '主播平台', this.day_title, '上月同期收益', '时长', this.month_title, '日均收益', this.all_money_title, '所属公司']
            const filterVal = ["id", "nickname", "plat_actor_id", "start_time", "level", "plat.name", "day_money", "last_month_money", "time", "total_money", "day_avg", "all_money", "company.name"]
            const list = this.list
            const data = formatJson(filterVal, list)
            exportJsonToExcel({

                header: tHeader, // 表头

                data: data, // 表格数据

                filename: '公司榜', // 表格名称

                autoWidth: true, // 自适应宽度

                bookType: 'xlsx' // 导出文件的类型

            })
        },
        setHeaderRowStyle(data){
            if(data.rowIndex == 0 && data.columnIndex == 0){
                return { "text-align": "center", "font-weight": "bold", "font-size" : "22px", "color": "#5d5a5a" };
            }
            else{
                return { "text-align": "center", "font-weight": "bold", "color": "#5d5a5a" };
            }
        },
        headerRowClass(data){
            
        },
        headerRowStype(data){
            // console.log(data)
        },
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
}
</script>

<style lang='less' scoped>

.doubleThTable .el-table table thead.is-group tr:first-of-type th:first-of-type{
    border-bottom: none;
}
.doubleThTable .el-table thead.is-group tr:first-of-type th:first-of-type:before{
    content: '';
    position: absolute;
    width: 1px;
    height: 87px; /*这里需要自己调整，根据td的宽度和高度*/
    top: 0;
    left: 0;
    background-color: grey;
    opacity: 0.2;
    display: block;
    transform: rotate(-52deg); /*这里需要自己调整，根据线的位置*/
    transform-origin: top;
}
.doubleThTable .el-table thead.is-group tr:last-of-type th:first-of-type:before {
    content: '';
    position: absolute;
    width: 1px;
    height: 115px; /*这里需要自己调整，根据td的宽度和高度*/
    bottom: 0;
    right: 0;
    background-color: grey;
    opacity: 0.2;
    display: block;
    transform: rotate(-51deg); /*这里需要自己调整，根据线的位置*/
    transform-origin: bottom;
}
</style>
