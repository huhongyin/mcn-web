<template>
    <el-upload
  class="avatar-uploader"
  action=""
  :show-file-list="false"
  :before-upload="beforeAvatarUpload"
  :on-change="handleChange"
  :http-request="uploadFile" 
  :on-success="uploadSuccess"
  :on-error="uploadError"
  accept="image/*">
  <template v-if="imageUrl">
    <img :src="imageUrl" class="avatar">
  </template>
  <template v-else>
    <!-- <i class="el-icon-plus avatar-uploader-icon"></i> -->
    <div class="upload-content">
        <div class="upload-desc">
            <div>
                <img src="@/assets/imgs/upload.png">
            </div>
            <div>
                <label class="upload-title" v-html="contentTitle"></label>
            </div>
            <div>
                <label class="upload-img-desc">格式：JPG\PNG</label>
            </div>
            <div>
                <label class="upload-img-desc" v-html="contentSize"></label>
            </div>
        </div>
    </div>
  </template>
</el-upload>

</template>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .upload-content{
      width:100%;
      height:100%;
  }
  .upload-desc{
      height:111px;
      margin:33px auto;
  }
  .upload-title{
      color:#333333;
      font-weight:500;
      font-size:18px;
      letter-spacing:1px;
  }
  .upload-img-desc{
      font-size:14px;
      color:#999999;
  }
  .el-upload{
      width: 178px;
      height:178px;
  }
</style>

<script>
import axios from 'axios'
  export default {
    name: "Upload",
    props:[
      'contentWidth',
      'contentTitle',
      'contentSize',
      'uploadUrl',
      'data',
    ],
    created(){
        this.$nextTick(function(){
          this.imageUrl = ''
          this.file = {}
        })
    },
    data() {
      return {
        imageUrl: '',
        file: {},
        openId: '111',
      };
    },
    methods: {
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
        this.file = file.raw
      },
      uploadFile(){
        let form = new FormData()
        form.append("file", this.file),
        form.append("openId", this.openId)
        let url = this.uploadUrl
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
          that.imageUrl = res.data.content
          that.$emit('listenTochildEvent', that.imageUrl)
          
        }).catch(err => {
          cosnole.log('errr')
        })
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      }
    }
  }
</script>