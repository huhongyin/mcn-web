<template>
    <el-card class="box-card">
        <el-table stripe ref="multipleTable" :data="list" tooltip-effect="dark" :header-cell-style="{background:'#EFF5F9'}" @selection-change="handleSelectionChange">
                <el-table-column type="selection"></el-table-column>
                <el-table-column label="序号" type="index"></el-table-column>
                <el-table-column label="公司名称" prop="name"></el-table-column>
                <el-table-column label="公司类型" prop="type.name"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="add(scope.row.id)" type="text" size="small">编辑</el-button>
                        <!-- <el-button @click="showDetail(scope.row.id)" type="text" size="small">查看</el-button> -->
                        <!-- <el-button @click="" type="text" size="small">删除</el-button> -->
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination class="right offset-top-31 offset-bottom-46" background layout="prev, pager, next" :page-count="totalPage" @current-change="handleCurrentChange"></el-pagination>
            <el-dialog title="场景类型详情" :visible.sync="showDetailDialog.centerDialogVisible" width="800px" center>
                <div class="center">
                    <div>
                        <span class="user-detail-text">部门名称：</span><span class="user-detail-value" v-html="detail.type"></span>
                    </div>
                    <div>
                        <span class="user-detail-text">负责人：</span><span class="user-detail-value" v-html="detail.remark"></span>
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
                        <el-form-item label="公司名称：" :label-width="addDialog.formLabelWidth">
                            <el-input v-model="addDialog.form.name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="公司类型：" :label-width="addDialog.formLabelWidth">
                            <el-select v-model="value" placeholder="请选择" style="width:100%;">
                                <el-option
                                v-for="item in company_type_options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
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
            company_type_options: [{
                value: '选项1',
                label: '主公司'
                }, {
                value: '选项2',
                label: '子公司'
                }
            ],
            addDialog:{
                addTitle : '新增公司',
                addDialogVisible: false,
                form:{
                    id: 0,
                    name : '成都公司',
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
                    name: '成都', //权限名称
                    type: {
                        name: '主公司'
                    }
                },
                {
                    id : 2,
                    name: '北京', //权限名称
                    type: {
                        name: '子公司'
                    }
                },
            ],
            detail: {
                type: "人物",
                remark: "备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注",
            },
            multipleSelection : [],
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
                this.addDialog.addTitle = '编辑公司信息'
            }else{
                this.addDialog.addTitle = '新增公司信息'
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
