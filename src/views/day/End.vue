<template>
    <el-card class="box-card" :style="'height:'+ cardHeight +';'">
        <div slot="header" class="clearfix">
            <el-row :gutter="10">
                <el-col :span="2" style="line-height:40px;">
                    结算单
                </el-col>
                <el-col :span="4" style="line-height:40px;">
                    <el-select v-model="search.plat_id">
                        <el-option v-for="(item,key) in plats" :key="key" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-date-picker type="month" value-format="yyyy-MM" format="yyyy-MM" v-model="search.date" placeholder="选择月份" style="max-width:100%;"></el-date-picker>
                </el-col>
                <el-col :span="3">
                    <el-button type="primary" @click="getData">搜索</el-button>
                </el-col>
                <el-col :span="2" :offset="9">
                    <el-button @click="exportExcel" style="float:right;">导出</el-button>
                </el-col>
            </el-row>
        </div>
        <div style="width:100%;height:90%;">
            <div :style="'height:' + tableHeight + ';width: 100%'">
                <pl-table :datas="list" :height-change="true" :pagination-show="false" border id="out-table" v-loading="loading" ref="plTable" header-drag-style use-virtual :row-height="50">
                    <pl-table-column label="签约人" prop="user_name"></pl-table-column>
                    <pl-table-column label="前台总流水" prop="total_money"></pl-table-column>
                    <pl-table-column label="直播总有效时长" prop="total_time"></pl-table-column>
                    <pl-table-column label="签约数量" prop="sign_count"></pl-table-column>
                    <pl-table-column label="未播主播数量" prop="not_live" width="100px;"></pl-table-column>
                    <pl-table-column label="公司" prop="company_name" width="120px;"></pl-table-column>
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
                // this.getData()
            })
        },
        exportExcel () {
            const tHeader = ['签约人', '前台总流水', '主播总有效时长', '签约数量', '未播主播数量', '公司']
            const filterVal = ["user_name", "total_money", "total_time", "sign_count", "not_live", "company_name"]
            const list = this.list
            const data = formatJson(filterVal, list)
            exportJsonToExcel({

                header: tHeader, // 表头

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
