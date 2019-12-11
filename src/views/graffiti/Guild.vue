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
                </template>
            </el-table-column>
        </el-table>
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
            form: {
                id: "",
                name: "",
            }
        }
    },
    created(){
        this.getData()
    },
    methods: {
        getData(){
            get(guildApi.list).then((res) => {
                this.list = res.data.list
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
            fPost(guildApi.add, this.form).then((res) => {
                this.dialogFormVisible = false
                this.$message({
                    type: "success",
                    message: res.msg
                })
                this.getData()
            })
        }
    }
}
</script>
<style scoped>

</style>