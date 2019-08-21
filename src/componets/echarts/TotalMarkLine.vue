<template>
    <el-col :span="SpanNum">
        <el-card>
            <el-button-group>
                <el-button>天</el-button>
                <el-button>周</el-button>
                <el-button>月</el-button>
            </el-button-group>
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
                    subtext: this.Subtext,
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
          let myChart = this.$echarts.init(document.getElementById(this.EchartId), 'macarons');
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