<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            公会管理
            <el-button style="float:right;" type="text" @click="edit(null)">添加</el-button>
        </div>
        <el-table :data="list">
            <el-table-column prop="name" label="公会名称"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="edit(scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="deleteData(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-row style="margin-top:1rem;">
            <el-pagination style="float:right;" :total="total" :page-size="pageSize" background layout="prev, pager, next" @current-change="currentChange"></el-pagination>
        </el-row>
        <el-dialog title="公会信息" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="公会名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm">保 存</el-button>
            </div>
        </el-dialog>
        <el-dialog :title="deleteD.title" :visible.sync="deleteD.show">
            <div slot="footer" class="dialog-footer">
                <el-button @click="deleteD.show = false">取 消</el-button>
                <el-button type="primary" @click="confirmDelete">确 定</el-button>
            </div>
        </el-dialog>
    </el-card>
</template>
<script>
import guildApi from '@/api/guild';
import { get, fPost } from '@/api/index';

export default {
    data(){
        return {
            dialogFormVisible: false,
            formLabelWidth: '120px',
            list: [],
            pageSize: 15,
            page: 1,
            total: 1,
            form: {
                id: "",
                name: "",
            },
            deleteD: {
                show: false,
                id: "",
            }
        }
    },
    created(){
        this.getData()
    },
    methods: {
        getData(){
            var params = { page: this.page }
            get(guildApi.listByPage, params).then((res) => {
                this.list = res.data.list.data
                this.total = res.data.list.total
            })
        },
        edit(info){
            if(info != null){
                this.form = info
            }else{
                this.form.id = ""
                this.form.name = ""
            }
            this.dialogFormVisible = true
        },
        submitForm(){
            fPost(guildApi.add + this.form.id, this.form).then((res) => {
                this.dialogFormVisible = false
                this.$message({
                    type: "success",
                    message: res.msg
                })
                this.getData()
            })
        },
        currentChange(page){
            this.page = page
            this.getData()
        },
        deleteData(data){
            this.deleteD.id = data.id
            this.deleteD.title = '确定删除公会:' + data.name
            this.deleteD.show = true
        },
        confirmDelete(){
            fPost(guildApi.delete + this.deleteD.id).then((res) => {
                this.deleteD.show = false
                this.$message.success(res.msg)
                this.page = 1
                this.getData()
            })
        },
    }
}
</script>
<style scoped>

</style>