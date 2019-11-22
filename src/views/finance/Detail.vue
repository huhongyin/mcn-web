<template>
			<el-card>
				 <div slot="header" class="clearfix">
					<span></span>
					<el-row :gutter="10">
						<el-col :span="6">
							<el-date-picker style="max-width:100%;" value-format="yyyy-MM" format="yyyy-MM" v-model="search.date" type="month" range-separator="至" placeholder="选择月份"></el-date-picker>
						</el-col>
						<el-col :span="2">
							<el-button type="primary" @click="searchData">搜索</el-button>
						</el-col>
					</el-row>
				</div>
				<el-row :gutter="10" style="margin-top:1rem;">
					<Total :search="search" :ref="'p_' + item" v-for="(item,key) in types" :key="key" :item="item" @removeAllItemClass="removeAllItemClass" @showTable="showTable"></Total>
				</el-row>
				<el-row>
					<el-row :ref="item + '_div'" v-for="(item,key) in types" :key="key" style="display:none;">
						<TableItem :ref="item + '_table'" :item="item"></TableItem>
					</el-row>
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
import TableItem from '@/views/finance/TableItem.vue'

export default {
  components:{ Total, ActorDayMoney, TableItem},
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
					date: '',
				},
				list: {},
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
						let obj = this.$refs[key][0].$el.style.display = 'none'
					})
					let obj = this.$refs[params.type + "_div"][0].$el.style.display = 'block'
				},
				getDate(){
					var date = new Date()
					var yestoday = date.getTime() - 24*60*60*1000
					var date2 = new Date()
					date2.setTime(yestoday)
					this.search.date = date2.getFullYear() + '-' + (date2.getMonth() + 1)
				},
				searchData(){
					this.types.forEach((element) => {
						let ref = 'p_' + element
						let obj = this.$refs[ref][0]
						obj.searchData(element, this.search)
					})
					this.types.forEach((element) => {
						let ref = element + '_table'
						let obj = this.$refs[ref][0]
						obj.searchData(element, this.search)
					})
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
