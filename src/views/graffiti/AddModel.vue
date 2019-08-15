<template>
    <el-card class="box-card">
        <!-- <div slot="header" class="clearfix">
            aaaaa
        </div> -->
        <div style="height:300px;">
            <div class="card-col-content">
                <span class="card-col-content-title">封面</span>
                <div class="offset-top-1em">
                    <Upload content-title="上传封面" content-size="最佳尺寸：120*120"/>
                </div>
            </div>
            <div class="card-col-content">
                <span class="card-col-content-title">信息</span>
                <div class="offset-top-1em">
                    <el-form ref="form" :model="addModel.form">
                        <el-form-item label="产品名称：" style="height:unset;">
                            <el-input v-model="addModel.form.name" class="production-input"></el-input>
                        </el-form-item>
                        <el-form-item label="产品类型：" style="height:unset;">
                            <el-select v-model="addModel.form.type" placeholder="请选择场景类型">
                                <el-option v-for="(item,i) in addModel.types" :key="i" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="产品标签：" style="height:unset;">
                            <el-select v-model="addModel.form.tag" placeholder="请选择产品标签">
                                <el-option v-for="(item,i) in addModel.tags" :key="i" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="色彩选择：" style="height:unset;">
                            <el-color-picker v-model="form.color" show-alpha ></el-color-picker>
                            <!-- <div style="width:100px;height:40px;float:left;background-color:black;border-radius:40px;"></div> -->
                            <!-- <div class="el-color-picker__trigger" style="width:100px;height:40px;float:right;background-color:red;border-radius:40px;background: -webkit-gradient(linear,left top, left bottom,color-stop(0, red),color-stop(17%, #ff0),color-stop(33%, #0f0),color-stop(50%, #0ff),color-stop(67%, #00f),color-stop(83%, #f0f),to(red));
    background: linear-gradient(to right,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red 100%);"> -->
    <!-- <input type="color" style="width:100px;height:40px;float:right;background-color:red;border-radius:40px;background: -webkit-gradient(linear,left top, left bottom,color-stop(0, red),color-stop(17%, #ff0),color-stop(33%, #0f0),color-stop(50%, #0ff),color-stop(67%, #00f),color-stop(83%, #f0f),to(red));
    background: linear-gradient(to right,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red 100%);"/> -->
                            <!-- </div> -->
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="card-col-content">
                <span class="card-col-content-title">产品附件</span>
                <el-upload
                class="upload-file"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="10"
                :on-exceed="handleExceed"
                :file-list="form.fileList">
                <div class="file-upload-img">
                    <img src="@/assets/imgs/upload-2.png" class="right"/>
                </div>
                </el-upload>
                <div style="height:80%;">
                    <div class="file-list">
                        <img src="@/assets/imgs/links.png" class="left"/>
                        <label class="left">年会主题登录模板.psd<span class="file-content-right">(230k)</span></label>
                        <a class="file-delete">删除</a>
                    </div>
                    <div class="file-list">
                        <img src="@/assets/imgs/links.png"  class="left"/>
                        <label class="left">年会主题登录模板.psd<span class="file-content-right">(230k)</span></label>
                        <a class="file-delete">删除</a>
                    </div>
                    <div class="file-list">
                        <img src="@/assets/imgs/links.png"  class="left"/>
                        <label class="left">年会主题登录模板.psd<span class="file-content-right">(230k)</span></label>
                        <a class="file-delete">删除</a>
                    </div>
                </div>
            </div>

        </div>
            <el-divider style="color:#D3DCE6;"></el-divider>
            <div style="float:left;height:100%;width:100%;">
                <span class="card-col-content-title">Banner</span>
                <div class="offset-top-1em">
                    <Upload content-title="上传Banner"  content-size="最佳尺寸：690*320"/>
                </div>
            </div>

        <div style="text-align:center;">
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button>取消</el-button>
        </div>
    </el-card>
</template>

<script>
import { mkdir } from 'fs';
import { get, post} from '@/api/index.js';
import userApi from '@/api/user.js';
import Upload from '@/componets/upload/Upload';
export default {
    components:{
        Upload
    },
    created(){
        this.getData()
    },
    data(){
        return {
            form: {
                color: '',
                predefineColors: '',
                fileList: []
            },
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
            addModel:{
                types: [
                    {
                        label: "建筑",
                        value: 1
                    },
                    {
                        label: "人物",
                        value: 2
                    },
                    {
                        label: "动物",
                        value: 3
                    },
                ],
                tags: [
                    {
                        label: "经典",
                        value: 1
                    },
                    {
                        label: "成功",
                        value: 2
                    },
                ],
                addDialogVisible: false,
                form:{
                    id: 0,
                    name : '',
                    tag: '',
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
        handleCurrentChange(val){
            this.current = val
            this.getData()
        },
         handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
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
.production-input{
    width: auto;
}
.el-upload{
    width: 22px;
    height:22px;
}
.card-col-content{
    width:29%;
    text-align:center;
    border-right: 1px solid #D3DCE6;
    float:left;
    padding:0 2em;
    height:100%;
}
.card-col-content-title{
    font-weight:bold;
    font-size:24px;
}
.upload-file{
    float:right;
    width:22px;
    height:22px;
}
.file-upload-img{
    width:22px;
    height:22px;
}
.file-list{
    height:20px;
    margin-bottom:.3em;
}
.file-delete{
    color:red;
    float:right;
}
.file-content-right{
    color:#999999;
}
</style>
