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
        "Data",
        "Series",
        "SpanNum"
    ],
    data(){
        return {
            lineOptions: {
                title: {
                    text: this.Text,
                    subtext: this.Subtext
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:['总营收']
                },
                toolbox: {
                    show: true,
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
                    data: this.Data
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} 元'
                    }
                },
                series: this.Series
            },

        }
    },
    mounted(){
      this.initMarkLine()
    },
    methods:{
        initMarkLine(){
          let myChart = this.$echarts.init(document.getElementById(this.EchartId));
          myChart.setOption(this.lineOptions);
        }
    }
}
</script>
<style scoped>
    .marl-line-div{
        height: 300px;
    }
</style>