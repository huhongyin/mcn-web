<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <el-button type="primary" @click="add(0)">新增</el-button>
        </div>
        <el-table row-key="id" lazy :load="load" :tree-props="{children: 'children', hasChildren: 'has_children'}" stripe ref="multipleTable" :data="list" tooltip-effect="dark" :header-cell-style="{background:'#EFF5F9'}">
                <!-- <el-table-column type="selection"></el-table-column> -->
                <!-- <el-table-column label="序号" type="index"></el-table-column> -->
                <el-table-column label="公司名称" prop="name"></el-table-column>
                <el-table-column label="公司类型">
                    <template slot-scope="scope">
                        <span v-if="scope.row.type==1">主公司</span>
                        <span v-else-if="scope.row.type==3">部门</span>
                        <span v-else-if="scope.row.type==4">员工</span>
                        <span v-else>子公司</span>
                    </template>
                </el-table-column>
                <el-table-column label="挂靠公会">
                    <template slot-scope="scope">
                        <span v-if="scope.row.is_anchored==1">是</span>
                        <span v-else>否</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.type == 1 || scope.row.type == 0" @click="add(scope.row)" type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination class="right offset-top-31 offset-bottom-46" background layout="prev, pager, next" :total="total" @current-change="handleCurrentChange"></el-pagination>
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
                            <el-select v-model="addDialog.form.type" placeholder="请选择" style="width:100%;">
                                <el-option
                                v-for="item in company_type_options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="挂靠公会:" :label-width="addDialog.formLabelWidth">
                            <el-select v-model="addDialog.form.is_anchored" placeholder="公会类型" style="width:100%">
                                <el-option value="0" label="否"></el-option>
                                <el-option value="1" label="是"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="doSave()">保 存</el-button>
                    <el-button @click="addDialog.addDialogVisible = false">取 消</el-button>
                </span>
            </el-dialog>
    </el-card>
</template>

<script>
import { mkdir } from 'fs';
import { get, post} from '@/api/index.js';
import companyApi from '@/api/company.js';
import departmentApi from '@/api/department.js';

export default {
    created(){
        this.getData()
    },
    data(){
        return {
            company_select:'',
            company_type_options: [
                {
                    value: 1,
                    label: '主公司'
                }, 
                {
                    value: 0,
                    label: '子公司'
                }
            ],
            addDialog:{
                addTitle : '新增公司',
                addDialogVisible: false,
                form:{
                    id: 0,
                    name: '',
                    type: '',
                    is_anchored: '否',
                },
                formLabelWidth: '130px',
            },
            size : 10,
            current : 1,
            total: 0,
            list: [],
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
        getData(){
            var params = { page : this.current, size : this.size, }
            var that = this
            get(companyApi.list, params).then(function(res){
                that.list = res.data.list.data
                that.total = res.data.list.total
            })
        },
        add(row){
            if(row.id > 0){
                //编辑时要获取对应角色的权限数据
                this.addDialog.addTitle = '编辑公司'
            }else{
                this.addDialog.addTitle = '新增公司'
            }
            this.addDialog.form.id = row.id
            this.addDialog.form.name = row.name
            this.addDialog.form.type = row.type
            if(row.is_anchored == 1){
                this.addDialog.form.is_anchored = '是'
            }else{
                this.addDialog.form.is_anchored = '否'
            }
            this.addDialog.addDialogVisible = true
        },
        doSave(){
            let that = this
            if(typeof(this.addDialog.form.id) == 'undefined'){
                this.addDialog.form.id = 0
            }
            let url = companyApi.add + '/' + this.addDialog.form.id
            post(url, {info: this.addDialog.form}).then((res) => {
                that.$message({
                    type: 'success',
                    message: res.msg
                })                

                that.addDialog.addDialogVisible = false
                that.getData()
            })
        },
        handleCurrentChange(val){
            this.current = val
            this.getData()
        },
        load(tree, treeNode, resolve) {
            switch(tree.data_type){
                case 'department':
                        //获取部门下员工
                        var params = { type: 'select' }
                        get(departmentApi.users + '/' + tree.id, params).then((res) => {
                            var data = []
                            res.data.list.map((item) => {
                                var item = { id: item.id + '_user', data_type: 'user', name: item.rel_name, type: 4, has_children: false }
                                data.push(item)
                            })

                            resolve(data)
                        })
                    break;
                case 'company':
                        var params = { type: 'select', company_id: tree.id }
                        get(departmentApi.list, params).then((res) => {
                            var data = []
                            res.data.list.map((item) => {
                                var item = {id: item.id, data_type: 'department', name: item.name,  type: 3, has_children: true}
                                data.push(item)
                            })
                            resolve(data)
                        })
                    break;
            }
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
</style>
