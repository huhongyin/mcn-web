<template>
    <div>
			<el-row :gutter="10">
				<el-col :lg="2" :md="3" :sm="3">
					<el-select placeholder="筛选公司" v-model="search.company" @change="getDepartment">
						<el-option v-for="item in companyOptions" :key="item.name" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-col>
				<el-col v-if="showDepartment" :lg="2" :md="3" :sm="3">
					<el-select placeholder="筛选部门" v-model="search.department">
						<el-option v-for="item in departmentOptions" :key="item.name" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-col>
				<el-col  :lg="6" :md="8" :sm="6">
					<el-date-picker value-format="yyyy-MM-dd" format="yyyy-MM-dd" style="max-width:100%;" v-model="search.date" type="daterange" align="right" unlink-panels range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2"></el-date-picker>
				</el-col>
				<el-col :lg="14" :md="8" :sm="2">
					<el-button type="primary" @click="searchData">搜索</el-button>
				</el-col>
			</el-row>
			<el-row :gutter="10" style="height:fit-content;">
				<OperateTotal ref="operate_total" :company="company_total" :department="department"></OperateTotal>
			</el-row>
			<el-row :gutter="10">
				<ActorDayMoney ref="actor_day_money"></ActorDayMoney>
			</el-row>
			<el-row :gutter="10" style="height:300px;">
				<el-col :span="12" v-for="item in department_echarts" :key="item.id" style="height:100%;">
					<el-card style="height:300px;">
						<div class="marl-line-div" :ref="item.id" :id="item.id" style="height:100%;"></div>
					</el-card>
				</el-col>
			</el-row>
    </div>
</template>

<script>
import companyApi from '@/api/company.js'
import departmentApi from '@/api/department.js'
import operateApi from '@/api/operate.js'
import OperateTotal from '@/componets/echarts/OperateTotal.vue'
import ActorDayMoney from '@/componets/echarts/ActorDayMoney.vue'
import { get } from '@/api/index.js'

export default {
  components:{ OperateTotal, ActorDayMoney },
    data(){
      return {
				search: {
					company: "",
					department: "",
					date: [],
				},
				showDepartment: false,
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
				companyOptions: [],
				departmentOptions: [],
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
				department_echarts: [],
      }
    },
    created(){
			this.setDate()
			this.getCompanies()
		},
		updated(){
			this.initMarkLine()
		},
    mounted(){
    },
    methods:{
			searchData(){
				this.$refs['operate_total'].searchData(this.search)
				this.$refs['actor_day_money'].searchData(this.search)
				this.getDepartmentCal()
			},
			getCompanies(){
				get(companyApi.list, {type: 'select'}).then((res) => {
					this.search.company = res.data.list[0].id
					this.companyOptions = res.data.list
					this.getDepartment()
				})
			},
			getDepartment(){
				get(departmentApi.list, {type: 'select', company_id: this.search.company, department_type: 1, check: 'operate'}).then((res) => {
					if(res.data.list.length <= 0){
						this.showDepartment = false
						this.departmentOptions = []
						this.search.department = ""
					}else{
						this.showDepartment = true
						this.departmentOptions = res.data.list
						var all = {id: "", name: "全部"};
						this.departmentOptions.unshift(all)
						this.search.department = res.data.list[0].id
					}
					this.$refs['operate_total'].searchData(this.search)
					this.$refs['actor_day_money'].searchData(this.search)
					this.getDepartmentCal()
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
			initMarkLine(){
				this.department_echarts.map((item) => {
					let myChart = this.$echarts.init(document.getElementById(item.id), 'macarons');
					myChart.setOption(item.options);
				})
			},
			getDepartmentCal(){
				get(operateApi.department, this.search).then((res) => {
					this.department_echarts = []
					res.data.map((element) => {
						var lineOption = {
									id: '',
									options: {
										title: {
											text: '',
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
											data:['时长','收入','主播数量']
										},
										grid: {
										},
										toolbox: {
											feature: {
												saveAsImage: {}
											}
										},
										xAxis: {
											type: 'category',
											boundaryGap: false,
											data: []
										},
										yAxis: {
											type: 'value'
										},
										series: []
									}
								}
							lineOption.options.xAxis.data = element.dates
							lineOption.id = element.id
							lineOption.options.title.text = element.title
							lineOption.options.series = element.series
							this.department_echarts.push(lineOption)
					})
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
