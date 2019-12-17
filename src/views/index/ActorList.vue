<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span v-text="title"></span>
            <!-- <span style="color:red;">(共{{ total }}人)</span> -->
        </div>
        <el-table v-if="type!='department_700'" stripe :data="list" tooltip-effect="dark" :header-cell-style="{background:'#EFF5F9'}">
            <el-table-column fixed label="主播实名" prop="name"></el-table-column>
            <el-table-column fixed label="主播昵称" prop="nickname"></el-table-column>
            <el-table-column label="平台" prop="plat.name"></el-table-column>
        </el-table>
        <el-table v-else stripe :data="list" tooltip-effect="dark" :header-cell-style="{background:'#EFF5F9'}">
            <el-table-column fixed label="部门名称" prop="name"></el-table-column>
            <el-table-column fixed label="签约人数" prop="total_sign_count"></el-table-column>
            <el-table-column label="目标人数" prop="aim"></el-table-column>
        </el-table>
        <el-pagination class="right offset-top-31 offset-bottom-46" background :total="total" layout="total, prev, pager, next"></el-pagination>
    </el-card>
</template>

<script>
export default {
    created(){
        this.getData()
    },
    data(){
        return {
            total: 3,
            title: '',
            type: '',
            totalPage: 1,
            list_department:[
                {
                    name: '签约部一',   //真实姓名
                    total_sign_count: 10,
                    aim: 20,
                },
                {
                    name: '签约部二',   //真实姓名
                    total_sign_count: 10,
                    aim: 20,
                },
                {
                    name: '签约部三',   //真实姓名
                    total_sign_count: 10,
                    aim: 20,
                },
            ],
            list_actor: [
                {
                    name: '张三',   //真实姓名
                    nickname: '小花儿',
                    plat: {
                        name: '抖音', //所属平台
                    }
                },
                {
                    name: '李四',   //真实姓名
                    nickname: '小鱼儿',
                    plat: {
                        name: '火山', //所属平台
                    }
                },
                {
                    name: '王二',   //真实姓名
                    nickname: '小花儿',
                    plat: {
                        name: '抖音', //所属平台
                    }
                },
            ],
            list: [],
        }
    },
    created(){
        this.title = this.$route.query.title
        this.type = this.$route.query.type
        this.getData()
    }, 
    watch: {
        //监听相同路由下参数变化的时候，从而实现异步刷新
        '$route'(to,from){
            this.title = this.$route.query.title
            this.type = this.$route.query.type
        },
    },
    methods:{
        
        getData(){
            switch(this.type){
                case 'department_700':
                        this.list = this.list_department
                    break;
                default:
                        this.list = this.list_actor
                    break;
            }
            // var params = { page: this.current}
            // var that = this
            // get(userApi.list, params)
            //     .then(function(res){
            //         that.list = res.data.list.data
            //         that.total = res.data.list.total
            //         that.current = res.data.list.current_page
            //         // that.totalPage = res.data.totalPage
            //     })
        },
    }
}
</script>

<style lang='less' scoped>
.el-dialog--center .el-dialog__body{
    text-align: center;
}
.color-red:hover{
    color:red;
}
.color-blue:hover{
    color: #409EFF;
}
.el-row{
    margin-bottom: 20px;
}
</style>
