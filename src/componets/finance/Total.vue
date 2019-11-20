<template>
    <el-col :span="6"  style="height:100%;margin-bottom:10px;">
        <!-- 以组为单位 -->
        <Item :id="item" :search="search" :ref="item" @click.native="showList(item)" echart-id="sign_total" :item="item" :SpanNum="12"></Item>
    </el-col>
</template>
<script>
//分渠道
import Item from '@/componets/finance/Item.vue'
export default {
    components: {Item},
    props: [
        "item",
        "search",
    ],
    data(){
        return {}
    },
    methods:{
        showList(item){
            this.removeAllItemClass()
            let obj = this.$refs[item.type].$el
            if(obj.className.indexOf("plat-active") > -1){
                obj.classList.remove('plat-active')
            }else{
                obj.classList.add('plat-active')
                this.$emit('showTable', {type: item.type})
            }
        },
        removeAllItemClass(){
            this.$emit('removeAllItemClass')
        }
    }
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
.plat-active{
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