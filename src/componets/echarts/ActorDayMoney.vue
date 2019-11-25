<template>
    <div style="height:100%;">
        <!-- 近三十日主播日均收入 -->
        <el-col :span="24">
            <el-card>
                <div class="marl-line-div" id="mark-line-money"></div>
            </el-card>
        </el-col>
        <!-- 直播日均时长 -->
        <el-col :span="24" style="margin-top:1rem;">
            <el-card>
                <div class="marl-line-div" id="mark-line-time"></div>
            </el-card>
        </el-col>
    </div>
</template>
<script>
//分渠道
import { get } from '@/api/index.js'
import operateApi from '@/api/operate.js'
export default {
    components: {},
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
                series: [
                    {
                        name:'主播日均收益',
                        type:'line',
                        smooth: true,
                        data:[],
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
                    }
                ]
            },
            lineTimeOptions: {
                title: {
                    text: "主播日均时长",
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
                        formatter: '{value} ' + '分钟'
                    }
                },
                series: [
                    {
                        name:'主播日均时长',
                        type:'line',
                        smooth: true,
                        data:[],
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
                    }
                ]
            },
        }
    },
    methods: {
        getData(){
            get(operateApi.day).then((res) => {
                this.lineOptions.xAxis.data = res.data.dates
                this.lineTimeOptions.xAxis.data = res.data.dates
                this.lineOptions.series[0].data = res.data.money
                this.lineTimeOptions.series[0].data = res.data.time
                let myChart = this.$echarts.init(document.getElementById("mark-line-money"), 'macarons');
                myChart.setOption(this.lineOptions);
                let myChart2 = this.$echarts.init(document.getElementById("mark-line-time"), 'macarons');
                myChart2.setOption(this.lineTimeOptions);
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