<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            原数据
        </div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :data-id="item.id" v-for="(item,key) in plats" :key="key" :label="item.name" :name="'plat_' + item.id">
                <el-row :gutter="10">
                        <el-col :xl="4" :lg="5" :md="4" :sm="2">
                            <el-input v-model="form.keyword" placeholder="输入关键词搜索"></el-input>
                        </el-col>
                        <el-col :xl="4" :lg="5" :md="8" :sm="10">
                            <el-date-picker
                            :disabledDate="disabledDate"
                            style="max-width:100%;"
                            v-model="form.date"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            type="date"
                            placeholder="选择日期">
                            </el-date-picker>
                        </el-col>
                        <el-col :xl="2" :lg="2" :md="2" :sm="2">
                            <el-button type="primary" @click="search">搜索</el-button>
                        </el-col>
                    </el-row>
                <div v-if="form.plat_id == 1">
                    <el-row>
                        <el-col :span="24">
                            <el-table :summary-method="getSummaryOne" show-summary :data="tableData" style="width: 100%">
                                <el-table-column fixed prop="date" label="日期"> </el-table-column>
                                <el-table-column fixed prop="nickname" label="昵称"></el-table-column>
                                <el-table-column prop="live_time" label="直播时长(小时)"></el-table-column>
                                <el-table-column prop="youxiao_days" label="有效天数(天)"></el-table-column>
                                <el-table-column prop="add_people_nums" label="涨粉"></el-table-column>
                                <el-table-column prop="live_money" label="音浪-直播"></el-table-column>
                                <el-table-column prop="live_prop" label="音浪-道具"></el-table-column>
                                <el-table-column prop="live_activity" label="音浪-活动"></el-table-column>
                                <el-table-column prop="live_total_money" label="音浪-总计"></el-table-column>
                                <el-table-column prop="remark" label="备注"></el-table-column>
                            </el-table>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" style="text-align:center;">
                            <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange" :total="total" :current-page="form.page"></el-pagination>
                        </el-col>
                    </el-row>
                </div>
                <el-row v-else-if="form.plat_id == 2">
                     <el-row>
                        <el-col :span="24">
                            <el-table show-summary :summary-method="getSummaryTwo" :data="tableData" stripe style="width: 100%">
                                <el-table-column fixed prop="date" label="日期"> </el-table-column>
                                <el-table-column fixed prop="nickname" label="昵称"></el-table-column>
                                <el-table-column prop="time" label="直播有效时长(小时)"></el-table-column>
                                <el-table-column prop="base_money" label="基准礼物映币"></el-table-column>
                                <el-table-column prop="money" label="原始礼物映币"></el-table-column>
                                <el-table-column prop="money_flush" label="映币流水"></el-table-column>
                                <el-table-column prop="divide_money" label="分成收入"></el-table-column>
                            </el-table>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" style="text-align:center;">
                            <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange" :total="total" :current-page="form.page"></el-pagination>
                        </el-col>
                    </el-row>
                </el-row>
                <el-row v-else-if="form.plat_id == 3">
                     <el-row>
                        <el-col :span="24">
                            <el-table show-summary :summary-method="getSummaryThree" :data="tableData" stripe style="width: 100%">
                                <el-table-column fixed prop="date" label="日期"> </el-table-column>
                                <el-table-column fixed prop="nickname" label="昵称"></el-table-column>
                                <el-table-column prop="add_fans_num" label="新增粉丝数"></el-table-column>
                                <el-table-column prop="live_counts" label="直播场次"></el-table-column>
                                <el-table-column prop="see_people_nums" label="观看直播人数"></el-table-column>
                                <el-table-column prop="live_time" label="直播时长(分)"></el-table-column>
                                <el-table-column prop="video_live_time" label="视频直播时长"></el-table-column>
                                <el-table-column prop="live_money" label="直播流水(陌币)"></el-table-column>
                                <el-table-column prop="guild_money" label="公会分成金额(元)"></el-table-column>
                                <el-table-column prop="actor_money" label="主播分成金额(元)"></el-table-column>
                            </el-table>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" style="text-align:center;">
                            <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange" :total="total" :current-page="form.page"></el-pagination>
                        </el-col>
                    </el-row>
                </el-row>

                <el-row v-else-if="form.plat_id == 4">
                     <el-row>
                        <el-col :span="24">
                            <el-table show-summary :summary-method="getSummaryFour" :data="tableData" stripe style="width: 100%">
                                <el-table-column fixed prop="plat_actor_id" label="火山号"> </el-table-column>
                                <el-table-column fixed prop="nickname" label="昵称"></el-table-column>
                                <el-table-column prop="live_time" label="直播时长(小时)"></el-table-column>
                                <el-table-column prop="youxiao_days" label="有效天数(天)"></el-table-column>
                                <el-table-column prop="add_people_nums" label="涨粉"></el-table-column>
                                <el-table-column prop="live_money" label="火力-直播"></el-table-column>
                                <el-table-column prop="live_prop" label="火力-道具"></el-table-column>
                                <el-table-column prop="live_activity" label="火力-活动"></el-table-column>
                                <el-table-column prop="live_total_money" label="火力-总计"></el-table-column>
                                <el-table-column prop="fenchengbi" label="分成比"></el-table-column>
                                <el-table-column prop="agent_user_name" label="经纪人"></el-table-column>
                                <el-table-column prop="remark" label="备注"></el-table-column>
                            </el-table>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" style="text-align:center;">
                            <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange" :total="total" :current-page="form.page"></el-pagination>
                        </el-col>
                    </el-row>
                </el-row>
            </el-tab-pane>
        </el-tabs>
    </el-card>
</template>

<script>
import { get, post} from '@/api/index.js';
import platApi from '@/api/plats.js';
import oldApi from '@/api/old.js';

export default {
    created(){
        var day1 = new Date();
        day1.setTime(day1.getTime()-24*60*60*1000);
        var s1 = day1.getFullYear()+"-" + (day1.getMonth()+1) + "-" + day1.getDate();
        this.form.date = s1
        this.getPlats()
        this.getData()
    },
    data(){
        return {
            total_list: {},
            form: {
                plat_id: '',
                date: '',
                keyword: '',
                page: 1,
            },
            activeName: '',
            plats: [],
            tableData: [],
            total: 0,
        }
    },
    methods:{
        handleClick(tab, event) {
            var platId = tab.$attrs['data-id']
            this.form.plat_id = platId
            this.form.page = 1
            this.getData()
        },
        getPlats(){
            get(platApi.list).then((res) => {
                this.activeName = "plat_" + res.data.list[0].id
                this.form.plat_id = res.data.list[0].id
                this.plats = res.data.list
                this.getData()
            })
        },
        getData(){
            if(this.form.plat_id != ''){
                get(oldApi.list, this.form).then((res) => {
                    this.tableData = res.data.list.data
                    this.total = res.data.list.total
                    this.form.page = res.data.list.current_page
                    this.total_list = res.data.total
                })
            }
        },
        handleCurrentChange(val) {
            this.form.page = val
            this.getData()
        },
        search(){
            this.getData()
        },
        disabledDate(time) {
            console.log(time)
        },
        getSummaryOne(params){
            const columns = params.columns
            const data = params.data
            const sums = [];

            columns.forEach((column, index) => {

                switch(index){
                    case 0:
                            sums[index] = '合计' 
                        break
                    case 2:
                            sums[index] = this.total_list.total_live_time
                        break
                    case 3:
                            sums[index] = this.total_list.total_youxiao_days
                        break
                    case 4:
                            sums[index] = this.total_list.total_add_people_nums
                        break
                    case 5:
                            sums[index] = this.total_list.total_live_money
                        break
                    case 6:
                            sums[index] = this.total_list.total_live_prop
                        break
                    case 7:
                            sums[index] = this.total_list.total_live_activity
                        break
                    case 8:
                            sums[index] = this.total_list.live_total_money_sum
                        break
                    default:
                            sums[index] = ''
                        break
                }
            });
            return sums
        },
        getSummaryTwo(params){
            const columns = params.columns
            const data = params.data
            const sums = [];

            columns.forEach((column, index) => {

                switch(index){
                    case 0:
                            sums[index] = '合计' 
                        break
                    case 2:
                            sums[index] = this.total_list.total_live_time
                        break
                    case 3:
                            sums[index] = this.total_list.total_base_money
                        break
                    case 4:
                            sums[index] = this.total_list.total_money
                        break
                    case 5:
                            sums[index] = this.total_list.total_money_flush
                        break
                    case 6:
                            sums[index] = this.total_list.total_divide_money
                        break
                    default:
                            sums[index] = ''
                        break
                }
            });
            return sums
        },
        getSummaryThree(params){
            const columns = params.columns
            const data = params.data
            const sums = [];

            columns.forEach((column, index) => {

                switch(index){
                    case 0:
                            sums[index] = '合计' 
                        break
                    case 2:
                            sums[index] = this.total_list.total_add_fans_num
                        break
                    case 3:
                            sums[index] = this.total_list.total_live_counts
                        break
                    case 4:
                            sums[index] = this.total_list.total_see_people_nums
                        break
                    case 5:
                            sums[index] = this.total_list.total_live_time
                        break
                    case 6:
                            sums[index] = this.total_list.total_video_live_time
                        break
                    case 7:
                            sums[index] = this.total_list.total_live_money
                        break
                    case 8:
                            sums[index] = this.total_list.total_guild_money
                        break
                    case 9:
                            sums[index] = this.total_list.total_actor_money
                        break
                    default:
                            sums[index] = ''
                        break
                }
            });
            return sums
        },
        getSummaryFour(params){
            const columns = params.columns
            const data = params.data
            const sums = [];

            columns.forEach((column, index) => {

                switch(index){
                    case 0:
                            sums[index] = '合计' 
                        break
                    case 2:
                            sums[index] = this.total_list.total_live_time
                        break
                    case 3:
                            sums[index] = this.total_list.total_youxiao_days
                        break
                    case 4:
                            sums[index] = this.total_list.total_add_people_nums
                        break
                    case 5:
                            sums[index] = this.total_list.total_live_money
                        break
                    case 6:
                            sums[index] = this.total_list.total_live_prop
                        break
                    case 7:
                            sums[index] = this.total_list.total_live_activity
                        break
                    case 8:
                            sums[index] = this.total_list.total_live_total_money
                        break
                    default:
                            sums[index] = ''
                        break
                }
            });
            return sums
        },
    }
}
</script>

<style lang='less' scoped>
.el-row{
    margin-top: 1rem;
}
</style>
