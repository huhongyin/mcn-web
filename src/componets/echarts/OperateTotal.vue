<template>
    <div style="height:100%;">
        <el-col :span="12"  style="height:100%;">
            <!-- 以组为单位 -->
            <SignItem ref="group_sign" echart-id="sign_total" :SpanNum="12"></SignItem>
        </el-col>
        <el-col :span="12"  style="height:100%;">
            <!-- 以组为单位的部门 -->
            <SignItem ref="group_department" echart-id="department_sign_total" :item="department" :SpanNum="12"></SignItem>
        </el-col>
    </div>
</template>
<script>
//分渠道
import SignItem from '@/componets/echarts/Sign.vue'
export default {
    components: {SignItem},
    props: [
        "company",
        "department"
    ],
    data(){
        return {}
    },
    methods: {
        searchData(searchData){
            this.$refs['group_sign'].searchData(searchData)
            this.$refs['group_department'].searchData(searchData)
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