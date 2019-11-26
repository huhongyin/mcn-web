<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span v-text="title"></span><span v-text="countTxt"></span>
        </div>
        <el-row :gutter="20">
			<el-col :lg="3" :md="4" :sm="4">
				<el-select placeholder="平台" v-model="search.plat_id">
					<el-option v-for="item in plats" :key="item.id" :label="item.name" :value="item.id"></el-option>
				</el-select>
			</el-col>
            <el-col :lg="4" :md="6" :sm="6">
                <el-select style="max-width:100%;" v-model="search.operate_user_id" filterable placeholder="筛选运营">
                    <el-option
                    v-for="item in operate_users"
                    :key="item.id"
                    :label="item.rel_name"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-col>
			<el-col :lg="7" :md="6" :sm="6">
				<el-date-picker style="max-width:100%;" v-model="search.date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="daterange" align="right" unlink-panels range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2"></el-date-picker>
			</el-col>
			<el-col :lg="8" :md="6" :sm="6">
				<el-button type="primary" @click="searchData">搜索</el-button>
			</el-col>
		</el-row>
        <el-table show-summary :summary-method="getSummaries" id="managementTable" stripe ref="multipleTable" :data="list" tooltip-effect="dark" :header-cell-style="{background:'#EFF5F9'}">
                <el-table-column fixed label="主播实名" prop="actor_plat.actor.name"></el-table-column>
                <el-table-column fixed label="主播昵称" prop="actor_plat.nickname"></el-table-column>
                <el-table-column fixed label="运营" prop="actor_plat.operate_user.rel_name"></el-table-column>
                <el-table-column fixed label="电话" prop="actor_plat.actor.phone"></el-table-column>
                <el-table-column label="平台" prop="actor_plat.plat.name"></el-table-column>
                <el-table-column label="总时长(分)">
                    <template slot-scope="scope">
                        <template v-if="search.plat_id == 1">
                            {{ (scope.row.live_time == null) ? 0 : scope.row.live_time * 60 }}
                        </template>
                        <template v-else-if="search.plat_id == 2">
                            {{ (scope.row.time == null) ? 0 : scope.row.time * 60 }}
                        </template>
                        <template v-else-if="search.plat_id == 3">
                            {{ (scope.row.live_time == null) ? 0 : scope.row.live_time }}
                        </template>
                        <template v-else-if="search.plat_id == 4">
                            {{ (scope.row.live_time == null) ? 0 : scope.row.live_time * 60 }}
                        </template>
                    </template>
                </el-table-column> <el-table-column label="日期" prop="date">
                    <!-- <template slot-scope="scope">
                        <template v-if="scope.row.plat_id == 1">
                            {{ (scope.row.douyin_date == null) ? 0 : scope.row.douyin_date }}
                        </template>
                        <template v-else-if="scope.row.plat_id == 2">
                            {{ (scope.row.yinke_date == null) ? 0 : scope.row.yinke_date }}
                        </template>
                        <template v-else-if="scope.row.plat_id == 3">
                            {{ (scope.row.momo_date == null) ? 0 : scope.row.momo_date }}
                        </template>
                        <template v-else-if="scope.row.plat_id == 4">
                            {{ (scope.row.huoshan_date == null) ? 0 : scope.row.huoshan_date }}
                        </template>
                    </template> -->
                </el-table-column>
            </el-table>
            <el-pagination class="right offset-top-31 offset-bottom-46" background layout="prev, pager, next" :page-count="totalPage" @current-change="handleCurrentChange"></el-pagination>
    </el-card>
</template>

<script>
import { get} from '@/api/index.js';
import platsApi from '@/api/plats.js';
import operateApi from '@/api/operate.js';
import { number } from 'prop-types';

export default {
    data(){
        return {
            countTxt: "",
            title: '',
            totalPage: 0,
            current: 1,
            list: [],
            plats:[],
            total: {},
            search: {
                date: [],
                company: "",
                department: "",
                plat_id: '',
                operate_user_id: '',
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
        this.getPlats()
    }, 
    methods:{
        getOperateUsers(){
            get(operateApi.operateUserList, this.search).then((res) => {
                this.operate_users = res.data.list
            })
        },
        getPlats(){
            get(platsApi.list).then((res) => {
                this.plats = res.data.list
                this.search.plat_id = this.plats[0].id
                this.getData()
            })
        },
        getData(){
            get(operateApi.groupCalList + '/time_list', this.search).then((res) => {
                this.totalPage = res.data.list.last_page
                this.list = res.data.list.data
                this.total = res.data.total
                // this.countTxt = "共(" + res.data.total + ')分'
                this.countTxt = ""
            })
        },
        getSummaries(param) {
            // const { columns, data } = param;
            // const sums = [];
            // columns.forEach((column, index) => {
            //     if (index === 0) {
            //         sums[index] = '合计';
            //         return;
            //     }else if(index == 5){
            //         sums[index] = this.total.money
            //     }else{
            //         sums[index] = ''
            //     }
            // });
            const sums = 0;
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
