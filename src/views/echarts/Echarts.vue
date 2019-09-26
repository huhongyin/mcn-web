<template>
    <div>
		<el-row :gutter="20">
			<el-col :span="4">
				<el-select placeholder="筛选子公司" v-model="search.company">
					<el-option v-for="item in companyOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
				</el-select>
			</el-col>
			<el-col :span="4">
				<el-select placeholder="筛选部门" v-model="search.department">
					<el-option v-for="item in departmentOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
				</el-select>
			</el-col>
			<el-col :span="4">
				<el-date-picker v-model="search.date" type="daterange" align="right" unlink-panels range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2"></el-date-picker>
			</el-col>
			<el-rol>
				<el-button type="primary">搜索</el-button>
			</el-rol>
		</el-row>
		<el-row :gutter="20" style="height:382px;">
			<Total :item="total" :company="company_total"></Total>
		</el-row>
		<el-row :gutter="20" type="flex">
			<Plat v-for="(item,key) in plat.list" :key="key" :item="item"></Plat>
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

export default {
  components:{ Plat, MarkLine, BarLabel, Total },
    data(){
      return {
		plat: {
			list: [
                {
                    name: '映客',
					yestoday: {
						value: '1000.9',
						precent: {
							value: '43.2%',
							type: 0, //增加
							content: '环比 8-16 下降43.2%',
						},
					}, //昨日流水
					yestoday_validate_user_count: {
						value: '200',
						precent: {
							value: '43.2%',
							type: 1, //增加
							content: '环比 8-16 上升43.2%',
						},
					}, //昨日有效主播数量
					yestoday_new_user_count: {
						'value': 300,
						precent: {
							value: '43.2%',
							type: 1, //增加
							content: '环比 8-16 上升43.2%',
						},
					}, //昨日新晋主播数量
					time: {
						h: '200', //时
						m: '32', //分
						precent: {
							value: '43.2%',
							type: 1, //增加
							content: '环比 8-16 上升43.2%',
						},
					},
                },
                {
                    name: '抖音',
					yestoday: {
						value: '1000.9',
						precent: {
							value: '43.2%',
							type: 1, //增加
							content: '环比 8-16 上升43.2%',
						},
					}, //昨日流水
					yestoday_validate_user_count: {
						value: '200',
						precent: {
							value: '43.2%',
							type: 1, //增加
							content: '环比 8-16 上升43.2%',
						},
					}, //昨日有效主播数量
					yestoday_new_user_count: {
						'value': 300,
						precent: {
							value: '43.2%',
							type: 1, //增加
							content: '环比 8-16 上升43.2%',
						},
					}, //昨日新晋主播数量
					time: {
						h: '200', //时
						m: '32', //分
						precent: {
							value: '43.2%',
							type: 1, //增加
							content: '环比 8-16 上升43.2%',
						},
					},
                },
                {
                    name: '火山小视频',
					yestoday: {
						value: '1000.9',
						precent: {
							value: '43.2%',
							type: 1, //增加
							content: '环比 8-16 上升43.2%',
						},
					}, //昨日流水
					yestoday_validate_user_count: {
						value: '200',
						precent: {
							value: '43.2%',
							type: 1, //增加
							content: '环比 8-16 上升43.2%',
						},
					}, //昨日有效主播数量
					yestoday_new_user_count: {
						'value': 300,
						precent: {
							value: '43.2%',
							type: 1, //增加
							content: '环比 8-16 上升43.2%',
						},
					}, //昨日新晋主播数量
					time: {
						h: '200', //时
						m: '32', //分
						precent: {
							value: '43.2%',
							type: 1, //增加
							content: '环比 8-16 上升43.2%',
						},
					},
                },
                {
                    name: '陌陌',
					yestoday: {
						value: '1000.9',
						precent: {
							value: '43.2%',
							type: 1, //增加
							content: '环比 8-16 上升43.2%',
						},
					}, //昨日流水
					yestoday_validate_user_count: {
						value: '200',
						precent: {
							value: '43.2%',
							type: 1, //增加
							content: '环比 8-16 上升43.2%',
						},
					}, //昨日有效主播数量
					yestoday_new_user_count: {
						'value': 300,
						precent: {
							value: '43.2%',
							type: 1, //增加
							content: '环比 8-16 上升43.2%',
						},
					}, //昨日新晋主播数量
					time: {
						h: '200', //时
						m: '32', //分
						precent: {
							value: '43.2%',
							type: 1, //增加
							content: '环比 8-16 上升43.2%',
						},
					},
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
						smooth: true,
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
						smooth: true,
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
						smooth: true,
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
						smooth: true,
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
				smooth: true,
				data:[111, 222, 12, 333, 444, 555, 666, 777, 888, 999, 100, 256, 532, 532],
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
				smooth: true,
				data:[1561, 999, 12, 888, 747, 666, 777, 547, 658, 516, 568, 5478, 658, 254],
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
				smooth: true,
				data:[1561, 412, 12, 5235, 747, 4523, 523, 547, 658, 516, 568, 5478, 658, 6346],
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
				smooth: true,
				data:[1561, 124, 12, 43, 747, 4523, 124, 547, 658, 516, 568, 5478, 658, 6346],
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
		total: {
			name: '您的数据统计',
			total_money: '20', //总收入
			total_sign_user_count: '100', //签约主播数量
			total_validate_user_count: '2000', //全部有效主播数量
			time: { //总在线时长
				h: '2310',
				m: '56',
			}
		},
		company_total: {
			name: '公司数据统计',
			total_money: '100', //总收入
			total_sign_user_count: '1000', //签约主播数量
			total_validate_user_count: '900', //全部有效主播数量
			time: { //总在线时长
				h: '2310',
				m: '56',
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
		]
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
