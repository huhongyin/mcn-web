<template>
    <div style="height:100%;">
        <!-- 近三十日主播日均收入 -->
        <!-- <TotalMarkLine v-if="money_dates.length > 0" echart-id="mark-line-money" formatter="元" type="operate" :text="money.title" subtext="" :data="money_dates" :series="money_series" :SpanNum="12"></TotalMarkLine> -->
        <el-col :span="SpanNum">
            <el-card>
                <div class="marl-line-div" :id="EchartId"></div>
            </el-card>
        </el-col>
        <!-- 近三十日主播日均时长 -->
        <TotalMarkLine echart-id="mark-line-time" formatter="分" type="operate" :text="time.title" subtext="" :data="time.select_date" :series="money.series" :SpanNum="12"></TotalMarkLine>
    </div>
</template>
<script>
//分渠道
import TotalMarkLine from '@/componets/echarts/TotalMarkLine.vue'
import { get } from '@/api/index.js'
import operateApi from '@/api/operate.js'
export default {
    components: {TotalMarkLine},
    props: [
        "money",
        "time"
    ],
    created(){
        this.getData()
    },
    data(){
        return {
            lineOptions: {
                title: {
                    text: "主播日均收益",
                    subtext: '',
                    textStyle: {
                        color: 'rgb(46, 56, 74)'
                    },
                },
                textStyle: {
                    color: 'rgb(46, 56, 74)'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:['总营收']
                },
                toolbox: {
                    show: false,
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        dataView: {readOnly: false},
                        magicType: {type: ['line', 'bar']},
                        restore: {},
                        saveAsImage: {}
                    }
                },
                xAxis:  {
                    type: 'category',
                    boundaryGap: false,
                    data: []
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} ' + '元'
                    }
                },
                series: []
            },
        }
    },
    methods: {
        getData(){
            get(operateApi.day).then((res) => {
                this.lineOptions.xAxis.data = res.data.dates
                this.lineOptions.series = res.data.money
                console.log(this.lineOptions)
                console.log(document.getElementById("mark-line-money"))
                let myChart = this.$echarts.init(document.getElementById("mark-line-money"), 'macarons');
                myChart.setOption(this.lineOptions);
            })
        }
    }
}
</script>
<style scoped>
    .marl-line-div{
        height: 300px;
    }
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