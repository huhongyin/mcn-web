<template>
    <el-col class="" :span="6" v-show="showPlat">
        <el-card class="plat">
            <div class="plat-row">
                <span class="name" v-text="platData.name"></span>
            </div>
            <div class="plat-row" v-if="platData.yestoday">
                <span class="plat-row-title">昨日流水</span>
                <div class="inline">
                    <a class="plat-row-a" @click="yestodayMoney(platData)" href="javascript:void(0)"><span v-text="platData.yestoday.value" class="plat-row-detail"></span></a>
                    <span class="plat-row-unit">万</span>
                    <span class="plat-row-title right">环比
                        <el-tooltip v-if="platData.yestoday.precent.type==0" effect="dark" :content="platData.yestoday.precent.content" placement="top">
                            <i class="el-icon-caret-bottom color-red">{{ platData.yestoday.precent.value }}</i>
                        </el-tooltip>
                        
                        <el-tooltip v-else-if="platData.yestoday.precent.type==1" effect="dark" :content="platData.yestoday.precent.content" placement="top">
                            <i class="el-icon-caret-top color-green">{{ platData.yestoday.precent.value }}</i>
                        </el-tooltip>
                    </span>
                </div>
            </div>
            <div class="plat-row">
                <span class="plat-row-title">昨日有效主播数量</span>
                <div class="inline">
                    <a class="plat-row-a" @click="yestodayEffectiveActor(platData)" href="javascript:void(0)"><span v-text="platData.yestoday_validate_user_count.value" class="plat-row-detail"></span></a>
                    <span class="plat-row-unit">人</span>
                    <span class="plat-row-title right">环比
                        <el-tooltip v-if="platData.yestoday_validate_user_count.precent.type==0" effect="dark" :content="platData.yestoday_validate_user_count.precent.content" placement="top">
                            <i class="el-icon-caret-bottom color-red">{{ platData.yestoday_validate_user_count.precent.value }}</i>
                        </el-tooltip>
                        
                        <el-tooltip v-else-if="platData.yestoday_validate_user_count.precent.type==1" effect="dark" :content="platData.yestoday_validate_user_count.precent.content" placement="top">
                            <i class="el-icon-caret-top color-green">{{ platData.yestoday_validate_user_count.precent.value }}</i>
                        </el-tooltip>
                    </span>
                </div>
            </div>
            <div class="plat-row">
                <span class="plat-row-title">昨日新晋主播数量</span>
                <div class="inline">
                    <a class="plat-row-a" @click="yestodayNewActor(platData)" href="javascript:void(0)"><span v-text="platData.yestoday_new_user_count.value" class="plat-row-detail"></span></a>
                    <span class="plat-row-unit">人</span>
                    <span class="plat-row-title right">环比
                        <el-tooltip v-if="platData.yestoday_new_user_count.precent.type==0" effect="dark" :content="platData.yestoday_new_user_count.precent.content" placement="top">
                            <i class="el-icon-caret-bottom color-red">{{ platData.yestoday_new_user_count.precent.value }}</i>
                        </el-tooltip>
                        
                        <el-tooltip v-else-if="platData.yestoday_new_user_count.precent.type==1" effect="dark" :content="platData.yestoday_new_user_count.precent.content" placement="top">
                            <i class="el-icon-caret-top color-green">{{ platData.yestoday_new_user_count.precent.value }}</i>
                        </el-tooltip>
                    </span>
                </div>
            </div>
            <div class="plat-row">
                <span class="plat-row-title">昨日总时长</span>
                <div class="inline">
                    <a class="plat-row-a" @click="yestodayOnLineActor(platData)" href="javascript:void(0)"><span v-text="platData.time.h" class="plat-row-detail"></span></a>
                    <span class="plat-row-unit">时</span>
                    <a class="plat-row-a" @click="yestodayOnLineActor(platData)" href="javascript:void(0)"><span v-text="platData.time.m" class="plat-row-detail"></span></a>
                    <span class="plat-row-unit">分</span>
                    <span class="plat-row-title right">环比
                        <el-tooltip v-if="platData.time.precent.type==0" effect="dark" :content="platData.time.precent.content" placement="top">
                            <i class="el-icon-caret-bottom color-red">{{ platData.time.precent.value }}</i>
                        </el-tooltip>
                        
                        <el-tooltip v-else-if="platData.time.precent.type==1" effect="dark" :content="platData.time.precent.content" placement="top">
                            <i class="el-icon-caret-top color-green">{{ platData.time.precent.value }}</i>
                        </el-tooltip>
                    </span>
                </div>
            </div>
        </el-card>
    </el-col>
</template>
<script>
//分渠道
import platsApi from '@/api/plats.js'
import { get } from '@/api/index.js'
export default {
    props: [
        "item"
    ],
    data(){
        return {
            showPlat: false,
            platData: {},
            search: {
                company: "",
            }
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.$on('childMethod', function () {
                console.log('监听成功')
            })
        })

    },
    created(){
        this.getPlatDetail()
    },
    methods: {
        callMethod(company) {
            this.company = company
            this.getPlatDetail()
        },
        getPlatDetail(){
            get(platsApi.platYestoday + this.item.id, this.search).then((res) => {
                this.platData = res.data.list
                this.showPlat = true
            })
        },
        yestodayMoney(item){
            //昨日流水记录
            let day1 = new Date();
            day1.setTime(day1.getTime()-24*60*60*1000);
            let yestodayDate = day1.getFullYear()+"-" + (day1.getMonth()+1) + "-" + day1.getDate();
            this.$router.push({
                path: '/yestodayMoney',
                query: {
                    title: item.name + '流水记录',
                    date: yestodayDate,
                    plat_id: this.item.id,
                }
            })
        },
        yestodayEffectiveActor(item){
            //昨日有效主播
            let day1 = new Date();
            day1.setTime(day1.getTime()-24*60*60*1000);
            let yestodayDate = day1.getFullYear()+"-" + (day1.getMonth()+1) + "-" + day1.getDate();
            this.$router.push({
                path: '/yestodayEffectiveActor',
                query: {
                    title: item.name + '有效主播记录',
                    date: yestodayDate,
                    plat_id: this.item.id,
                }
            })
        },
        yestodayNewActor(item){
            //昨日新晋主播
            // let day1 = new Date();
            // day1.setTime(day1.getTime()-24*60*60*1000);
            // let yestodayDate = day1.getFullYear()+"-" + (day1.getMonth()+1) + "-" + day1.getDate();
            // this.$router.push({
            //     path: '/yestodayNewActor',
            //     query: {
            //         title: item.name + '新晋主播记录',
            //         date: yestodayDate,
            //     }
            // })
        },
        yestodayOnLineActor(item){
            //昨日在线时长
            let day1 = new Date();
            day1.setTime(day1.getTime()-24*60*60*1000);
            let yestodayDate = day1.getFullYear()+"-" + (day1.getMonth()+1) + "-" + day1.getDate();
            this.$router.push({
                path: '/yestodayOnLineList',
                query: {
                    title: item.name + '在线时长',
                    date: yestodayDate,
                    plat_id: this.item.id,
                }
            })
        },
    }
}
</script>
<style scoped>
.plat{
    border:3px solid transparent;
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
    font-size: 0.8vw;
}
.plat-row-detail{
    color:#475669;
    font-weight: 500;
    font-size: 1vw;
}
.plat-row-unit{
    font-size: 0.8vw;
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