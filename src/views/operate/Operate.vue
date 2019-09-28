<template>
    <div>
		<el-row :gutter="20">
			<el-col :span="4">
				<el-select placeholder="筛选子公司" v-model="search.company">
					<el-option v-for="item in companyOptions" :key="item.name" :label="item.name" :value="item.id"></el-option>
				</el-select>
			</el-col>
			<el-col :span="4">
				<el-select placeholder="筛选部门" v-model="search.department">
					<el-option v-for="item in departmentOptions" :key="item.name" :label="item.name" :value="item.id"></el-option>
				</el-select>
			</el-col>
			<el-col :span="4">
				<el-date-picker v-model="search.date" type="daterange" align="right" unlink-panels range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2"></el-date-picker>
			</el-col>
			<el-col>
				<el-button type="primary">搜索</el-button>
			</el-col>
		</el-row>
		<el-row :gutter="20" style="height:200px;">
			<OperateTotal :item="total" :company="company_total" :department="department"></OperateTotal>
		</el-row>
		<el-row :gutter="20">
			<ActorDayMoney :money="operate.money" :time="operate.time"></ActorDayMoney>
		</el-row>
		<el-row :gutter="20" style="height:300px;">
			<el-col :span="12" v-for="item in department_echarts" :key="item.id" style="height:100%;">
				<el-card style="height:300px;">
					<div class="marl-line-div" :id="item.id" style="height:100%;"></div>
				</el-card>
			</el-col>
		</el-row>
    </div>
</template>

<script>
import OperateTotal from '@/componets/echarts/OperateTotal.vue'
import ActorDayMoney from '@/componets/echarts/ActorDayMoney.vue'
import { fork } from 'child_process'

export default {
  components:{ OperateTotal, ActorDayMoney },
    data(){
      return {
				search: {
					company: "",
					department: "",
					date: "",
				},
				companyOptions: [
					{
						id: "",
						name: '全部'
					},
					{
						id: 1,
						name: '成都'
					},
					{
						id: 2,
						name: '北京'
					},
				],
				departmentOptions: [
					{
						id: "",
						name: '全部'
					},
					{
						id: 1,
						name: '签约部一'
					},
					{
						id: 1,
						name: '签约部二'
					},
				],
				total: {
					name: '运营组一主播日常数据',
					total_money: '20', //总收入
					total_sign_user_count: '100', //签约主播数量
					total_validate_user_count: '2000', //全部有效主播数量
					time: { //总在线时长
						h: '2310',
						m: '56',
					}
				},
				company_total: {
					name: '北京主播日常数据',
					total_money: '100', //总收入
					total_sign_user_count: '1000', //签约主播数量
					total_validate_user_count: '900', //全部有效主播数量
					time: { //总在线时长
						h: '2310',
						m: '56',
					}
				},
				department: {
					name: '新增开播数',
					total_money: '100', //总收入
					total_sign_user_count: '1000', //签约主播数量
					total_validate_user_count: '900', //全部有效主播数量
					time: { //总在线时长
						h: '2310',
						m: '56',
					}
				},

				//运营主播近三十日收入及时长
				operate: {
					money: {
						title: '近30日主播日均收入',
						select_date: [],
						series: [
							{
								name:'近30日主播日均收入',
								type:'line',
								smooth: true,
								data:[111, 222, 12, 333, 444, 555, 666, 777, 888, 999, 100, 256, 532, 532,111, 222, 12, 333, 444, 555, 666, 777, 888, 999, 100, 256, 532, 532,541,534],
								
							},
						],
					},
					time: {
						title: '近30日主播日均时长',
						select_date: [],
						series: [
							{
								name:'近30日主播日均时长',
								type:'line',
								smooth: true,
								data:[111, 222, 12, 333, 444, 555, 666, 777, 888, 999, 100, 256, 532, 532,111, 222, 12, 333, 444, 555, 666, 777, 888, 999, 100, 256, 532, 532,541,534],
								
							},
						],
					}
				},

				search: {
					company: "",
					department: "",
					date: "",
				},
				companyOptions: [
					{
						id: "",
						name: '全部'
					},
					{
						id: 1,
						name: '子公司一'
					},
					{
						id: 2,
						name: '子公司二'
					},
				],
				departmentOptions: [
					{
						id: "",
						name: '全部'
					},
					{
						id: 1,
						name: '运营部一'
					},
					{
						id: 1,
						name: '运营部二'
					},
				],
				department_echarts:[
					//以部门为单位的统计图
					{
						id: 'yungyingbu_1',
						options: {
							title: {
							text: '运营部一统计'
						},
						tooltip: {
							trigger: 'axis'
						},
						legend: {
							data:['时长','收入','主播数量']
						},
						grid: {
							// left: '3%',
							// right: '4%',
							// bottom: '3%',
							// containLabel: true
						},
						toolbox: {
							feature: {
								saveAsImage: {}
							}
						},
						xAxis: {
							type: 'category',
							boundaryGap: false,
							data: ['09-25','09-26','09-27','09-28']
						},
						yAxis: {
							type: 'value'
						},
						series: [
							{
								name:'时长',
								type:'line',
								stack: '总量',
								data:[50, 100, 150, 200]
							},
							{
								name:'收入',
								type:'line',
								stack: '总量',
								data:[50, 100, 150, 200]
							},
							{
								name:'主播数量',
								type:'line',
								stack: '总量',
								data:[50, 100, 150, 200]
							}
						]
						}
					},
					{
						id: 'yungyingbu_2',
						options: {
							title: {
							text: '运营部二统计'
						},
						tooltip: {
							trigger: 'axis'
						},
						legend: {
							data:['时长','收入','主播数量']
						},
						grid: {
							// left: '3%',
							// right: '4%',
							// bottom: '3%',
							// containLabel: true
						},
						toolbox: {
							feature: {
								saveAsImage: {}
							}
						},
						xAxis: {
							type: 'category',
							boundaryGap: false,
							data: ['09-25','09-26','09-27','09-28']
						},
						yAxis: {
							type: 'value'
						},
						series: [
							{
								name:'时长',
								type:'line',
								stack: '总量',
								data:[10, 20, 0, 30]
							},
							{
								name:'收入',
								type:'line',
								stack: '总量',
								data:[1, 2, 4, 6]
							},
							{
								name:'主播数量',
								type:'line',
								stack: '总量',
								data:[0, 1, 2, 3]
							}
						]
						}
					}
				]
      }
    },
    mounted(){
		this.initMarkLine()
    },
    methods:{
			initMarkLine(){
				let that = this
				this.department_echarts.forEach(function(item){
					console.log(item)
					let myChart = that.$echarts.init(document.getElementById(item.id), 'macarons');
					myChart.setOption(item.options);
				})
			},
			getDateByDays(days, format){
				let data = []
				let flag = 'before'
				if(days > 0){
					//获取之后的日期
					flag = 'after'
				}
				
				days = Math.abs(days)

				var date1 = new Date()

				var time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate() 
				var timeStamp = Date.parse(date1) / 1000
				if(flag == 'before'){
					for(var i = days; i>=1; i--){
						var time2 = this.formatDate(date1, flag, timeStamp, format, i)
						data.push(time2)
					}
				}else{
					for(var i = 1; i<=days; i++){
						var time2 = this.formatDate(date1, flag, timeStamp, format, i)
						data.push(time2)
					}
				}

				return data
			},
			formatDate(date1, flag, timeStamp, format, i){
				var date2 = new Date(date1)	
					if(flag == 'before'){
						var date2 = new Date((timeStamp - 24 * 60 * 60 * i) * 1000)
					}else{
						var date2 = new Date((timeStamp + 24 * 60 * 60 * i) * 1000)
					}
					var dateArr = {}
					dateArr['Y'] = date2.getFullYear()
					dateArr['M'] = (date2.getMonth()+1 < 10 ? '0'+(date2.getMonth()+1) : date2.getMonth()+1)
					dateArr['D'] = (date2.getDate()+1 < 10 ? '0'+(date2.getDate()+1) : date2.getDate()+1)
					var formatArr = format.split('-')
					var time2 = ''
					formatArr.forEach(function(key, index){
						time2  += dateArr[key]
						if(key != 'D'){
							time2 += '-'
						}
					})
					return time2
			}
    },
    created(){
			this.operate.money.select_date = this.getDateByDays(-30, 'M-D')
			this.operate.time.select_date = this.getDateByDays(-30, 'M-D')
    }
}
</script>
<style>

	.el-card__body{
		height: 100%;
	}
</style>
<style scoped>
    .el-row {
        margin-bottom: 20px;
    }
	.el-col-12{
		margin-bottom: 20px;
	}
</style>
