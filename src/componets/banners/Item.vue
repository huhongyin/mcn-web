<template>
    <el-card class="banner-item" :style="'float:'+ floatStyle +';'">
      <el-row :gutter="10">
        <template v-if="!isEdit">
          <el-col :span="1">
            <el-checkbox @change="changeStatus" label="" name="type"></el-checkbox>
          </el-col>
          <el-col :span="18">
            <span class="title" v-html="info.bannerName"></span>
          </el-col>
          <el-col :span="5">
            <el-button class="edit-btn" type="primary" @click="editInfo()">编辑</el-button>
          </el-col>
        </template>
        <template v-else>
          <el-col :span="19">
              <el-input v-model="info.bannerName"></el-input>
          </el-col>
          <el-col :span="5">
            <button class="edit-btn save" @click="editInfo()">保存</button>
          </el-col>
        </template>
      </el-row>
      <el-row class="banner-img-row">
         <el-col :span="24" class="img-div">
           <img class="banner-img" :src="info.bannerImageUrl"/>
            <!-- <img class="banner-img" src="@/assets/imgs/banner/1.png"/> -->
            <el-upload class="upload" style="height:0;" :show-file-list="false" :on-change="handleChange" v-if="isEdit" :http-request="uploadFile" action="" @on-success="uploadSuccess" @on-error="uploadError">
                <button class="reupload" v-if="isEdit">重新上传</button>
            </el-upload>
         </el-col>
      </el-row>
      <el-row>
        <el-col :span="15" :offset="9"><span v-html="info.desc"></span></el-col>
      </el-row>
    </el-card>
</template>
<style scoped>
  .banner-item{
    width: 47%;
    float: left;
    margin-top: 30px;
    padding: 8px 10px 8px 10px;
  }
  .title{
    width:78px;
    height:33px;
    font-size:24px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(0,0,0,1);
    line-height:33px;
    letter-spacing:2px;
    margin-left: 20px;
  }
  .edit-btn{
    float: right;
    width: 100px;
    height: 40px;
    box-shadow:0px 4px 12px 0px rgba(46,140,255,0.5);
  }
  .banner-img-row{
    margin-top: 30px;
    margin-bottom: 20px;
  }
  .banner-img{
    height: 320px;
    width: 100%;
    position: relative;
  }
  .img-div{
    max-height: 320px;
  }
  .reupload{
    background-color: #000000;
    color: white;
    width: 100%;
    height: 18%;
    opacity: 0.7;
    position: absolute;
    top: 82%;
    left: 0px;
  }
  .save{
    width:100px;
    height:40px;
    background:rgba(0,191,196,1);
    border: none;
    box-shadow:0px 4px 12px 0px rgba(0,191,196,1);
    border-radius:4px;
    color: white;
  }
</style>
<script>
import bannerApi from '@/api/banner.js';
import { fPost, get, post } from '@/api/index.js';
import axios from 'axios'

  export default {
    name: "Item",
    data(){
        return {
          floatStyle : '',
          isEdit : false,
          uploadUrl: bannerApi.upload,
          openId: "1111",
          file: {},
          uploadHost: this.$selfProps.uploadHost,
        }
    },
    props:[
      'info',
      'keyValue',
    ],
    created(){
      this.floatStyle = (this.keyValue % 2 == 0) ? 'left' : 'right'
    },
    methods: {
      editInfo(){
        this.isEdit = this.isEdit == true ? false : true
        if(!this.isEdit){
          let url = ''
          if(typeof(this.info.id) != 'undefined'){
              url = bannerApi.update
          }else{
            url = bannerApi.add
          }
          let params = { id: this.info.id, bannerImageUrl: this.info.bannerImageUrl, bannerLinkedUrl: '', bannerName: this.info.bannerName, isEnabled: 1, type: this.info.type }
          fPost(url, params).then((res) => {
            console.log(res)
          })
        }
      },
      uploadSuccess(response, file, fileList){
        console.log(response)
        console.log(file)
        console.log(fileList)
      },
      uploadError(response, file, fileList){
        console.log(response)
        console.log(file)
        console.log(fileList)
      },
      handleChange(file){
        console.log(file.raw)
        this.file = file.raw
      },
      uploadFile(){
        let form = new FormData()
        form.append("file", this.file),
        form.append("openId", this.openId)
        let url = this.uploadHost + bannerApi.upload
        let that = this
        axios.post(url, form).then(res => {
          if(res.status != 200 || res.data.code != 0){
            that.$message({
              message: "上传失败!",
              type: 'error',
              duration: 1000,
            })
            return false
          }
          that.info.bannerImageUrl = res.data.content
          
        }).catch(err => {
          cosnole.log('errr')
        })
      },
      changeStatus(val){
          this.checked = (this.checked == true) ? false : true
          this.$emit('listenTochildEvent', this.checked, this.info.id)
      },
    }
  }
</script>