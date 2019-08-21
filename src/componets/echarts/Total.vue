<template>
    <div style="height:100%;">
        <el-col :span="12"  style="height:100%;">
            <el-card class="plat">
                <div class="plat-row">
                    <span class="name" v-text="item.name"></span>
                </div>
                <div class="plat-row">
                    <span class="plat-row-title">总流水</span>
                    <div class="inline">
                        <a class="plat-row-a" href="javascript:void(0)"><span v-text="item.total_money" class="plat-row-detail"></span></a>
                        <span class="plat-row-unit">万</span>
                    </div>
                </div>
                <div class="plat-row">
                    <span class="plat-row-title">有效主播数量</span>
                    <div class="inline">
                        <a class="plat-row-a" href="javascript:void(0)"><span v-text="item.total_validate_user_count" class="plat-row-detail"></span></a>
                        <span class="plat-row-unit">人</span>
                    </div>
                </div>
                <div class="plat-row">
                    <span class="plat-row-title">在线总时长</span>
                    <div class="inline">
                        <a class="plat-row-a" href="javascript:void(0)"><span v-text="item.time.h" class="plat-row-detail"></span></a>
                        <span class="plat-row-unit">时</span>
                        <a class="plat-row-a" href="javascript:void(0)"><span v-text="item.time.m" class="plat-row-detail"></span></a>
                        <span class="plat-row-unit">分</span>
                    </div>
                </div>
            </el-card>
        </el-col>
        <TotalMarkLine echart-id="mark-line-total_all_plat" text="过去30日总营收" subtext="" :data="select_date" :series="series" :SpanNum="12"></TotalMarkLine>
    </div>
</template>
<script>
//分渠道
import TotalMarkLine from '@/componets/echarts/TotalMarkLine.vue'
export default {
    components: {TotalMarkLine},
    props: [
        "item"
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