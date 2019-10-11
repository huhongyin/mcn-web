<template>
    <el-card class="plat">
        <div class="plat-row">
            <span class="name" v-text="item.name"></span>
        </div>
        <div class="plat-row">
            <span class="plat-row-title" v-text="start_date+'一'+end_date"></span>
            <div class="inline">
                <a class="plat-row-a" href="javascript:void(0)"><span class="plat-row-detail"></span></a>
                <span class="plat-row-unit"></span>
            </div>
        </div>
        <div class="plat-row">
            <span class="plat-row-title"></span>
            <div class="inline">
                <a class="plat-row-a" href="javascript:void(0)"><span class="plat-row-detail"></span></a>
                <span class="plat-row-unit"></span>
            </div>
        </div>
        <div class="plat-row">
            <span class="plat-row-title"></span>
            <div class="inline">
                <a class="plat-row-a" @click="goTo(item)" href="javascript:void(0)"><span style="font-size:40px;color:#475669;" v-text="item.total_money" class="plat-row-detail"></span></a>
                <span class="plat-row-unit">万</span>
            </div>
        </div>
        <div class="plat-row">
            <span class="plat-row-title"></span>
            <div class="inline">
                <span class="plat-row-title right">环比
                    <el-tooltip v-if="item.precent.type==0" effect="dark" :content="item.precent.content" placement="top">
                        <icon class="el-icon-caret-bottom color-red">{{ item.precent.value }}</icon>
                    </el-tooltip>
                    
                    <el-tooltip v-else-if="item.precent.type==1" effect="dark" :content="item.precent.content" placement="top">
                        <icon class="el-icon-caret-top color-green">{{ item.precent.value }}</icon>
                    </el-tooltip>
                </span>
                <span class="plat-row-unit"></span>
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
        return {
            start_date: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
            end_date: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
        }
    },
    methods:{
        goTo(item){
            this.$router.push({
                path: item.url,
                query:{

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