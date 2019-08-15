<template>
    <div>
        <el-card class="box-card">
            <div class="clearfix offset-bottom-26">
                <span class="user-detail-text">联系我们</span>
                <el-button class="btn-header" type="primary" @click="add(0)">新增</el-button>
                <el-button class="btn-header">删除</el-button>
            </div>
            <label>欢迎联系涂鸦机器人软件，我们期待与您详细沟通，你可以通过以下方式联系我们！</label>
        </el-card>

        <el-row>
            <ContractItem v-for="(info,key) in list" float-style="left" :info="info" :key="key" :key-value="key"/>
        </el-row>
        <el-dialog :title="addDialog.addTitle" :visible.sync="addDialog.show" center>
            <el-form :model="addDialog.form">
                <el-form-item label="图标" :label-width="addDialog.formLabelWidth">
                    <Upload content-title="上传Banner" content-size="690*320" />
                </el-form-item>
                <el-form-item label="联系方式" :label-width="addDialog.formLabelWidth">
                    <el-input placeholder="请输入联系方式" v-model="addDialog.form.contract_type"></el-input>
                </el-form-item>
                <el-form-item label="联系内容" :label-width="addDialog.formLabelWidth">
                    <el-input placeholder="请输入联系内容" v-model="addDialog.form.contract_content"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addDialog.show = false">保 存</el-button>
                <el-button @click="addDialog.show = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
    
</template>

<script>
import { mkdir } from 'fs';
import { get, post} from '@/api/index.js';
import userApi from '@/api/user.js';
import ContractItem from '@/componets/contract/Item.vue';
import Upload from '@/componets/upload/Upload';
export default {
    components:{
        ContractItem, Upload
    },
    created(){
        this.getData()
    },
    data(){
        return {
            search:{
                statusList:[
                    {
                        value: 1,
                        label: "禁用"
                    },
                    {
                        value: 2,
                        label: "启用"
                    },
                ],
                keywords: "",
                status: "",
                select_date: "",
            },
            addDialog:{
                addTitle : '新增Banner',
                show: false,
                form:{
                },
                types: [
                    {
                        name: '个人中心',
                        value: 1,
                    },
                    {
                        name: '首页',
                        value: 2,
                    },
                ],
                formLabelWidth: '130px',
                checkAll: false,
                isIndeterminate: true,
            },
            size : 10,
            current : 1,
            totalPage: 0,
            total: 0,
            list: [
                {
                    id : 1,
                    title: 'WhatsApp',
                    img_url: '../../assets/imgs/contract/whatsapp.png',
                    desc: '1245124'
                },
                {
                    id : 2,
                    title: 'QQ',
                    img_url: '../../assets/imgs/contract/qq.png',
                    desc: '11111111'
                },
                {
                    id : 3,
                    title: '微信',
                    img_url: '../../assets/imgs/contract/wechat.png',
                    desc: '222222'
                },
                {
                    id : 4,
                    title: '网址',
                    img_url: '../../assets/imgs/contract/web.png',
                    desc: 'http://www.baidu.com'
                },
                {
                    id : 5,
                    title: '邮箱',
                    img_url: '../../assets/imgs/contract/email.png',
                    desc: 'd@qq.com'
                },
            ],
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
        add(id){
            this.addDialog.show = true
        },
        deleteData(){

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
.el-form-item > label{
    font-weight: 500;
    color: black;
}
.el-card > .el-card__header{
    border: none;
}
</style>
