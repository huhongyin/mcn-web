<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            数据导入
        </div>
        <el-form label-width="80px">
            <el-form-item label="公司">
                <el-col :span="12">
                    <el-select v-model="form.company_id" style="width:100%;">
                        <el-option v-for="(item,key) in companies" :key="key" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="数据类型">
                <el-col :span="12">
                    <el-select v-model="form.data_type" placeholder="请选择数据类型" style="width:100%;" @change="showImport">
                        <el-option v-for="(item,key) in data_type" :key="key" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="平台类型" v-show="showPlatImport">
                <el-col :span="12">
                    <el-select v-model="form.plat_id" placeholder="请选择平台" style="width:100%;">
                        <el-option v-for="(item,key) in plats" :key="key" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="流水类型" v-show="showPlatImport">
                <el-col :span="12">
                    <el-select v-model="form.money_type" placeholder="请选择流水类型" style="width:100%;" @change="changeImportMoneyType">
                        <el-option v-for="(item,key) in money_types" :key="key" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="导入时间" v-show="showPlatImport">
                <el-col :span="12">
                    <el-date-picker v-show="selectDate" type="date" :value-format="valueFormat" :format="valueFormat" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
                    <el-date-picker v-show="selectMonth" value-format="yyyy-MM" format="yyyy-MM" v-model="form.date" style="width:100%:" type="month" placeholder="选择日期"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="导入文件">
                <el-col :span="12">
                    <el-upload
                    :on-change="handleChange"
                    name="file[]"
                    :file-list="fileList"
                    :show-file-list="true"
                    :on-success="uploadSuccess"
                    :before-upload="beforeAvatarUpload"
                    class="upload-demo"
                    drag
                    :action="uploadUrl"
                    >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip" style="text-align:center;">只能上传xlsx/csv文件</div>
                    </el-upload>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-col :span="12" style="text-align:center;">
                    <el-button type="primary" @click="showConfirm">提交</el-button>
                </el-col>
            </el-form-item>
        </el-form>
        <el-dialog
        title="确认"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <span>请仔细确认导入的文档是否和平台已经公司对应后提交</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">再确认一下</el-button>
            <el-button type="primary" @click="onSubmit">我确认好了</el-button>
        </span>
        </el-dialog>
    </el-card>
    
</template>

<script>
import uploadApi from '@/api/upload.js'
import platApi from '@/api/plats.js'
import importApi from '@/api/import.js'
import actorApi from '@/api/actor.js'
import companyApi from '@/api/company.js';
import { get,post } from '@/api/index.js'

export default {
    data(){
        return {
            selectMonth: false,
            selectDate: false,
            centerDialogVisible: false,
            uploadUrl: 'http://sk.dev.com/' + uploadApi.upload,
            // uploadUrl: 'http://admin.mcn.huhongyin.com' + uploadApi.upload,
            showPlatImport: true,
            valueFormat: 'yyyy-MM-dd',
            fileList: [],
            form: {
                date: "",
                data_type: 1,
                plat_id: 1,
                money_type: 1,
                import_file: '',
                company_id: '',
            },
            data_type: [
                {
                    label: '主播数据',
                    value: 1,
                },
                {
                    label: '平台流水',
                    value: 2,
                }
            ],
            plats: [],
            money_types: [
                {
                    label: '日流水',
                    value: 2,
                },
                {
                    label: '月流水',
                    value: 1,
                },
            ],
            companies: [],
        }
    },
    created(){
        this.getCompany()
        this.getPlats()
        this.isShow()
    },
    methods:{
        showConfirm(){
            this.centerDialogVisible = true
        },
        onSubmit(){
            if(this.form.data_type == 1){
                post(actorApi.import, this.form).then((res) => {
                    // loading.close();
                    this.centerDialogVisible = false
                    this.$message({
                        type: 'success',
                        message: res.msg
                    })
                })
            }else if(this.form.data_type == 2){
                const loading = this.$loading({
                    lock: true,
                    text: '导入中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.centerDialogVisible = false
                post(importApi.add, this.form).then((res) => {
                    console.log(res)
                    loading.close();
                    if(res.code != 1){
                        this.$message({
                            type: 'danger',
                            message: res.msg
                        })
                        return false
                    }
                    this.$message({
                        type: 'success',
                        message: res.msg
                    })
                }).catch((err) => {
                    loading.close()
                })
            }else{
                this.$message({
                    type: 'danger',
                    message: '非法操作'
                })
            }
        },
        showImport(value){
            this.form.data_type = value
            this.isShow()
        },
        changeImportMoneyType(value){
            this.form.money_type = value
            this.isShow()
        },
        getPlats(){
            get(platApi.list).then((res) => {
                this.plats = res.data.list
            })
        },
        isShow(){
            if(this.form.data_type == 1){
                this.showPlatImport = false
            }else{
                this.showPlatImport = true
            }

            if(this.form.money_type == 2){
                this.selectMonth = false
                this.selectDate = true
            }else{
                this.selectMonth = true
                this.selectDate = false
            }
        },
        uploadSuccess(response, file, fileList){
            if(response.code != 1){
                this.$message({
                    type: 'danger',
                    message: response.msg
                })

                return false
            }
            this.form.import_file = response.data.list[0].path
        },
        getCompany(){
            get(companyApi.list, { type: 'select' }).then((res) =>{
                this.form.company_id = res.data.list[0].id
                this.companies = res.data.list
            })
        },
         beforeAvatarUpload(file) {
             return true
            const isJPG = file.type === 'text/csv' || file.type === 'application/wps-office.xlsx';

            if (!isJPG) {
                this.$message.error('请上传csv或者xlsx文件');
            }
            return isJPG;
        },
        handleChange(file, fileList){
            if(typeof(file.response) != 'undefined'){
                if(file.response.code != 1){
                    this.$message({
                        type: 'danger',
                        message: file.response.msg
                    })
                }else{
                    this.fileList = file.response.data.list
                }
            }
        }
    }
}
</script>
<style>
    .el-upload{
        width: 100%;
    }
    .el-upload-dragger{
        width: 100%;
    }
</style>
<style scoped>
    .line{
        text-align: center;
    }
</style>