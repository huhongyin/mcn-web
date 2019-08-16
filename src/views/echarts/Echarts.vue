<template>
    <div>
		<el-row :gutter="20" type="flex">
			<Plat v-for="(item,key) in plat.list" :key="key" :item="item"></Plat>
		</el-row>
		<el-row :gutter="20" type="flex">
			<MarkLine echart-id="mark-line-total" text="过去30日总营收" subtext="" :data="select_date" :series="series" :span="24"></MarkLine>
		</el-row>
		<el-row :gutter="20">
			<MarkLine v-for="(item,key) in mark_line_list" :key="key" :echart-id="'mark-line-total_' + key" :text="item.name + '过去30日总营收'" subtext="" :data="item.select_date" :series="item.series" :span-num="12"></MarkLine>
		</el-row>
		<el-row :gutter="20">
			<BarLabel v-for="(item,key) in ten.list" :key="key" :echart-id="'bar-line-total_' + key" :text="item.title" :Series="item.series" :Ydata="item.ydata" :legend="item.legend" subtext="" :span-num="12"></BarLabel>
		</el-row>
		<el-row :gutter="20">
			<BarLabel v-for="(item,key) in users.list" :key="key" :echart-id="'user-bar-line-total_' + key" :text="item.title" :Series="item.series" :Ydata="item.ydata" :legend="item.legend" subtext="" :span-num="12"></BarLabel>
		</el-row>
    </div>
</template>

<script>

import Plat from '@/componets/echarts/Item.vue'
import MarkLine from '@/componets/echarts/LineMarke.vue'
import BarLabel from '@/componets/echarts/TenItem.vue'

export default {
  components:{ Plat, MarkLine, BarLabel },
    data(){
      return {
		plat: {
			list: [
                {
                    name: '映客',
                    month: '200.67万', //本月总营收
                    yestoday: '1000.9', //昨日营收
                    new_users: '200', //昨日新晋主播
                },
                {
                    name: '抖音',
                    month: '200.67万', //本月总营收
                    yestoday: '1000.9', //昨日营收
                    new_users: '200', //昨日新晋主播
                },
                {
                    name: '火山小视频',
                    month: '200.67万', //本月总营收
                    yestoday: '1000.9', //昨日营收
                    new_users: '200', //昨日新晋主播
                },
                {
                    name: '陌陌',
                    month: '200.67万', //本月总营收
                    yestoday: '1000.9', //昨日营收
                    new_users: '200', //昨日新晋主播
                },
            ]
		},
		//各渠道折线图
		mark_line_list:[
			{
				select_date: [
					'08-01',
					'08-02',
					'08-03',
					'08-04',
					'08-05',
					'08-06',
					'08-07',
					'08-08',
					'08-09',
					'08-10',
					'08-11',
					'08-12',
					'08-13',
					'08-14',
				],
				name: '映客',
				series: [
					{
						name:'映客',
						type:'line',
						data:[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
						markPoint: {
							data: [
								{type: 'max', name: '最大值'},
								{type: 'min', name: '最小值'}
							]
						},
					}
				]
			},
			{
				select_date: [
					'08-01',
					'08-02',
					'08-03',
					'08-04',
					'08-05',
					'08-06',
					'08-07',
					'08-08',
					'08-09',
					'08-10',
					'08-11',
					'08-12',
					'08-13',
					'08-14',
				],
				name: '抖音',
				series: [
					{
						name:'抖音',
						type:'line',
						data:[14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
						markPoint: {
							data: [
								{type: 'max', name: '最大值'},
								{type: 'min', name: '最小值'}
							]
						},
					}
				]
			},
			{
				select_date: [
					'08-01',
					'08-02',
					'08-03',
					'08-04',
					'08-05',
					'08-06',
					'08-07',
					'08-08',
					'08-09',
					'08-10',
					'08-11',
					'08-12',
					'08-13',
					'08-14',
				],
				name: '火山小视频',
				series: [
					{
						name:'火山小视频',
						type:'line',
						data:[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
						markPoint: {
							data: [
								{type: 'max', name: '最大值'},
								{type: 'min', name: '最小值'}
							]
						},
					}
				]
			},
			{
				select_date: [
					'08-01',
					'08-02',
					'08-03',
					'08-04',
					'08-05',
					'08-06',
					'08-07',
					'08-08',
					'08-09',
					'08-10',
					'08-11',
					'08-12',
					'08-13',
					'08-14',
				],
				name: '陌陌',
				series: [
					{
						name:'陌陌',
						type:'line',
						data:[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
						markPoint: {
							data: [
								{type: 'max', name: '最大值'},
								{type: 'min', name: '最小值'}
							]
						},
					}
				]
			},
		],
        select_date: [
			'08-01',
			'08-02',
			'08-03',
			'08-04',
			'08-05',
			'08-06',
			'08-07',
			'08-08',
			'08-09',
			'08-10',
			'08-11',
			'08-12',
			'08-13',
			'08-14',
        ],
        series: [
			{
				name:'映客',
				type:'line',
				data:[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
				markPoint: {
					data: [
						{type: 'max', name: '最大值'},
						{type: 'min', name: '最小值'}
					]
				},
			},
			{
				name:'抖音',
				type:'line',
				data:[14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
				markPoint: {
					data: [
						{type: 'max', name: '最大值'},
						{type: 'min', name: '最小值'}
					]
				},
			},
			{
				name:'火山小视频',
				type:'line',
				data:[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
				markPoint: {
					data: [
						{type: 'max', name: '最大值'},
						{type: 'min', name: '最小值'}
					]
				},
			},
			{
				name:'陌陌',
				type:'line',
				data:[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
				markPoint: {
					data: [
						{type: 'max', name: '最大值'},
						{type: 'min', name: '最小值'}
					]
				},
			},
		],
		//分公司本月收入top10&昨日top10
		ten: {
			list: [
				{
					title: '分公司本月收入TOP10',
					legend: {
						data: ['本月']
					},
					ydata: ['抖音','映客','陌陌','火山小视频'],
					series: [
						{
							name: '本月',
							type: 'bar',
							data: [18203, 23489, 29034, 104970]
						},
					]
				},
				{
					title: '分公司昨日收入TOP10',
					legend: {
						data: ['昨日']
					},
					ydata: ['抖音','映客','陌陌','火山小视频'],
					series: [
						{
							name: '昨日',
							type: 'bar',
							data: [19325, 23438, 31000, 12159]
						}
					]
				}
			]
		},
		users: {
			list: [
				{
					title: '艺人本月收入TOP10',
					legend: {
						data: ['本月收入']
					},
					ydata: ['张晴晴','赵莉莉','小红','周晓琳'],
					series: [
						{
							name: '本月收入',
							type: 'bar',
							data: [9999, 13000, 15000, 20001]
						},
					]
				},
				{
					title: '艺人昨日收入TOP10',
					legend: {
						data: ['昨日收入']
					},
					ydata: ['胡寒寒','林莉莉','王晓晓','刘芳芳'],
					series: [
						{
							name: '昨日收入',
							type: 'bar',
							data: [666, 777, 888, 1000]
						}
					]
				}
			]
		},
      }
    },
    mounted(){
    },
    methods:{
    },
    created(){
      
    }
}
</script>

<style scoped>
    .el-row {
        margin-bottom: 20px;
    }
	.el-col-12{
		margin-bottom: 20px;
	}
</style>
