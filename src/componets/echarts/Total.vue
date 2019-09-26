<template>
    <div style="height:100%;">
        <el-col :span="6"  style="height:100%;">
            <SignItem echart-id="sign_total" :item="item" :SpanNum="12"></SignItem>
        </el-col>
        <el-col :span="6"  style="height:100%;">
            <SignItem echart-id="company_sign_total" :item="company" :SpanNum="12"></SignItem>
        </el-col>
        <TotalMarkLine echart-id="mark-line-total_all_plat" formatter="元" text="过去30日总营收" subtext="" :data="select_date" :series="series" :SpanNum="12"></TotalMarkLine>
    </div>
</template>
<script>
//分渠道
import TotalMarkLine from '@/componets/echarts/TotalMarkLine.vue'
import SignItem from '@/componets/echarts/Sign.vue'
export default {
    components: {TotalMarkLine, SignItem},
    props: [
        "item",
        "company"
    ],
    data(){
        return {
            select_date: [
			'07-19',
			'07-20',
			'07-21',
			'07-22',
			'07-23',
			'07-24',
			'07-25',
			'07-26',
			'07-27',
			'07-28',
			'07-29',
			'07-30',
			'07-31',
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
			'08-15',
			'08-16',
			'08-17',
        ],
        series: [
			{
				name:'近三十日总收益',
				type:'line',
				smooth: true,
				data:[111, 222, 12, 333, 444, 555, 666, 777, 888, 999, 100, 256, 532, 532,111, 222, 12, 333, 444, 555, 666, 777, 888, 999, 100, 256, 532, 532,541,534],
				
			},
		],
        }
    }
}
</script>
<style scoped>
.plat{
    border:3px solid transparent;
    height:98%;
}
.plat:hover{
    border: 3px solid #2DCA93;
}
.name{
    font-weight: 700;
    font-size: 20px;
    color:#5F6E82;
}
.plat-row{
    margin-top: 2%;
}
.plat-row-a{
    text-decoration: none;
}
.plat-row-title{
    color: #8492A6;
}
.plat-row-detail{
    color:#475669;
    font-weight: 500;
    font-size: 20px;
}
.plat-row-unit{
    font-size: 12px;
    color: #8492A6;
}
.el-row {
    margin-bottom: 20px;
}
.inline{
    display:inline;
    margin-left: .3rem;
}
.color-red{
    color: #FC6772;
}
.color-green{
    color: green;
}
</style>