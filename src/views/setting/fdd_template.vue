<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span v-text="title"></span>
        </div>
        <el-row :gutter="10">
            <el-col :span="3" :offset="21">
                <el-button type="primary" @click="addTemplate">新增</el-button>
            </el-col>
        </el-row>
        <el-table stripe :data="list" tooltip-effect="dark" :header-cell-style="{background:'#EFF5F9'}">
            <el-table-column fixed label="模板名称" prop="template_name"></el-table-column>
            <el-table-column fixed label="模板id" prop="template_id"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="showDeleteDialog(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="right offset-top-31 offset-bottom-46" background :total="total" layout="total, prev, pager, next"></el-pagination>
        <el-dialog title="新增合同模板" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="合同模板名称" :label-width="formLabelWidth">
                    <el-input placeholder="请输入合同模板名称" v-model="form.file_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="合同模板文件" :label-width="formLabelWidth">
                    <el-upload class="upload-demo" ref="upload" action="" :http-request="httpRequest" :on-change="handleChange" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false">
                        <el-button style="float:left" slot="trigger" size="small" type="primary">选取文件</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传pdf文件</div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="doAddTemplate">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="提示" :visible.sync="deleteDialog.show" width="30%" center>
            <span>{{ deleteDialog.title }}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteDialog.show = false">取 消</el-button>
                <el-button type="primary" @click="deleteData">确 定</el-button>
            </span>
        </el-dialog>
    </el-card>
</template>

<script>
import axios from "axios"
import fddApi from '@/api/fdd'
import { get, fPost } from '@/api/index'

export default {
    created(){
        this.getData()
    },
    data(){
        return {
            visible: false,
            total: 3,
            title: '法大大合同模板管理',
            list: [],
            fileList: [],
            search: {
                page: 1,
            },
            formLabelWidth: '120px',
            dialogFormVisible: false,
            form: {
                file_name: "",
                file_path: "",
            },
            deleteDialog: {
                show: false,
                title: "",
                form: {
                    id: ""
                }
            }
        }
    },
    created(){
        this.getData()
    }, 
    methods:{
        getData(){
            get(fddApi.list, this.search).then((res) => {
                this.list = res.data.list.data
                this.total = res.data.total
            })
        },
        addTemplate(){
            this.fileList = []
            this.form.file_name = ""
            this.form.file_path = ""
            this.dialogFormVisible = true
        },
        doAddTemplate() {
            this.$refs.upload.submit();
        },
        showDeleteDialog(data){
            this.deleteDialog.form.id = data.id
            this.deleteDialog.title = "确定删除合同模板" + data.template_name
            this.deleteDialog.show = true
        },
        deleteData(){
            fPost(fddApi.delete + this.deleteDialog.form.id).then((res) => {
                this.deleteDialog.show = false
                if(res.code == 1){
                    this.$message.success(res.msg)
                    this.search.page = 1
                    this.getData()
                }else{
                    this.$message.error(res.msg)
                }
            })
        },
        httpRequest(uploader){
            let formData = new FormData()
            formData.append("file_name", this.form.file_name)
            formData.append("file_path", uploader.file)
            axios.post(fddApi.add, formData).then((res) => {
                if(res.data.code != 1){
                    this.$message.error(res.data.msg)
                }else{
                    this.$message.success(res.data.msg)
                }
                this.dialogFormVisible = false
                this.search.page = 1
                this.getData()
            }).catch((err) => {
                this.$message.error("服务器异常,请稍后重试")
            })
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleChange(file, fileList){
            let newArr = new Array()
            newArr.push(file)
            this.fileList = newArr
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
