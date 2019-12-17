<template>
    <div style="height:100%;">
        <!-- <el-col :span="12"  style="height:100%;">
            <SignItem echart-id="sign_total" :item="item" :SpanNum="12"></SignItem>
        </el-col> -->
        <TotalMarkLine echart-id="mark-line-total_all_plat" formatter="元" text="过去30日总营收" subtext="" :data="select_date" :series="series" :SpanNum="24"></TotalMarkLine>
    </div>
</template>
<script>
//分渠道
import TotalMarkLine from '@/componets/echarts/TotalMarkLine.vue'
export default {
    components: {TotalMarkLine},
    props: [
        "item",
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
                    data:[111, 121, 131, 141, 151, 161, 171, 181, 191, 181, 171, 161, 151, 141,131, 121, 111, 121, 131, 141, 151, 161, 171, 181, 191, 181, 171, 161,151,141],
                    itemStyle : {
                        normal: 
                        {
                            color:'rgb(58,160,255)',
                            borderWidth: 4,
                            lineStyle:{
                                color: "rgb(58,160,255)"
                            },
                        }
                    }
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