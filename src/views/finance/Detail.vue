<template>
			<el-card>
				 <div slot="header" class="clearfix">
					<span></span>
					<el-row :gutter="10">
						<el-col :span="6">
							<el-date-picker style="max-width:100%;" v-model="search.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
						</el-col>
						<el-col :span="2">
							<el-button type="primary">搜索</el-button>
						</el-col>
					</el-row>
				</div>
				<el-row :gutter="10" style="margin-top:1rem;">
					<Total :search="search" :ref="'p_' + item" v-for="(item,key) in types" :key="key" :item="item" @removeAllItemClass="removeAllItemClass" @showTable="showTable"></Total>
					<!-- <Total :search="search" :ref="'p_' + item.type" v-for="(item,key) in list" :types="types" :key="key" :item="item" @removeAllItemClass="removeAllItemClass" @showTable="showTable"></Total> -->
				</el-row>
				<el-row>
					<MaoLiRun ref="total_div" style="display:none;" :start_date="list.total.start_date" :end_date="list.total.end_date" :name="list.total.name"></MaoLiRun>
					<FuChiJine ref="fuchijine_div" style="display:none;" :start_date="list.fuchijine.start_date" :end_date="list.fuchijine.end_date" :name="list.fuchijine.name"></FuChiJine>
					<YiFuChiJine ref="yifuchijine_div" style="display:none;" :start_date="list.yifuchijine.start_date" :end_date="list.yifuchijine.end_date" :name="list.yifuchijine.name"></YiFuChiJine>
					<ShouldPay ref="shouldPay_div" style="display:none;" :start_date="list.shouldPay.start_date" :end_date="list.shouldPay.end_date" :name="list.shouldPay.name"></ShouldPay>
				</el-row>
			</el-card>
</template>

<script>

import Total from '@/componets/finance/Total.vue'
import ActorDayMoney from '@/componets/echarts/ActorDayMoney.vue'
import MaoLiRun from '@/views/finance/Maolirun.vue'
import FuChiJine from '@/views/finance/Fuchijine.vue'
import YiFuChiJine from '@/views/finance/Yifuchijine.vue'
import ShouldPay from '@/views/finance/ShouldPay.vue'

export default {
  components:{ Total, ActorDayMoney, MaoLiRun, FuChiJine, YiFuChiJine, ShouldPay },
    data(){
      return {
				showMaoLiRun: false,
				showFuChiJine: false,
				showYiFuChiJine: false,
				showShouldPay: false,
				types: [
					'total',
					'fuchijine',
					'yifuchijine',
					'shouldPay',
				],
				search:{
					date: [],
				},
				list: {
					total: {
						name: '毛利润',
						total_money: '20', //总收入
						start_date: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
						end_date: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
						precent: {
							value: '43.2%',
							type: 1, //增加
							content: '环比 8-16 上升43.2%',
						},
						url: '/maolirun',
						type: 'total',
					},
					fuchijine: {
						name: '扶持金额',
						total_money: '1', //总收入
						start_date: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
						end_date: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
						precent: {
							value: '43.2%',
							type: 0, //增加
							content: '环比 8-16 下降43.2%',
						},
						url: '/fuchijine',
						type: 'fuchijine',
					},
					yifuchijine: {
						name: '已扶持金额',
						total_money: '0.3', //总收入
						start_date: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
						end_date: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
						precent: {
							value: '43.2%',
							type: 0, //增加
							content: '环比 8-16 下降43.2%',
						},
						url: '/yifuchijine',
						type: 'yifuchijine',
					},
					shouldPay:{
						name: '应付主播收益',
						total_money: '0.78', //总收入
						start_date: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
						end_date: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
						precent: {
							value: '43.2%',
							type: 0, //增加
							content: '环比 8-16 下降43.2%',
						},
						url: '/shouldPay',
						type: 'shouldPay',
					}
				},
      }
    },
    mounted(){
			this.getDate()
    },
    methods:{
				handleClose(){

				},
				removeAllItemClass(){
					let that = this
					this.types.map((item) => {
							let key = 'p_' + item
							let obj = that.$refs[key][0].$children[0].$children[0].$el
							obj.classList.remove('plat-active')
					})
				},
				showTable(params){
					let that = this
					this.types.map((item) => {
						let key = item + "_div"
						let obj = that.$refs[key].$el.style.display = 'none'
					})
					let obj = that.$refs[params.type + "_div"].$el.style.display = 'block'
				},
				getDate(){
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
    },
    created(){
			
    }
}
</script>

<style scoped>
	.maoli > .el-icon-s-cooperation{
		font-size: 40px;
	}

	.fuchi-num,.yifuchi-num,.maolirun-num{
		color:#3fc5d1;
		line-height:40px;
		font-size:35px;
		font-weight:bold;
	}

	.finance-header-label{
		line-height:40px;
		font-size: 20px;
	}
</style>
