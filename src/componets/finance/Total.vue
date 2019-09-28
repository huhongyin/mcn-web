<template>
    <el-col :span="6"  style="height:100%;margin-bottom:10px;">
        <!-- 以组为单位 -->
        <Item echart-id="sign_total" :item="item" :SpanNum="12"></Item>
    </el-col>
</template>
<script>
//分渠道
import Item from '@/componets/finance/Item.vue'
export default {
    components: {Item},
    props: [
        "item",
    ],
    data(){
        return {}
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