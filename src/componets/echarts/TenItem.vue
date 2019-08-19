<template>
    <el-col :span="SpanNum">
        <el-card>
            <div class="marl-line-div" :id="EchartId"></div>
        </el-card>
    </el-col>
</template>
<script>
export default {
    props: [
        "EchartId",
        "Text",
        "Subtext",
        "SpanNum",
        "Legend",
        "Ydata",
        "Series",
    ],
    data(){
        return {
            options: {
                title: {
                    text: this.Text,
                    subtext: this.subtext,
                    textStyle: {
                        color: 'rgb(46, 56, 74)'
                    },
                },
                textStyle: {
                    color: 'rgb(46, 56, 74)'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: this.Legend,
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: 'category',
                    data: this.Ydata
                },
                series: this.Series
            }

        }
    },
    mounted(){
      this.initMarkLine()
    },
    methods:{
        initMarkLine(){
            let myChart = this.$echarts.init(document.getElementById(this.EchartId), 'macarons');
            myChart.setOption(this.options);
        }
    }
}
</script>
<style scoped>
    .marl-line-div{
        height: 300px;
    }
</style>