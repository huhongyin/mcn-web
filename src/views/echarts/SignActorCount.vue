<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span v-text="title"></span>
        </div>
        <el-row :gutter="20">
			<el-col :lg="3" :md="4" :sm="4">
				<el-select placeholder="平台" v-model="search.plat_id">
					<el-option v-for="item in plats" :key="item.id" :label="item.name" :value="item.id"></el-option>
				</el-select>
			</el-col>
			<el-col :lg="7" :md="10" :sm="10">
				<el-date-picker v-model="search.date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" style="max-width:100%;" type="daterange" align="right" unlink-panels range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2"></el-date-picker>
			</el-col>
			<el-col :lg="12" :md="8" :sm="5">
				<el-button type="primary" @click="searchData">搜索</el-button>
			</el-col>
		</el-row>
        <el-table :show-summary="false" :summary-method="getSummaries" id="managementTable" stripe ref="multipleTable" :data="list" tooltip-effect="dark" :header-cell-style="{background:'#EFF5F9'}">
                <el-table-column fixed label="主播实名" prop="actor.name"></el-table-column>
                <el-table-column fixed label="主播昵称" prop="nickname"></el-table-column>
                <el-table-column fixed label="公司" prop="company.name"></el-table-column>
                <el-table-column fixed label="电话" prop="actor.phone"></el-table-column>
                <el-table-column label="平台" prop="plat.name"></el-table-column>
                <el-table-column label="签约人" prop="sign_user.rel_name"></el-table-column>
                <el-table-column label="运营人" prop="operate_user.rel_name"></el-table-column>
                <el-table-column label="平台ID" prop="plat_actor_id"></el-table-column>
            </el-table>
            <el-pagination class="right offset-top-31 offset-bottom-46" background layout="prev, pager, next" :page-count="totalPage" @current-change="handleCurrentChange"></el-pagination>
    </el-card>
</template>

<script>
import { get} from '@/api/index.js';
import echartApi from '@/api/echarts.js';
import platsApi from '@/api/plats.js';

export default {
    data(){
        return {
            title: '',
            totalPage: 0,
            current: 1,
            list: [],
            plats:[],
            total: {},
            search: {
                date: [],
                plat_id: '',
            },
            pickerOptions2: {
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
    created(){
        this.title = this.$route.query.title
        this.search.date = [this.$route.query.start_date, this.$route.query.end_date]
        this.getPlats()
        this.getData()
    }, 
    methods:{
        getPlats(){
            get(platsApi.list).then((res) => {
                this.plats = res.data.list
            })
        },
        getData(){
            var params = { page: this.current, start_date: this.search.date[0], end_date: this.search.date[1], plat_id: this.search.plat_id}
            get(echartApi.signActorList, params).then((res) => {
                this.totalPage = res.data.list.last_page
                this.list = res.data.list.data
                this.total = res.data.total
            })
        },
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '合计';
                    return;
                }else if(index == 4){
                    sums[index] = this.total.money
                }else{
                    sums[index] = ''
                }
            });

            return sums;
        },
        handleCurrentChange(page){
            this.current = page
            this.getData()
        },
        searchData(){
            this.current = 1
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
