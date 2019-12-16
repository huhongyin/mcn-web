<template>
  <el-card>
      <div slot="header" class="clearfix">
        <span>{{ title }}</span>
      </div>
      <div>
            <el-row :gutter="10" style="margin-bottom:1rem;">
                <el-col :span="2">
                    <el-select v-model="search.company_id" @change="currentChange(1)">
                        <el-option v-for="(company,key) in companies" :key="key" :label="company.name" :value="company.id"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="2">
                    <el-select v-model="search.plat_id" @change="currentChange(1)">
                        <el-option v-for="(plat,key) in plats" :key="key" :label="plat.name" :value="plat.id"></el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-table :data="list" tooltip-effect="dark" :header-cell-style="{background:'#EFF5F9'}">
                <el-table-column label="主播昵称" prop="nickname"></el-table-column>
                <el-table-column label="流水" prop="total_money"></el-table-column>
                <el-table-column label="平台" prop="plat_name"></el-table-column>
                <el-table-column label="所属公司" prop="company_name"></el-table-column>
            </el-table>
            <el-pagination style="float:right;padding: 1rem 0;" :page-size="pageSize" :total="total" background @current-change="currentChange"></el-pagination>
      </div>
  </el-card>
</template>
<script>
import { get } from '@/api/index'
import msgApi from '@/api/msg'
import companyApi from '@/api/company'
import platApi from '@/api/plats'

export default {
    data(){
        return {
            title: "",
            search: {
                type: "",
                page: 1,
                money: "",
                company_id: "",
                plat_id: "",
            },
            pageSize: 0,
            total: 0,
            list: [],
            companies: [],
            plats: [],
        }
    },
    created(){
        this.init()
    },
    methods: {
        init(){
            this.title = this.$route.query.title
            this.search.type = this.$route.query.type
            this.search.money = this.$route.query.money
            this.getCompanies()
            this.getPlats()
            this.getData()
        },
        getCompanies(){
            get(companyApi.list, { type: "select" }).then((res) => {
                this.companies = res.data.list
                if(this.companies.length > 1){
                    this.companies.unshift({ id: "", name: "全部" })
                }
            })
        },
        getPlats(){
            get(platApi.list).then((res) => {
                this.plats = res.data.list
                this.plats.unshift({ id: "", name: "全部" })
            })
        },
        getData(){
            get(msgApi.dataList, this.search).then((res) => {
                this.list = res.data.list.list.data
                this.pageSize = res.data.list.list.per_page
                this.total = res.data.list.list.total
            })
        },
        currentChange(page){
            this.search.page = page
            this.getData()
        },
    }
}
</script>
<style scoped>

</style>