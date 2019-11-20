<template>
    <el-card class="plat">
        <div class="plat-row">
            <span class="name" v-text="data.name"></span>
        </div>
        <div class="plat-row">
            <span class="plat-row-title" v-text="data.start_date+'一'+data.end_date"></span>
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
                <a class="plat-row-a" @click="goTo(data)" href="javascript:void(0)"><span style="font-size:40px;color:#475669;" v-text="data.total_money" class="plat-row-detail"></span></a>
                <span class="plat-row-unit" v-text="data.util"></span>
            </div>
        </div>
        <div class="plat-row">
            <span class="plat-row-title"></span>
            <div class="inline">
                <span class="plat-row-title right">环比
                    <el-tooltip v-if="data.precent.type==0" effect="dark" :content="data.precent.content" placement="top">
                        <i class="el-icon-caret-bottom color-red">{{ data.precent.value }}</i>
                    </el-tooltip>
                    
                    <el-tooltip v-else-if="data.precent.type==1" effect="dark" :content="data.precent.content" placement="top">
                        <i class="el-icon-caret-top color-green">{{ data.precent.value }}</i>
                    </el-tooltip>
                </span>
                <span class="plat-row-unit"></span>
            </div>
        </div>
    </el-card>
</template>
<script>
//分渠道
import financeApi from '@/api/finance.js'
import { get } from '@/api/index.js'
export default {
    components: {},
    props: [
        "item",
        "search",
    ],
    data(){
        return {
            data: {
                name: '毛利润',
                total_money: '20', //总收入
                start_date: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
                end_date: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
                precent: {
                    value: '43.2%',
                    type: 1, //增加
                    content: '环比 8-16 上升43.2%',
                },
                url: '/maolirun',
                type: 'total',
            }
        }
    },
    created(){
        this.getData()
    },
    methods:{
        goTo(item){
            this.$router.push({
                path: item.url,
                query:{
                    start_date: item.start_date,
                    end_date: item.end_date,
                    title: item.name,
                }
            })
        },
        getData(){
            let url = financeApi.list + this.item
            get(url, this.search).then((res) => {
                console.log(res)
                this.data = res.data.info
            })
        },
    },
}
</script>
<style scoped>
.plat{
    border:3px solid transparent;
    height:98%;
}
/* .plat:hover{
    border: 3px solid #2DCA93;
} */
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