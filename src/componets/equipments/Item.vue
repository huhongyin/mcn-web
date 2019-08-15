<template>
    <!-- <el-card class="equipment-item" :style="'float:'+ floatStyle +';'"> -->
    <el-col class="border-shadow" :span="7" :style="style" :offset="offset" :push="push">
        <el-card class="equipment-item">
            <el-row :gutter="10">
                <el-col :span="19">
                    <span class="title" v-html="info.title"></span>
                </el-col>
                <el-col :span="5" class="machine-status">
                    <template v-if="info.status==1">
                      <img src="../../assets/imgs/equipments/online2.png" />
                      <label>在线</label>
                    </template>
                    <template v-else>
                      <img src="../../assets/imgs/equipments/offline2.png" />
                      <label>离线</label>
                    </template>
                </el-col>
            </el-row>
            <el-row class="equipment-img-row">
                <el-col :span="24" class="o-center">
                  <img v-if="info.status==1" class="equipment-img" src="@/assets/imgs/equipments/online.png"/>
                  <img v-else class="equipment-img" src="@/assets/imgs/equipments/offline.png"/>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24" class="o-center"><span class="user-detail-text l40" v-html="info.country + splice + info.time"></span></el-col>
            </el-row>
        </el-card>
    </el-col>
</template>
<style>
  .equipment-item{
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
  .equipment-img-row{
    margin-top: 30px;
    margin-bottom: 20px;
  }
  .equipment-img{
    width: 100px;
    max-height: 100px;
    position: relative;
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
  .machine-status{
    text-align: end;
  }
  .machine-status > label{
    margin-left: 5px;
  }
  .machine-status > img{
    vertical-align: middle;
  }
</style>
<script>
  export default {
    name: "Item",
    data(){
        return {
          splice: "&nbsp;&nbsp;&nbsp;&nbsp;.",
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