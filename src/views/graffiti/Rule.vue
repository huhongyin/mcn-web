<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <el-select v-model="search.type" placeholder="场景类型">
                <el-option
                v-for="item in search.types"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-button class="offset-left-30 btn-search" @click="getData">搜索</el-button>
            <el-button class="right" type="primary" @click="add(0)">新增</el-button>
            <el-button class="right" @click="">删除</el-button>
        </div>
        <el-table stripe ref="multipleTable" :data="list" tooltip-effect="dark" :header-cell-style="{background:'#EFF5F9'}" @selection-change="handleSelectionChange">
                <el-table-column type="selection"></el-table-column>
                <el-table-column label="序号" type="index"></el-table-column>
                <el-table-column label="场景类型" prop="type"></el-table-column>
                <el-table-column label="更新时间" prop="update_time"></el-table-column>
                <el-table-column label="备注" prop="remark"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="add(scope.row.id)" type="text" size="small">编辑</el-button>
                        <el-button @click="showDetail(scope.row.id)" type="text" size="small">查看</el-button>
                        <el-button @click="" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination class="right offset-top-31 offset-bottom-46" background layout="prev, pager, next" :page-count="totalPage" @current-change="handleCurrentChange"></el-pagination>
            <el-dialog title="场景类型详情" :visible.sync="showDetailDialog.centerDialogVisible" width="800px" center>
                <div class="center">
                    <div>
                        <span class="user-detail-text">场景类型：</span><span class="user-detail-value" v-html="detail.type"></span>
                    </div>
                    <div>
                        <span class="user-detail-text">备注：</span><span class="user-detail-value" v-html="detail.remark"></span>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="showDetailDialog.centerDialogVisible = false">保存</el-button>
                    <el-button type="default" @click="showDetailDialog.centerDialogVisible = false">取消</el-button>
                </span>
                
            </el-dialog>
            <!-- TODO 文字间距设置 -->
            <el-dialog :title="addDialog.addTitle" :visible.sync="addDialog.addDialogVisible" width="800px" center>
                <div class="center break">
                    <el-form :model="addDialog.form">
                        <el-input v-model="addDialog.form.id" type="hidden" autocomplete="off"></el-input>
                        <!-- <el-form-item label="账号" class="add-user-dialog-label" :label-width="addUserDialog.formLabelWidth"> -->
                        <el-form-item label="场景类型：" :label-width="addDialog.formLabelWidth">
                            <el-input v-model="addDialog.form.name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="备注：" :label-width="addDialog.formLabelWidth">
                            <el-input type="textarea" v-model="addDialog.form.remark" rows="5"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="doAddUser()">保 存</el-button>
                    <el-button @click="addDialog.addDialogVisible = false">取 消</el-button>
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
                types:[
                    {
                        value: 1,
                        label: "建筑"
                    },
                    {
                        value: 2,
                        label: "人物"
                    },
                    {
                        value: 3,
                        label: "动物"
                    },
                ],
                type: "",
            },
            addDialog:{
                addTitle : '新增场景类型',
                addDialogVisible: false,
                form:{
                    id: 0,
                    name : '建筑',
                    remark: '备注备注',
                },
                formLabelWidth: '130px',
            },
            showDetailDialog: {
                centerDialogVisible: false,
            },
            size : 10,
            current : 1,
            totalPage: 0,
            total: 0,
            list: [
                {
                    id : 1,
                    type: '建筑',
                    update_time: "2019-08-09 10:20",
                    remark: '备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注',
                },
                {
                    id : 2,
                    type: '人物',
                    update_time: "2019-08-09 10:20",
                    remark: '备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注',
                },
                {
                    id : 3,
                    type: '动物',
                    update_time: "2019-08-09 10:20",
                    remark: '备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注',
                },
            ],
            detail: {
                type: "人物",
                remark: "备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注",
            },
            multipleSelection : [],
            ruleList:[
                {label:"用户管理-手机用户", value: "1"},
                {label:"用户管理-管理员", value: "2"},
                {label:"用户管理-角色管理", value: "3"},
                {label:"用户管理-修改密码", value: "4"},
                {label:"用户管理-涂鸦分类", value: "5"},
            ],
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
        frozen(type){
            console.log(type)
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
            this.showDetailDialog.centerDialogVisible = true
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
        add(id){
            if(id > 0){
                //编辑时要获取对应角色的权限数据
                this.addDialog.addTitle = '编辑场景类型'
            }else{
                this.addDialog.addTitle = '新增场景类型'
            }
            this.addDialog.addDialogVisible = true
        },
        handleCurrentChange(val){
            this.current = val
            this.getData()
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
</style>
