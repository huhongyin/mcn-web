<template>
    <div>
			<el-row :gutter="10">
				<Total :item="total"></Total>
				<Total :item="total"></Total>
				<Total :item="total"></Total>
				<Total :item="total"></Total>
				<Total :item="total"></Total>
				<Total :item="total"></Total>
			</el-row>
			<el-dialog
				title="提示"
				:visible.sync="dialog.dialogVisible"
				width="80%"
				:before-close="handleClose">
				<el-row>
						<el-col :span="8" v-for="item in dialog.detail" :key="item.label">
								<label v-text="item.label" style="font-weight:bold;"></label>:
								<label v-text="item.value" style="color:red;"></label>
						</el-col>
				</el-row>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialog.dialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="dialog.dialogVisible = false">确 定</el-button>
				</span>
			</el-dialog>
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
				douyin_icon: require('@/assets/imgs/finance/douyin.png'),
				maolirun: '1000万',
				fuchinum: '200万',
				yifuchinum: '100万',
				huoshan: '2万',
				yingke: '3万',
				douyin: '4万',
				dialog: {
					dialogVisible: false,
					detail: [
						{
							label: '月初上传的结算单上的总收入',
							value: '1000万',
						},
						{
							label: '主播分成',
							value: '200万',
						},
						{
							label: '主播底薪',
							value: '200万',
						},
					]
				},
				total: {
					name: '毛利润',
					total_money: '20', //总收入
					total_sign_user_count: '100', //签约主播数量
					total_validate_user_count: '2000', //全部有效主播数量
					time: { //总在线时长
						h: '2310',
						m: '56',
					},
					precent: {
						value: '43.2%',
						type: 0, //增加
						content: '环比 8-16 下降43.2%',
					},
				},
      }
    },
    mounted(){
    },
    methods:{
				showModal(type){
					this.dialog.dialogVisible = true
				},
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
