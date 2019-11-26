<template>
    <el-card class="plat" v-if="item">
        <div class="plat-row">
            <span class="name" v-text="item.title"></span>
        </div>
        <div class="plat-row">
            <span class="plat-row-title">总流水</span>
            <div class="inline">
                <a class="plat-row-a" href="javascript:void(0)" @click="showTotalMoney('签约主播流水')"><span v-text="item.total_money" class="plat-row-detail"></span></a>
                <span class="plat-row-unit">万</span>
            </div>
        </div>
        <div class="plat-row">
            <span class="plat-row-title">运营主播数量</span>
            <div class="inline">
                <a class="plat-row-a" href="javascript:void(0)" @click="showSignActor('运营主播')"><span v-text="item.total_sign_user_count" class="plat-row-detail"></span></a>
                <span class="plat-row-unit">人</span>
            </div>
        </div>
        <div class="plat-row">
            <span class="plat-row-title">新增开播数量</span>
            <div class="inline">
                <a class="plat-row-a" href="javascript:void(0)" @click="showEffectiveActor('新增开播主播')"><span v-text="item.start_count" class="plat-row-detail"></span></a>
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
import { get } from '@/api/index.js'
import operateApi from '@/api/operate.js'
export default {
    components: {},
    data(){
        return {
            item: {
                title: "",
                total_money: 0,
                total_sign_user_count: 0,
                time: {
                    h: 0,
                    m: 0,
                }
            },
            search: {}
        }
    },
    created(){

    },
    methods:{
        searchData(searchData){
            this.search = searchData
            this.getData()
        },
        getData(){
            get(operateApi.groupCal, this.search).then((res) => {
                this.item = res.data.list
            })
        },
        showTotalMoney(title){
            //查看流水
            this.search.title = title
            this.search.start_date = this.search.date[0]
            this.search.end_date = this.search.date[1]
            this.$router.push({
                path: '/operatesignTotalMoney',
                query: this.search
            })
        },
        showSignActor(title){
            //签约主播数量
            this.search.title = title
            this.search.start_date = this.search.date[0]
            this.search.end_date = this.search.date[1]
            this.$router.push({
                path: '/operatesignActorCount',
                query: this.search
            })
        },
        showEffectiveActor(title){
            //有效主播数量
            this.search.title = title
            this.search.start_date = this.search.date[0]
            this.search.end_date = this.search.date[1]
            this.$router.push({
                path: '/operateeffectiveActorCount',
                query: this.search
            })
        },
        showOnLine(title){
            //在线总时长
            this.search.title = title
            this.search.start_date = this.search.date[0]
            this.search.end_date = this.search.date[1]
            this.$router.push({
                path: '/operateonLineList',
                query: this.search
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