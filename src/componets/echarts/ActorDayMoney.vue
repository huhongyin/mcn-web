<template>
    <div style="height:100%;">
        <!-- 近三十日主播日均收入 -->
        <TotalMarkLine echart-id="mark-line-money" formatter="元" type="operate" :text="money.title" subtext="" :data="money.select_date" :series="money.series" :SpanNum="12"></TotalMarkLine>
        
        <!-- 近三十日主播日均时长 -->
        <TotalMarkLine echart-id="mark-line-time" formatter="分" type="operate" :text="time.title" subtext="" :data="time.select_date" :series="money.series" :SpanNum="12"></TotalMarkLine>
    </div>
</template>
<script>
//分渠道
import TotalMarkLine from '@/componets/echarts/TotalMarkLine.vue'
export default {
    components: {TotalMarkLine},
    props: [
        "money",
        "time"
    ],
    data(){
        return {

        }
    },
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