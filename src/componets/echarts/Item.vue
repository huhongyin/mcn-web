<template>
    <el-col class="" :span="6">
        <el-card class="plat">
            <div class="plat-row">
                <span class="name" v-text="item.name"></span>
            </div>
            <div class="plat-row">
                <span class="plat-row-title">本月总营收</span>
                <div>
                    <a class="plat-row-a" href="javascript:void(0)"><span v-text="item.month" class="plat-row-detail"></span></a>
                    <span class="plat-row-unit">元</span>
                </div>
            </div>
            <div class="plat-row">
                <span class="plat-row-title">昨日总营收</span>
                <div>
                    <a class="plat-row-a" href="javascript:void(0)"><span v-text="item.yestoday" class="plat-row-detail"></span></a>
                    <span class="plat-row-unit">元</span>
                </div>
            </div>
            <div class="plat-row">
                <span class="plat-row-title">昨日新晋主播</span>
                <div>
                    <a class="plat-row-a" href="javascript:void(0)"><span v-text="item.new_users" class="plat-row-detail"></span></a>
                    <span class="plat-row-unit">人</span>
                </div>
            </div>
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
    font-weight: 500;
    font-size: 14px;
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
    font-size: 30px;
}
.plat-row-unit{
    font-size: 12px;
    color: #8492A6;
}
.el-row {
    margin-bottom: 20px;
}
</style>