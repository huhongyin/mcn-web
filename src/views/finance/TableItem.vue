<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span v-text="title"></span>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane v-for="(platInfo, key) in list" :key="key" :label="platInfo.plat.name" :name="'tab-pane-' + key">
                <el-table :data="platInfo.table_body.data" :header-cell-style="{background:'#EFF5F9'}">
                    <el-table-column v-for="(header,k) in platInfo.table_header" :key="k" :label="header.label" :prop="header.prop"></el-table-column>
                </el-table>
                <el-pagination style="float:right;" background layout="prev, pager, next" :page-count="platInfo.table_body.last_page" @current-change="changePage"></el-pagination>
            </el-tab-pane>
        </el-tabs>
    </el-card>
</template>

<script>
import { get } from '@/api/index.js';
import financeApi from '@/api/finance.js';

export default {
    created(){
        this.getData()
    },
    props: [
        'item',
    ],
    data(){
        return {
            search: {
                page: 1,
                date: '',
            },
            title: '',
            activeName: '',
            totalPage: 1,
            list: [],
        }
    },
    created(){
        this.getData()
    }, 
    methods:{
        getData(type){
            type = typeof type == 'undefined' ? '' : type;
            let url = financeApi.list + this.item + '/list';
            get(url, this.search).then((res) => {
                this.title = res.data.name
                this.list = res.data.list
                if(type == ''){
                    this.activeName = 'tab-pane-0'
                }
            })
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        changePage(val){
            this.search.page = val;
            this.getData('page');
        },
        searchData(type, search){
            this.search.date = search.date
            this.search.page = 1
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
