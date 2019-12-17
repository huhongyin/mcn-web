<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span v-text="title"></span><span v-text="'共' + total + '人'"></span>
        </div>
        <el-row :gutter="10">
            <el-col :span="6">
                <el-select v-model="search.operate_user_id" filterable placeholder="筛选签约人">
                    <el-option
                    v-for="item in operate_users"
                    :key="item.id"
                    :label="item.rel_name"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-date-picker v-model="search.date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" style="max-width:100%;" type="daterange" align="right" unlink-panels range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2"></el-date-picker>
            </el-col>
			<el-col :span="3">
				<el-button type="primary" @click="searchData">搜索</el-button>
			</el-col>
		</el-row>
        <el-table :show-summary="false" :summary-method="getSummaries" id="managementTable" stripe ref="multipleTable" :data="list" tooltip-effect="dark" :header-cell-style="{background:'#EFF5F9'}">
                <el-table-column fixed label="主播实名" prop="actor.name"></el-table-column>
                <el-table-column fixed label="主播昵称" prop="nickname"></el-table-column>
                <el-table-column fixed label="开播日期" prop="start_time"></el-table-column>
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
import operateApi from '@/api/operate.js';

export default {
    data(){
        return {
            title: '',
            totalPage: 0,
            current: 1,
            list: [],
            total: {},
            search: {
                date: [],
                company: "",
                department: "",
                operate_user_id: "",
            },
            operate_users: [],
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
        this.search.company = this.$route.query.company
        this.search.department = this.$route.query.department
        this.getOperateUsers()
        this.getData()
    }, 
    methods:{
        getOperateUsers(){
            get(operateApi.operateUserList, this.search).then((res) => {
                this.operate_users = res.data.list
            })
        },
        getData(){
            get(operateApi.groupCalList + '/new_actor', this.search).then((res) => {
                this.totalPage = res.data.list.last_page
                this.list = res.data.list.data
                this.total = res.data.list.total
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
