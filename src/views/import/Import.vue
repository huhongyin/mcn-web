<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            数据导入
        </div>
        <el-form label-width="80px">
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
                        <el-option v-for="(item,key) in plats" :key="key" :label="item.label" :value="item.value"></el-option>
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
                    <el-date-picker type="date" :value-format="valueFormat" :format="valueFormat" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="导入文件">
                <el-col :span="12">
                    <el-upload
                    class="upload-demo"
                    style="width:100%;"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip" style="text-align:center;">只能上传xlsx/xls文件</div>
                    </el-upload>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-col :span="12" style="text-align:center;">
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                </el-col>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
export default {
    data(){
        return {
            showPlatImport: true,
            valueFormat: 'yyyy-MM-dd',
            form: {
                date1: "",
                data_type: 1,
                plat_id: 1,
                money_type: 1,
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
            plats: [
                {
                    label: '抖音',
                    value: 1,
                },
                {
                    label: '映客',
                    value: 2,
                },
                {
                    label: '火山小视频',
                    value: 3,
                },
                {
                    label: '陌陌',
                    value: 4,
                },
            ],
            money_types: [
                {
                    label: '月流水',
                    value: 1,
                },
                {
                    label: '日流水',
                    value: 2,
                }
            ],
        }
    },
    created(){
        this.isShow()
    },
    methods:{
        onSubmit(){
            
        },
        showImport(value){
            this.form.data_type = value
            this.isShow()
        },
        changeImportMoneyType(value){
            this.form.money_type = value
            this.isShow()
        },
        isShow(){
            if(this.form.data_type == 1){
                this.showPlatImport = false
            }else{
                this.showPlatImport = true
            }

            if(this.form.money_type == 1){
                this.valueFormat = 'yyyy-MM-dd'
            }else{
                this.valueFormat = 'yyyy-MM'
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