<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <el-input class="card-header-input" v-model="search.keywords" placeholder="关键词"></el-input>
            <el-select class="offset-left-30" v-model="search.plat" placeholder="平台">
                <el-option
                v-for="item in search.plats"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
            <el-button class="offset-left-30 btn-search" @click="getData">搜索</el-button>
        </div>
        <el-table stripe ref="multipleTable" :data="list" tooltip-effect="dark" :header-cell-style="{background:'#EFF5F9'}" @selection-change="handleSelectionChange">
                <!-- <el-table-column type="selection"></el-table-column> -->
                <el-table-column label="序号" type="index"></el-table-column>
                <el-table-column label="主播姓名" prop="username"></el-table-column>
                <el-table-column label="所属平台" prop="plat.name"></el-table-column>
                <el-table-column label="计算规则" prop="cal_fun"></el-table-column>
                <!-- <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="showDetail(scope.row.id)" type="text" size="small">查看</el-button>
                    </template>
                </el-table-column> -->
            </el-table>
            <el-pagination class="right offset-top-31 offset-bottom-46" background layout="prev, pager, next" :page-count="totalPage" @current-change="handleCurrentChange"></el-pagination>
            <el-dialog title="反馈建议详情" :visible.sync="detail.show" center>
                <div class="center">
                    <el-row>
                        <el-col :span="8">
                            <label class="user-detail-text">账号：<span class="user-detail-value">123132474</span></label>
                        </el-col>
                        <el-col :span="8">
                            <label class="user-detail-text">姓名：<span class="user-detail-value">张三</span></label>
                        </el-col>
                        <el-col :span="8">
                            <label class="user-detail-text">QQ：<span class="user-detail-value">1468018315</span></label>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <label class="user-detail-text">问题描述：<span class="user-detail-value" v-text="detail.info.desc"></span></label>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <label class="user-detail-text right">反馈时间：2019-08-09 22:00</label>
                        </el-col>
                    </el-row>
                </div>

                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="detail.show = false">保 存</el-button>
                    <el-button @click="detail.show = false">取 消</el-button>
                </span>
            </el-dialog>
    </el-card>
</template>

<script>
import { mkdir } from 'fs';
import { get, post} from '@/api/index.js';
import userApi from '@/api/user.js';
export default {
    created(){
        this.getData()
    },
    data(){
        return {
            search:{
                plats:[
                    {
                        id: 1,
                        name: "抖音"
                    },
                    {
                        id: 2,
                        name: "陌陌"
                    },
                    {
                        id: 3,
                        name: "火山小视频"
                    },
                ],
                keywords: "",
                plat: "",
            },
            size : 10,
            current : 1,
            totalPage: 0,
            total: 0,
            list: [
                {
                    id : 1,
                    username: '张晓晓', //主播名
                    plat: {
                        id: 1,
                        name: '抖音'
                    },
                    cal_fun: "底薪+月总流水*0.6", //收益公式
                },
                {
                    id : 2,
                    username: '张晓晓', //主播名
                    plat: {
                        id: 1,
                        name: '陌陌'
                    },
                    cal_fun: "底薪+月总流水*0.8", //收益公式
                },
                {
                    id : 3,
                    username: '刘', //主播名
                    plat: {
                        id: 1,
                        name: '火山小视频'
                    },
                    cal_fun: "底薪+月总流水*0.7", //收益公式
                },
            ],
            multipleSelection : [],

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
            detail: {
                show: false,
                info: {
                    name : '张三',
                    account: "11111",
                    contract: "1245145",
                    desc : "问题描述问题描述问题描述问题描述问题描述问题描述问题描述问题描述问题描述问题描述问题描述问题描述问题描述",
                    time: "2019-08-09 22:00"
                }
            }
        }
    },
    methods:{
        toggleSelection(rows) {
            if (rows) {
            rows.forEach(row => {
                this.$refs.multipleTable.toggleRowSelection(row);
            });
            } else {
            this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        getData(){
            // var params = { current : this.current, size : this.size, buyerEmail : this.search.keywords }
            // var that = this
            // post(userApi.phoneUserList, params)
            // .then(function(res){
            //     that.list = res.data.list
            //     that.total = res.data.total
            //     that.current = res.data.pageNum
            //     that.totalPage = res.data.totalPage
            // }).catch(function(err){
            //     console.log('error')
            //     console.log(err)
            // })
        },
        showDetail(id){
            this.detail.show = true
            // var params = { id: id }
            // var that = this
            // post(userApi.phoneUserDetail, params).then(function(res){
            //     console.log(res)
            //     that.detail = res.data
            //     that.centerDialogVisible = true
            //     console.log(that.detail)
            // }).catch(function(err){
            //     console.log('error')
            //     console.log(err)
            // })
            // console.log(this.detail)
        },
        handleCurrentChange(val){
            this.current = val
            this.getData()
        },
        handleCheckAllChange(val) {
            this.addUserDialog.form.rules = val ? this.ruleList : []
            this.addUserDialog.isIndeterminate = false
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.addUserDialog.checkAll = checkedCount === this.ruleList.length;
            this.addUserDialog.isIndeterminate = checkedCount > 0 && checkedCount < this.ruleList.length;
        }
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
.undeal{
    margin-right: 1em;
}
</style>
