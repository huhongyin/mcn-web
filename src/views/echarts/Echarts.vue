<template>
    <div>
		<el-card>
			<el-row :gutter="20">
				<el-col :lg="2" :md="3" :sm="3">
					<el-select placeholder="筛选子公司" v-model="search.company">
						<el-option v-for="item in companyOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-col>
				<!--<el-col :lg="2" :md="3" :sm="3">
					<el-select placeholder="筛选部门" v-model="search.department">
						<el-option v-for="item in departmentOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-col>-->
				<el-col :lg="7" :md="10" :sm="10">
					<el-date-picker v-model="search.date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" style="max-width:100%;" type="daterange" align="right" unlink-panels range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2"></el-date-picker>
				</el-col>
				<el-col :lg="12" :md="8" :sm="5">
					<el-button type="primary" @click="searchData">搜索</el-button>
				</el-col>
			</el-row>
			<el-row :gutter="10" class="sign-info">
				<el-col :span="6">
					<div>
						<img :src="total_money_img" width="64" height="64"/>
						<label v-text="total.total_money + '万'" @click="showTotalMoney('主播流水记录')"></label>
					</div>
				</el-col>
				<el-col :span="6">
					<div>
						<img :src="all_users_img" width="64" height="64"/>
						<label v-text="total.total_sign_user_count" @click="showSignActor('签约主播')"></label>
					</div>
				</el-col>
				<el-col :span="6">
					<div>
						<img :src="online_users_img" width="64" height="64"/>
						<label v-text="total.effective_count" @click="showEffectiveActor('有效主播数量')"></label>
					</div>
				</el-col>
				<el-col :span="6">
					<div>
						<img :src="time_img" width="64" height="64"/>
						<label v-text="total.time.h + '小时' + total.time.m + '分钟'" @click="showOnLine('在线总时长')"></label>
					</div>
				</el-col>
			</el-row>
			<el-row :gutter="20" style="height:382px;">
				<!-- <Total v-show="every_data.dates && every_data.series_data" :every="every_data"></Total> -->
					<el-col :span="24" style="text-align:center;">
						<span style="font-size:20px;font-weight:500;">营收总览</span>
						<div class="marl-line-div" id="mark-line-total_all_plat"></div>
				</el-col>
			</el-row>
		</el-card>
		
		<el-row v-if="this.plats.length > 0 && typeof this.search != 'undefined'" :gutter="20" type="flex" style="margin-top: 1rem;">
			<Plat :ref="'child' + key" v-for="(item,key) in plats" :key="key" :item="item" :searchs="search"></Plat>
		</el-row>
		<!-- <el-row :gutter="20" type="flex">
			<MarkLine echart-id="mark-line-total" text="过去30日总营收" subtext="" :data="select_date" :series="series" :SpanNum="24"></MarkLine>
		</el-row>
		<el-row :gutter="20">
			<MarkLine v-for="(item,key) in mark_line_list" :key="key" :echart-id="'mark-line-total_' + key" :text="item.name + '过去30日总营收'" subtext="" :data="item.select_date" :series="item.series" :span-num="12"></MarkLine>
		</el-row>
		<el-row :gutter="20">
			<BarLabel v-for="(item,key) in ten.list" :key="key" :echart-id="'bar-line-total_' + key" :text="item.title" :Series="item.series" :Ydata="item.ydata" :legend="item.legend" subtext="" :span-num="12"></BarLabel>
		</el-row>
		<el-row :gutter="20">
			<BarLabel v-for="(item,key) in users.list" :key="key" :echart-id="'user-bar-line-total_' + key" :text="item.title" :Series="item.series" :Ydata="item.ydata" :legend="item.legend" subtext="" :span-num="12"></BarLabel>
		</el-row> -->
    </div>
</template>

<script>

import Plat from '@/componets/echarts/Item.vue'
import MarkLine from '@/componets/echarts/LineMarke.vue'
import BarLabel from '@/componets/echarts/TenItem.vue'
import Total from '@/componets/echarts/Total.vue'
import echartsApi from '@/api/echarts.js'
import companyApi from '@/api/company.js'
import platApi from '@/api/plats.js'
import { get, post } from '@/api/index.js'

export default {
  components:{ Plat, MarkLine, BarLabel, Total },
    data(){
      return {
		total_money_img: require("../../assets/imgs/index/total_money.png"),
		all_users_img: require("../../assets/imgs/index/all_users.png"),
		time_img: require("../../assets/imgs/index/time.png"),
		online_users_img: require("../../assets/imgs/index/online_users.png"),
		search: {
			company: "",
			department: "",
			date: [],
		},
		plats: [],
		total: {
			name: '签约数据统计',
			total_money: '', //总收入
			total_sign_user_count: '', //签约主播数量
			effective_count: 0, //有效主播数量
			time: { //总在线时长
				h: '',
				m: '',
			}
		},
		companyOptions: [],
		departmentOptions: [
			{
				id: "",
				name: '全部部门'
			},
			{
				id: 1,
				name: '签约部一'
			},
			{
				id: 2,
				name: '签约部二'
			},
		],
		lineOptions: {
			title: {
					text: '',
					subtext: '',
					textStyle: {
							color: 'rgb(46, 56, 74)'
					},
			},
			textStyle: {
					color: 'rgb(46, 56, 74)'
			},
			tooltip: {
					trigger: 'axis'
			},
			legend: {
					data:['总营收']
			},
			toolbox: {
					show: false,
					feature: {
							dataZoom: {
									yAxisIndex: 'none'
							},
							dataView: {readOnly: false},
							magicType: {type: ['line', 'bar']},
							restore: {},
							saveAsImage: {}
					}
			},
			xAxis:  {
					type: 'category',
					boundaryGap: false,
					data: []
			},
			yAxis: {
					type: 'value',
					axisLabel: {
							formatter: '{value} 万' 
					}
			},
			series: {
								name:'总收益',
								type:'line',
								smooth: true,
								data:[],
								itemStyle : {
										normal: 
										{
												color:'rgb(58,160,255)',
												borderWidth: 4,
												lineStyle:{
														color: "rgb(58,160,255)"
												},
										}
								}
						},
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
			this.isLogin() //验证登录
			this.setDate() //初始化时间
			this.getPlats() //获取平台
			this.getCompanies() //获取公司数据
			// this.getSignCal() //获取统计总数 总流水  有效主播数量...
    },
    methods:{
			isLogin(){
				let token = localStorage.getItem('access_token')
				if(token == null){
					this.$router.push({
						path: '/login',
					})
				}
			},
			getPlats(){
				get(platApi.list).then((res) => {
					this.plats = res.data.list
				})
			},
			setDate(){
				var date = new Date()
				var yestoday = date.getTime() - 24*60*60*1000
				var date2 = new Date()
				date2.setTime(yestoday)
				var yesTodayDate = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + date2.getDate()
				var thirtyDay = date.getTime() - 24*60*60*1000 * 30
				date2.setTime(thirtyDay)
				var thirtyDate = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + date2.getDate()
				this.search.date = [thirtyDate, yesTodayDate]
			},
			getCompanies(){
				get(companyApi.list, { type: 'select' }).then((res) => {
					this.companyOptions = res.data.list
					this.search.company = res.data.list[0].id
					this.getSignCal() //获取统计总数 总流水  有效主播数量...
				})
			},
			searchData(){
				this.getSignCal()
			},
			showTotalMoney(title){
				//查看流水
				this.$router.push({
						path: 'signTotalMoney',
						query: {
							title: title,
							start_date: this.search.date[0],
							end_date: this.search.date[1],
						}
				})
			},
			showSignActor(title){
				//签约主播数量
				this.$router.push({
						path: 'signActorCount',
						query: {
								title: title,
								start_date: this.search.date[0],
								end_date: this.search.date[1],
						}
				})
			},
			showEffectiveActor(title){
				//有效主播数量
				this.$router.push({
						path: 'effectiveActorCount',
						query: {
								title: title,
								start_date: this.search.date[0],
								end_date: this.search.date[1],
						}
				})
			},
			showOnLine(title){
				//在线总时长
				this.$router.push({
						path: 'onLineList',
						query: {
								title: title,
								start_date: this.search.date[0],
								end_date: this.search.date[1],
						}
				})
			},
				getSignCal(){
					this.plats.forEach((element, index) => {
						let k = 'child' + index
						console.log(k)
						this.$refs[k][0].callMethod(this.search.company, this.search) 
					});
					get(echartsApi.signCal, this.search).then((res) => {
						this.total.total_money = res.data.list.total_money
						this.total.total_sign_user_count = res.data.list.sign_actor_count
						this.total.effective_count = res.data.list.effective_count
						this.total.time.h = res.data.list.total_live_time.hours
						this.total.time.m = res.data.list.total_live_time.minutes
						this.lineOptions.xAxis.data = res.data.list.total_money_detail.dates
						this.lineOptions.series.data = res.data.list.total_money_detail.series_data
						this.initMarkLine()
					})
				},
				initMarkLine(){
					let myChart = this.$echarts.init(document.getElementById("mark-line-total_all_plat"), 'macarons');
					myChart.setOption(this.lineOptions);
				}
    },
}
</script>

<style scoped>
    .el-row {
        margin-bottom: 20px;
    }
	.el-col-12{
		margin-bottom: 20px;
	}

	.sign-info .el-col-6 div{
		display:flex;
		width:80%;
		margin:0 auto;
	}

	.sign-info .el-col-6 div label{
		height: 100%;
		margin:auto 0;
		font-size:20px;
		cursor:pointer;
		margin-left: 1rem;
	}
    .marl-line-div{
        height: 300px;
    }
	
</style>
