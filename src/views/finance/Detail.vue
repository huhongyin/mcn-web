<template>
    <div>
			<el-row :gutter="10">
				<Total :ref="'p_' + item.type" v-for="(item,key) in list" :types="types" :key="key" :item="item" @removeAllItemClass="removeAllItemClass" @showTable="showTable"></Total>
				<!-- <Total :item="total"></Total>
				<Total :item="fuchi"></Total>
				<Total :item="yifuchijine"></Total>
				<Total :item="month_should_pay"></Total> -->
			</el-row>
			<el-row>
				<MaoLiRun ref="total_div" style="display:none;" :start_date="list.total.start_date" :end_date="list.total.end_date" :name="list.total.name"></MaoLiRun>
				<FuChiJine ref="fuchijine_div" style="display:none;" :start_date="list.fuchijine.start_date" :end_date="list.fuchijine.end_date" :name="list.fuchijine.name"></FuChiJine>
				<YiFuChiJine ref="yifuchijine_div" style="display:none;" :start_date="list.yifuchijine.start_date" :end_date="list.yifuchijine.end_date" :name="list.yifuchijine.name"></YiFuChiJine>
				<ShouldPay ref="shouldPay_div" style="display:none;" :start_date="list.shouldPay.start_date" :end_date="list.shouldPay.end_date" :name="list.shouldPay.name"></ShouldPay>
			</el-row>
    </div>
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
				}
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
