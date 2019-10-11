<template>
    <el-col class="" :span="6">
        <el-card class="plat">
            <div class="plat-row">
                <span class="name" v-text="item.name"></span>
            </div>
            <div class="plat-row">
                <span class="plat-row-title">昨日流水</span>
                <div class="inline">
                    <a class="plat-row-a" @click="yestodayMoney(item)" href="javascript:void(0)"><span v-text="item.yestoday.value" class="plat-row-detail"></span></a>
                    <span class="plat-row-unit">万</span>
                    <span class="plat-row-title right">环比
                        <el-tooltip v-if="item.yestoday.precent.type==0" effect="dark" :content="item.yestoday.precent.content" placement="top">
                            <icon class="el-icon-caret-bottom color-red">{{ item.yestoday.precent.value }}</icon>
                        </el-tooltip>
                        
                        <el-tooltip v-else-if="item.yestoday.precent.type==1" effect="dark" :content="item.yestoday.precent.content" placement="top">
                            <icon class="el-icon-caret-top color-green">{{ item.yestoday.precent.value }}</icon>
                        </el-tooltip>
                    </span>
                </div>
            </div>
            <div class="plat-row">
                <span class="plat-row-title">昨日有效主播数量</span>
                <div class="inline">
                    <a class="plat-row-a" @click="yestodayEffectiveActor(item)" href="javascript:void(0)"><span v-text="item.yestoday_validate_user_count.value" class="plat-row-detail"></span></a>
                    <span class="plat-row-unit">人</span>
                    <span class="plat-row-title right">环比
                        <el-tooltip v-if="item.yestoday_validate_user_count.precent.type==0" effect="dark" :content="item.yestoday_validate_user_count.precent.content" placement="top">
                            <icon class="el-icon-caret-bottom color-red">{{ item.yestoday_validate_user_count.precent.value }}</icon>
                        </el-tooltip>
                        
                        <el-tooltip v-else-if="item.yestoday_validate_user_count.precent.type==1" effect="dark" :content="item.yestoday_validate_user_count.precent.content" placement="top">
                            <icon class="el-icon-caret-top color-green">{{ item.yestoday_validate_user_count.precent.value }}</icon>
                        </el-tooltip>
                    </span>
                </div>
            </div>
            <div class="plat-row">
                <span class="plat-row-title">昨日新晋主播数量</span>
                <div class="inline">
                    <a class="plat-row-a" @click="yestodayNewActor(item)" href="javascript:void(0)"><span v-text="item.yestoday_new_user_count.value" class="plat-row-detail"></span></a>
                    <span class="plat-row-unit">人</span>
                    <span class="plat-row-title right">环比
                        <el-tooltip v-if="item.yestoday_new_user_count.precent.type==0" effect="dark" :content="item.yestoday_new_user_count.precent.content" placement="top">
                            <icon class="el-icon-caret-bottom color-red">{{ item.yestoday_new_user_count.precent.value }}</icon>
                        </el-tooltip>
                        
                        <el-tooltip v-else-if="item.yestoday_new_user_count.precent.type==1" effect="dark" :content="item.yestoday_new_user_count.precent.content" placement="top">
                            <icon class="el-icon-caret-top color-green">{{ item.yestoday_new_user_count.precent.value }}</icon>
                        </el-tooltip>
                    </span>
                </div>
            </div>
            <div class="plat-row">
                <span class="plat-row-title">昨日总时长</span>
                <div class="inline">
                    <a class="plat-row-a" @click="yestodayOnLineActor(item)" href="javascript:void(0)"><span v-text="item.time.h" class="plat-row-detail"></span></a>
                    <span class="plat-row-unit">时</span>
                    <a class="plat-row-a" @click="yestodayOnLineActor(item)" href="javascript:void(0)"><span v-text="item.time.m" class="plat-row-detail"></span></a>
                    <span class="plat-row-unit">分</span>
                    <span class="plat-row-title right">环比
                        <el-tooltip v-if="item.time.precent.type==0" effect="dark" :content="item.time.precent.content" placement="top">
                            <icon class="el-icon-caret-bottom color-red">{{ item.time.precent.value }}</icon>
                        </el-tooltip>
                        
                        <el-tooltip v-else-if="item.time.precent.type==1" effect="dark" :content="item.time.precent.content" placement="top">
                            <icon class="el-icon-caret-top color-green">{{ item.time.precent.value }}</icon>
                        </el-tooltip>
                    </span>
                </div>
            </div>
            <!-- <div class="plat-row"> -->
                
                <!-- <div class="inline">
                    
                </div> -->
            <!-- </div> -->
        </el-card>
    </el-col>
</template>
<script>
//分渠道
export default {
    props: [
        "item"
    ],
    data(){
        return {
            
        }
    },
    methods: {
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
                }
            })
        },
        yestodayNewActor(item){
            //昨日新晋主播
            let day1 = new Date();
            day1.setTime(day1.getTime()-24*60*60*1000);
            let yestodayDate = day1.getFullYear()+"-" + (day1.getMonth()+1) + "-" + day1.getDate();
            this.$router.push({
                path: '/yestodayNewActor',
                query: {
                    title: item.name + '新晋主播记录',
                    date: yestodayDate,
                }
            })
        },
        yestodayOnLineActor(item){
            //昨日新晋主播
            let day1 = new Date();
            day1.setTime(day1.getTime()-24*60*60*1000);
            let yestodayDate = day1.getFullYear()+"-" + (day1.getMonth()+1) + "-" + day1.getDate();
            this.$router.push({
                path: '/yestodayOnLineList',
                query: {
                    title: item.name + '在线时长',
                    date: yestodayDate,
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