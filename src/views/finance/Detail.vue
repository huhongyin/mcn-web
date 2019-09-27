<template>
    <div>
			<el-row :gutter="10">
				<el-col :span="8" class="maoli">
						<!-- <i class="el-icon-s-cooperation" style="font-size: 40px;"></i> -->
						<el-col :span="3" :offset="3">
							<i class="el-icon-s-cooperation" style="font-size:40px;"></i>
						</el-col>
						<el-col :span="9" style="height: 40px;">
							<label class="finance-header-label">毛利润</label>
						</el-col>
						<el-col :span="9" style="height: 40px;">
							<label class="maolirun-num" v-text="maolirun" @click="showModal('maoli')" style="cursor:pointer;"></label>
						</el-col>
				</el-col>
				<el-col :span="8" class="maoli">
						<!-- <i class="el-icon-s-cooperation" style="font-size: 40px;"></i> -->
						<el-col :span="3" :offset="3">
							<i class="el-icon-s-management" style="font-size:40px;"></i>
						</el-col>
						<el-col :span="9" style="height: 40px;">
							<label class="finance-header-label">扶持金额</label>
						</el-col>
						<el-col :span="9" style="height: 40px;">
							<label class="fuchi-num" v-text="fuchinum" @click="showModal('fuchi')" style="cursor:pointer;"></label>
						</el-col>
				</el-col>
				<el-col :span="8" class="maoli">
						<!-- <i class="el-icon-s-cooperation" style="font-size: 40px;"></i> -->
						<el-col :span="3" :offset="3">
							<i class="el-icon-s-ticket" style="font-size:40px;"></i>
						</el-col>
						<el-col :span="9" style="height: 40px;">
							<label class="finance-header-label">已扶持金额</label>
						</el-col>
						<el-col :span="9" style="height: 40px;">
							<label class="yifuchi-num" v-text="yifuchinum" @click="showModal('yifuchi')" style="cursor:pointer;"></label>
						</el-col>
				</el-col>
			</el-row>
			<el-divider></el-divider>

			<el-row :gutter="10">
				<el-col :span="8" class="maoli">
						<!-- <i class="el-icon-s-cooperation" style="font-size: 40px;"></i> -->
						<el-col :span="3" :offset="3">
							<i class="el-icon-s-cooperation" style="font-size:40px;"></i>
						</el-col>
						<el-col :span="9" style="height: 40px;">
							<label class="finance-header-label">映客</label>
						</el-col>
						<el-col :span="9" style="height: 40px;">
							<label class="maolirun-num" v-text="yingke" @click="showModal('yingke')" style="cursor:pointer;"></label>
						</el-col>
				</el-col>
				<el-col :span="8" class="maoli">
						<!-- <i class="el-icon-s-cooperation" style="font-size: 40px;"></i> -->
						<el-col :span="3" :offset="3">
							<i class="el-icon-s-management" style="font-size:40px;"></i>
						</el-col>
						<el-col :span="9" style="height: 40px;">
							<label class="finance-header-label">火山</label>
						</el-col>
						<el-col :span="9" style="height: 40px;">
							<label class="fuchi-num" v-text="huoshan" @click="showModal('huoshan')" style="cursor:pointer;"></label>
						</el-col>
				</el-col>
				<el-col :span="8" class="maoli">
						<!-- <i class="el-icon-s-cooperation" style="font-size: 40px;"></i> -->
						<el-col :span="3" :offset="3">
							<!-- <i class="el-icon-s-ticket" style="font-size:40px;"></i> -->
							<img :src="douyin_icon" width="40" height="40"/>
						</el-col>
						<el-col :span="9" style="height: 40px;">
							<label class="finance-header-label">抖音</label>
						</el-col>
						<el-col :span="9" style="height: 40px;">
							<label class="yifuchi-num" v-text="douyin" @click="showModal('douyin')" style="cursor:pointer;"></label>
						</el-col>
				</el-col>
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
				}
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
