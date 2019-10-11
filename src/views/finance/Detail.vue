<template>
    <div>
			<el-row :gutter="10">
				<Total :item="total"></Total>
				<Total :item="fuchi"></Total>
				<Total :item="yifuchijine"></Total>
				<Total :item="month_should_pay"></Total>
			</el-row>
    </div>
</template>

<script>

import Total from '@/componets/finance/Total.vue'
import ActorDayMoney from '@/componets/echarts/ActorDayMoney.vue'
import { fork } from 'child_process'

export default {
  components:{ Total, ActorDayMoney },
    data(){
      return {
				total: {
					name: '毛利润',
					total_money: '20', //总收入
					precent: {
						value: '43.2%',
						type: 1, //增加
						content: '环比 8-16 上升43.2%',
					},
					url: '/maolirun',
				},
				fuchi: {
					name: '扶持金额',
					total_money: '1', //总收入
					precent: {
						value: '43.2%',
						type: 0, //增加
						content: '环比 8-16 下降43.2%',
					},
					url: '/fuchijine',
				},
				yifuchijine: {
					name: '已扶持金额',
					total_money: '0.3', //总收入
					precent: {
						value: '43.2%',
						type: 0, //增加
						content: '环比 8-16 下降43.2%',
					},
					url: '/yifuchijine',
				},
				month_should_pay: {
					name: '应付主播收益',
					total_money: '0.78', //总收入
					precent: {
						value: '43.2%',
						type: 0, //增加
						content: '环比 8-16 下降43.2%',
					},
					url: '/shoulPay',
				},
      }
    },
    mounted(){
    },
    methods:{
				handleClose(){

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
