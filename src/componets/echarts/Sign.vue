<template>
    <el-card class="plat">
        <div class="plat-row">
            <span class="name" v-text="item.name"></span>
        </div>
        <div class="plat-row">
            <span class="plat-row-title">总流水</span>
            <div class="inline">
                <a class="plat-row-a" href="javascript:void(0)" @click="showTotalMoney('签约主播流水')"><span v-text="item.total_money" class="plat-row-detail"></span></a>
                <span class="plat-row-unit">万</span>
            </div>
        </div>
        <div class="plat-row">
            <span class="plat-row-title">签约主播数量</span>
            <div class="inline">
                <a class="plat-row-a" href="javascript:void(0)" @click="showSignActor('签约主播数量')"><span v-text="item.total_sign_user_count" class="plat-row-detail"></span></a>
                <span class="plat-row-unit">人</span>
            </div>
        </div>
        <div class="plat-row">
            <span class="plat-row-title">有效主播数量</span>
            <div class="inline">
                <a class="plat-row-a" href="javascript:void(0)" @click="showEffectiveActor('有效主播数量')"><span v-text="item.total_validate_user_count" class="plat-row-detail"></span></a>
                <span class="plat-row-unit">人</span>
            </div>
        </div>
        <div class="plat-row">
            <span class="plat-row-title">在线总时长</span>
            <div class="inline">
                <a class="plat-row-a" href="javascript:void(0)" @click="showOnLine('在线总时长')"><span v-text="item.time.h" class="plat-row-detail"></span></a>
                <span class="plat-row-unit">时</span>
                <a class="plat-row-a" href="javascript:void(0)" @click="showOnLine('在线总时长')"><span v-text="item.time.m" class="plat-row-detail"></span></a>
                <span class="plat-row-unit">分</span>
            </div>
        </div>
    </el-card>
</template>
<script>
//分渠道
export default {
    components: {},
    props: [
        "item"
    ],
    data(){
        return {}
    },
    methods:{
        showTotalMoney(title){
            //查看流水
            this.$router.push({
                path: 'signTotalMoney',
                query: {
                    title: title
                }
            })
        },
        showSignActor(title){
            //签约主播数量
            this.$router.push({
                path: 'signActorCount',
                query: {
                    title: title
                }
            })
        },
        showEffectiveActor(title){
            //有效主播数量
            this.$router.push({
                path: 'effectiveActorCount',
                query: {
                    title: title
                }
            })
        },
        showOnLine(title){
            //在线总时长
            this.$router.push({
                path: 'onLineList',
                query: {
                    title: title
                }
            })
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