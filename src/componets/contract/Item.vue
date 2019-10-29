<template>
    <!-- <el-card class="contract-item" :style="'float:'+ floatStyle +';'"> -->
    <el-col :span="7" :style="style" :offset="offset" :push="push">
        <el-card class="contract-item">
            <el-row :gutter="10">
                <template v-if="!isEdit">
                    <el-col :span="1">
                        <el-checkbox label="" name="type"></el-checkbox>
                    </el-col>
                    <el-col :span="18">
                        <span class="title" v-html="info.title"></span>
                    </el-col>
                    <el-col :span="5">
                        <el-button class="edit-btn" type="primary" @click="editInfo">编辑</el-button>
                    </el-col>
                </template>
                <template v-else>
                    <el-col :span="18" class="left">
                        <el-input :value="info.title"></el-input>
                    </el-col>
                    <el-col :span="5" class="right">
                        <button class="edit-btn save" @click="editInfo">保存</button>
                    </el-col>
                </template>
            </el-row>
            <el-row class="contract-img-row">
                <el-col :span="24" class="o-center">
                <!-- <img class="banner-img" v-bind:src="info.img_url" /> -->
                    <img v-if="!isEdit" class="contract-img" src="@/assets/imgs/contract/qq.png"/>
                    <el-upload class="upload h100" v-if="isEdit" action="https://jsonplaceholder.typicode.com/posts/">
                        <img class="contract-img" src="@/assets/imgs/upload-3.png"/>
                    </el-upload>
                    <!-- <el-upload class="upload" style="height:0;" v-if="isEdit" action="https://jsonplaceholder.typicode.com/posts/">
                        <button class="reupload" v-if="isEdit">重新上传</button>
                    </el-upload> -->
                </el-col>
            </el-row>
            <el-row>
                <el-input v-model="info.desc" v-if="isEdit"></el-input>
                <el-col :span="24" class="o-center" v-else><span class="user-detail-text l40" v-html="info.desc"></span></el-col>
            </el-row>
        </el-card>
    </el-col>
</template>
<style>
  .contract-item{
    width: 100%;
    float: left;
    margin-top: 30px;
    /* margin-left: 13px; */
    /* padding: 8px 10px 8px 10px; */
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
  .contract-img-row{
    margin-top: 30px;
    margin-bottom: 20px;
  }
  .contract-img{
    width: 100px;
    max-height: 100px;
    position: relative;
  }
  .reupload{
    background-color: #000000;
    color: white;
    width: 100%;
    height: 50px;
    opacity: 0.7;
    position: absolute;
    top: 180px;
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
  export default {
    name: "Item",
    data(){
        return {
          isEdit : false,
          offset: 0,
          push: 0,
          style: {},
        }
    },
    props:[
      'info',
      'keyValue',
    ],
    created(){
        this.calKeyValue()
    },
    methods: {
      editInfo(){
        this.isEdit = this.isEdit == true ? false : true;
      },
      calKeyValue(){
          let yu = (this.keyValue + 1) % 3
          console.log(yu)
          switch (yu){
                case 0:
                        this.offset = 1
                        this.push = 1
                        this.style = {}
                    break;
                case 1:
                        this.offset = 0
                        this.push = 0
                        this.style = {}
                    break;
                case 2:
                        this.offset =  1
                        this.push = 1
                        this.style = {left: '2.08335%'}
                    break;
          }
      }
    }
  }
</script>