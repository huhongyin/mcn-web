<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span v-text="title"></span>
        </div>
        <el-row :gutter="20">
            <el-col :lg="2" :md="3" :sm="3">
                <el-select placeholder="公司" v-model="search.company_id">
                    <el-option v-for="item in companies" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-col>
            <el-col :lg="2" :md="3" :sm="3">
                <el-select placeholder="平台" v-model="search.plat_id">
                    <el-option v-for="item in plats" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-col>
            <el-col :lg="7" :md="10" :sm="10">
                <el-date-picker v-model="search.date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" style="max-width:100%;" type="daterange" align="right" unlink-panels range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-col>
            <el-col :lg="12" :md="8" :sm="5">
                <el-button type="primary" @click="searchData">搜索</el-button>
            </el-col>
        </el-row>
        <el-table stripe :data="list" tooltip-effect="dark" :header-cell-style="{background:'#EFF5F9'}">
            <el-table-column fixed label="主播昵称" prop="nickname"></el-table-column>
            <el-table-column label="平台" prop="plat.name"></el-table-column>
            <el-table-column label="所属公司" prop="company.name"></el-table-column>
        </el-table>
        <el-pagination class="right offset-top-31 offset-bottom-46" background :page-count="totalPage" layout="total, prev, pager, next" @current-change="handleCurrentChange"></el-pagination>
    </el-card>
</template>

<script>
import { get } from '@/api/index.js';
import echartApi from '@/api/echarts.js';
import companyApi from '@/api/company.js';
import platApi from '@/api/plats.js';
export default {
    data(){
        return {
            search: {
                date: '',
                company_id: "",
                plat_id: "",
            },
            total: 0,
            title: '',
            totalPage: 0,
            list: [],
            companies: [],
            plats: [],
        }
    },
    created(){
        this.title = this.$route.query.title
        this.search.date = [this.$route.query.start_date, this.$route.query.end_date]
        this.getCompanies()
        this.getPlats()
        this.getData()
    }, 
    methods:{
        getData(){
            var params = { page: this.current, start_date: this.search.date[0], end_date: this.search.date[1], plat_id: this.search.plat_id, company_id: this.search.company_id}
            get(echartApi.effectiveList, params).then((res) => {
                this.totalPage = res.data.list.last_page
                this.list = res.data.list.data
                this.total = res.data.total
            })
        },
        getCompanies(){
            get(companyApi.list, { type: "select" }).then((res) => {
                this.companies = res.data.list
                this.companies.unshift({ id: "", name: "全部" })
                this.search.company_id = this.companies[0]['id']
            })
        },
        getPlats(){
            get(platApi.list).then((res) => {
                this.plats = res.data.list
                this.plats.unshift({ id: "", name: "全部" })
                this.search.plat_id = this.plats[0]['id']
            })
        },
        searchData(){
            this.getData()
        },
        handleCurrentChange(val){
            this.page = val
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
