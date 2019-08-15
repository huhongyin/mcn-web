<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <el-input class="card-header-input" placeholder="账号" v-model="keywords"></el-input>
            <el-date-picker
                class="offset-left-30"
                v-model="select_date"
                type="datetimerange"
                range-separator="-"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions">
            </el-date-picker>
            <el-button class="offset-left-30 btn-search" @click="getData">搜索</el-button>
            <el-button class="right" @click="unFrozen('checkbox', 1)">解冻</el-button>
            <el-button class="right" @click="frozen('checkbox', 0)">冻结</el-button>
        </div>
        <el-table stripe ref="multipleTable" :data="list" tooltip-effect="dark" :header-cell-style="{background:'#EFF5F9'}" @selection-change="handleSelectionChange">
                <el-table-column type="selection"></el-table-column>
                <el-table-column label="序号" type="index"></el-table-column>
                <el-table-column label="姓名" prop="buyerName"></el-table-column>
                <el-table-column label="邮箱" prop="buyerEmail"></el-table-column>
                <el-table-column label="地区" prop="district"></el-table-column>
                <el-table-column label="类型"><span>手机用户</span></el-table-column>
                <el-table-column label="注册时间" prop="createTime"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="userDetail(scope.row.id)" type="text" size="small">详情</el-button>
                        <template v-if="scope.row.isActive==1">
                            <el-button type="text color-blue" size="small" @click="frozen('sigle', scope.row.id)">冻结</el-button>
                        </template>
                        <template v-else>
                            <el-button class="color-red" type="text" size="small" @click="unFrozen('sigle', scope.row.id)">解冻</el-button>
                        </template>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination class="right offset-top-31 offset-bottom-46" background layout="prev, pager, next" :page-count="totalPage" @current-change="handleCurrentChange"></el-pagination>
            <el-dialog title="手机用户详情" :visible.sync="centerDialogVisible" width="50%" center>
                <div class="center">
                    <div>
                        <span class="user-detail-text">姓名：</span><span class="user-detail-value" v-text="detail.buyerName"></span>
                    </div>
                    <div>
                        <span class="user-detail-text">邮箱：</span><span class="user-detail-value" v-text="detail.buyerEmail"></span>
                    </div>
                    <div>
                        <span class="user-detail-text">类型：</span><span class="user-detail-value">手机用户</span>
                    </div>
                    <div>
                        <span class="user-detail-text">地区：</span><span class="user-detail-value" v-text="detail.district"></span>
                    </div>
                    <div>
                        <span class="user-detail-text">状态：</span>
                        <span class="user-detail-value">
                            <template v-if="detail.isActive==1">
                                正常
                            </template>
                            <template v-else>
                                已冻结
                            </template>
                        </span>
                    </div>
                    <div>
                        <span class="user-detail-text">注册时间：</span><span class="user-detail-value" v-text="detail.createTime"></span>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="centerDialogVisible = false">保 存</el-button>
                    <el-button @click="centerDialogVisible = false">取 消</el-button>
                </span>
                
            </el-dialog>
    </el-card>
</template>

<script>
import { mkdir } from 'fs';
import { fPost, get, post} from '@/api/index.js';
import userApi from '@/api/user.js';
export default {
    created(){
        this.getData()
    },
    data(){
        return {
            centerDialogVisible : false,
            keywords : "",
            select_date: "",
            size : 10,
            current : 1,
            totalPage: 0,
            total: 0,
            list: [
                // {
                //     id : 0,
                //     buyerName: '',
                //     buyerEmail : '',
                //     district : '',
                //     userType : '',
                //     createTime: 0,
                //     isActive : 1
                // },
            ],
            detail: {
                buyerEmail : "",
                buyerName : "",
                createTime : "",
                district : "",
                isActive : 0,
                id : 0,
            },
            multipleSelection : [],
            selectedIDs: [],
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
            let ids = []
            this.multipleSelection.map((item)=> {
                ids.push(item.id)
            })
            this.selectedIDs = ids
        },
        frozen(type, id){
            if(type == 'checkbox'){
                id = this.selectedIDs
            }else{
                id = [id]
            }
            // var params = { "ids" : id }
            var params = id
            var that = this
            post(userApi.frozenUser, params).then(function(res){
                if(res.code == 200){
                    that.getData()
                }
            })
        },
        unFrozen(type, id){
            if(type == 'checkbox'){
                id = this.selectedIDs
            }else{
                id = [id]
            }
            // var params = { "ids" : id }
            var params = id
            var that = this
            post(userApi.unFrozenUser, params).then(function(res){
                if(res.code == 200){
                    that.getData()
                }
            })
        },
        getData(){
            var params = { current : this.current, size : this.size, buyerEmail : this.keywords, begin : this.select_date[0], end : this.select_date[1] }
            var that = this
            post(userApi.phoneUserList, params)
            .then(function(res){
                that.list = res.data.list
                that.total = res.data.total
                that.current = res.data.pageNum
                that.totalPage = res.data.totalPage
            }).catch(function(err){
                console.log('error')
                console.log(err)
            })
        },
        userDetail(id){
            var params = { id: id }
            var that = this
            fPost(userApi.phoneUserDetail, params).then(function(res){
                that.detail = res.data
                that.centerDialogVisible = true
            }).catch(function(err){
                console.log('error')
                console.log(err)
            })
        },
        handleCurrentChange(val){
            this.current = val
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
</style>
