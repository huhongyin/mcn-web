<template>
    <div>
        <el-card class="box-card">
            <el-input class="card-header-input" placeholder="关键词" v-model="search.keywords"></el-input>
            <el-select class="offset-left-30" v-model="search.status" placeholder="状态">
                <el-option
                v-for="item in search.statusList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-date-picker
                class="offset-left-30"
                v-model="search.select_date"
                type="datetimerange"
                range-separator="-"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                :picker-options="pickerOptions">
            </el-date-picker>
            <el-button class="offset-left-30 btn-search" @click="getData">搜索</el-button>
            <el-button class="right" type="primary" @click="add(0)">新增</el-button>
            <el-button class="right" @click="deleteData">删除</el-button>
        </el-card>
        <div v-infinite-scroll="loadMore" :infinite-scroll-disabled="!hasMore" infinite-scroll-immediate="false" infinite-scroll-distanc="0">
            <BannerItem v-for="(info,key) in list" float-style="left" :info="info" :key="key" :key-value="key" v-on:listenTochildEvent="addDeleteItem"/>
        </div>
        <div>
            <el-col :span="24" class="loadMore">
                <p v-if="loading">加载中...</p>
                <p v-if="!hasMore">没有更多了</p>
            </el-col>
        </div>
        <el-dialog :title="addDialog.addTitle" :visible.sync="addDialog.show" center>
            <el-form :model="addDialog.form">
                <el-form-item label="图标" :label-width="addDialog.formLabelWidth">
                    <Upload content-title="上传Banner" content-size="690*320" image-url="" v-on:listenTochildEvent="uploadSuccess" :upload-url="this.$selfProps.uploadHost+uploadUrl" :data="{openId:'1111'}"/>
                </el-form-item>
                <el-form-item label="名称" :label-width="addDialog.formLabelWidth">
                    <el-input v-model="addDialog.form.bannerName" placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item label="类型" :label-width="addDialog.formLabelWidth">
                <el-select style="width:100%;" v-model="addDialog.form.type" placeholder="请选择类型">
                    <el-option v-for="(item,key) in addDialog.types" :label="item.name" :value="item.value" :key="key"></el-option>
                </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="doAdd">保 存</el-button>
                <el-button @click="addDialog.show = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
    
</template>

<script>
import { mkdir } from 'fs';
import { fPost, get, post} from '@/api/index.js';
import bannerApi from '@/api/banner.js';
import BannerItem from '@/componets/banners/Item.vue';
import Upload from '@/componets/upload/Upload';
export default {
    components:{
        BannerItem, Upload
    },
    mounted(){
    },
    created(){
        this.getData()
    },
    data(){
        return {
            search:{
                statusList:[
                    {
                        value: 0,
                        label: "禁用"
                    },
                    {
                        value: 1,
                        label: "启用"
                    },
                ],
                keywords: "",
                status: "",
                select_date: "",
            },
            addDialog:{
                addTitle : '新增Banner',
                show: false,
                form:{
                },
                types: [
                    {
                        name: '个人中心',
                        value: 1,
                    },
                    {
                        name: '首页',
                        value: 2,
                    },
                ],
                formLabelWidth: '130px',
                checkAll: false,
                isIndeterminate: true,
            },
            size : 8,
            current : 1,
            totalPage: 0,
            total: 0,
            list: [],
            hasMore: true,
            loading: false,
            uploadUrl: bannerApi.upload,
            selectIds: [],
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
        }
    },
    methods:{
        getData(){
            if(this.hasMore){
                var params = { current : this.current, size : this.size, bannerName : this.search.keywords, begin: this.search.select_date[0], end: this.search.select_date[1], isEnabled: this.search.status }
                var that = this
                fPost(bannerApi.list, params)
                    .then(function(res){
                        that.$nextTick(function(){
                            if(res.data.list.length == 0){
                                that.hasMore = false
                            }
                            that.list = that.list.concat(res.data.list)
                            that.total = res.data.total
                            that.current = res.data.pageNum
                            that.totalPage = res.data.totalPage
                            that.loading = false
                        })
                    })
            }
        },
        add(id){
            this.addDialog.form = {}
            this.addDialog.show = true
        },
        deleteData(){
            let that = this
            this.$nextTick(function(){
                post(bannerApi.delete, this.selectIds).then((res) => {
                    that.$message({
                        type: "success",
                        message: res.data,
                        duration: 1000,
                    })                
                    that.current = 1
                    that.list = []
                    that.getData()
                })
            })
        },
        handleCurrentChange(val){
            this.current = val
            this.getData()
        },
        loadMore(){
            if(this.loading || !this.hasMore){
                return false
            }
            this.$nextTick(function(){
                this.loading = true
                this.current ++
                this.getData()
            })
        },
        uploadSuccess(url){
            this.addDialog.form.bannerImageUrl = url
        },
        doAdd(){
            let that = this
            this.$nextTick(function(){
                fPost(bannerApi.add, this.addDialog.form).then((res) => {

                    that.addDialog.show = false
                    that.$message({
                        type: "success",
                        message: res.data,
                        duration: 1000,
                    })
                    that.current = 1
                    that.list = []
                    that.getData()
                })
            })
            // that.getData()
        },
        addDeleteItem(checked, id){
            if(checked){
                this.selectIds.push(id)
            }else{
                this.selectIds.splice(this.selectIds.indexOf(id), 1)
            }
        },
    }
}
</script>

<style lang='less' scoped>
// .el-dialog--center .el-dialog__body{
//     text-align: center;
// }
.el-form > .add-user-dialog-label > label{
    color: black;
    font-weight: 400;
}
.el-form-item > label{
    font-weight: 500;
    color: black;
}
.loadMore{
    margin-top: 5%;
    text-align: center;
}
</style>
