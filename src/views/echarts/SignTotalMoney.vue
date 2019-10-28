<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span v-text="title"></span>
        </div>
        <el-table show-summary :summary-method="getSummaries" id="managementTable" stripe ref="multipleTable" :data="list" tooltip-effect="dark" :header-cell-style="{background:'#EFF5F9'}">
                <el-table-column fixed label="主播实名" prop="name"></el-table-column>
                <el-table-column fixed label="主播昵称" prop="nickname"></el-table-column>
                <el-table-column fixed label="电话" prop="phone"></el-table-column>
                <el-table-column label="平台" prop="plat_name"></el-table-column>
                <el-table-column label="总流水(元)">
                    <template slot-scope="scope">
                        <template v-if="scope.row.plat_id == 1">
                            {{ (scope.row.douyin_live_total_money == null) ? 0 : scope.row.douyin_live_total_money }}
                        </template>
                        <template v-else-if="scope.row.plat_id == 2">
                            {{ (scope.row.huoshan_live_total_money == null) ? 0 : scope.row.huoshan_live_total_money }}
                        </template>
                        <template v-else-if="scope.row.plat_id == 3">
                            {{ (scope.row.momo_live_total_money == null) ? 0 : scope.row.momo_live_total_money }}
                        </template>
                        <template v-else-if="scope.row.plat_id == 4">
                            {{ (scope.row.yinke_live_total_money == null) ? 0 : scope.row.yinke_live_total_money }}
                        </template>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination class="right offset-top-31 offset-bottom-46" background layout="prev, pager, next" :page-count="totalPage" @current-change="handleCurrentChange"></el-pagination>
    </el-card>
</template>

<script>
import { fPost, get} from '@/api/index.js';
import echartApi from '@/api/echarts.js';
import XLSX from 'xlsx';
export default {
    created(){
        this.getData()
    },
    data(){
        return {
            title: '',
            totalPage: 0,
            current: 1,
            list: [],
            total: {},
        }
    },
    created(){
        this.title = this.$route.query.title
        this.getData()
    }, 
    methods:{
        getData(){
            var params = { page: this.current}
            get(echartApi.signActorMoney, params).then((res) => {
                this.totalPage = res.data.list.last_page
                this.list = res.data.list.data
                this.total = res.data.total
            })
        },
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '合计';
                    return;
                }else if(index == 4){
                    sums[index] = this.total.money
                }else{
                    sums[index] = ''
                }
            });

            return sums;
        },
        handleCurrentChange(page){
            this.current = page
            this.getData()
        }
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
