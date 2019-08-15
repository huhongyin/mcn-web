<template>
    <div>
      <div class="content">
          <div class="title_box">
            <el-row>
              <el-col :span="8">
                <div class="grid-content bg-purple first">
                  <img :src="guojia_icon" width="80" style="margin-right:30px" height="80" alt />
                  <!--国家选择 -->
                  <div class="select_guojia">
                    <el-dropdown @command="handleCountryCommand">
                      <span class="el-dropdown-link">
                        {{ search.select_country }}
                        <i style="margin-left:20px;" class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item :command="item" v-for="(item,key) in countries" :key="key" v-html="item.label"></el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                    <p v-text="data.country_num"></p>
                  </div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple-light scend">
                  <img :src="guojia_icon" width="80" style="margin-right:30px" height="80" alt />
                  <!--时间选择 -->
                  <div class="select_guojia">
                    <!-- <el-dropdown @command="handleDateCommand"> -->
                      <span class="el-dropdown-link select_guojia2" @click="selectDate($event)">
                        {{ this.search.selectDate }}
                        <i style="margin-left:20px;" class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-date-picker @change="changeDate()" value-format="yyyy/MM/dd" ref="test" class="date-time-picker" v-model="search.select_date" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                      <!-- <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="a">黄金糕xxxxxxx</el-dropdown-item>
                        <el-dropdown-item command="b">狮子头xxxxx</el-dropdown-item>
                        <el-dropdown-item command="c">螺蛳粉xxxx</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown> -->
                    <p v-text="data.time_num"></p>
                  </div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple third">
                    <img :src="guojia_icon" width="80" style="margin-right:30px" height="80" alt />
                  <!--状态选择 -->
                  <div class="select_guojia">
                    <el-dropdown @command="handleStatusCommand">
                      <span class="el-dropdown-link">
                        {{ search.select_status }}
                        <i style="margin-left:20px;" class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="(item,key) in statuses" :key="key" :command="item" v-text="item.label"></el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                    <p v-text="data.status_num"></p>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>

    <el-row>
        <EquipmentItem v-for="(info,key) in list" float-style="left" :info="info" :key="key" :key-value="key"/>
    </el-row>
    </div>
    
</template>

<script>
import { mkdir } from 'fs';
import { get, post} from '@/api/index.js';
import userApi from '@/api/user.js';
import EquipmentItem from '@/componets/equipments/Item.vue';
import Upload from '@/componets/upload/Upload';
export default {
    components:{
        EquipmentItem, Upload
    },
    created(){
        this.getData()
    },
    data(){
        return {
            search:{
              country: '',
              status: '',
              begin: '',
              end: '',
              select_date: '',
              select_country: '国家',
              selectDate: '时间',
              select_status: '状态'
            },
            size : 10,
            current : 1,
            totalPage: 0,
            total: 0,
            data:{
              country_num: 100,
              time_num: 200,
              status_num: 2000,
            },
            list: [
                {
                    id : 1,
                    title: '编号:20180604',
                    img_url: '../../assets/imgs/contract/whatsapp.png',
                    status: 0,
                    country: '中国',
                    time: '2019/05/25 23:21:34'
                },
                {
                    id : 6,
                    title: '编号:20180604',
                    img_url: '../../assets/imgs/contract/whatsapp.png',
                    status: 1,
                    country: '中国',
                    time: '2019/05/25 23:21:34'
                },
                {
                    id : 2,
                    title: '编号:20180604',
                    img_url: '../../assets/imgs/contract/whatsapp.png',
                    status: 1,
                    country: '中国',
                    time: '2019/05/25 23:21:34'
                },
                {
                    id : 3,
                    title: '编号:20180604',
                    img_url: '../../assets/imgs/contract/whatsapp.png',
                    status: 0,
                    country: '中国',
                    time: '2019/05/25 23:21:34'
                },
                {
                    id : 4,
                    title: '编号:20180604',
                    img_url: '../../assets/imgs/contract/whatsapp.png',
                    status: 1,
                    country: '中国',
                    time: '2019/05/25 23:21:34'
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
            guojia_icon: require("../../assets/imgs/guojia.png"),
            options: [
              {
                value: "选项1",
                label: "黄金糕"
              },
              {
                value: "选项2",
                label: "双皮奶"
              },
              {
                value: "选项3",
                label: "蚵仔煎"
              },
              {
                value: "选项4",
                label: "龙须面"
              },
              {
                value: "选项5",
                label: "北京烤鸭"
              }
            ],
            value: "",
            countries: [
              {
                label: '中国',
                value: 1
              },
              {
                label: '俄罗斯',
                value: 2
              },
              {
                label: '小日本',
                value: 3
              },
            ],
            statuses: [
              {
                label: '在线',
                value: 1
              },
              {
                label: '离线',
                value: 2
              },
            ],
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
        handleCurrentChange(val){
            this.current = val
            this.getData()
        },
        handleCountryCommand(country) {
          this.search.country = country.value
          this.search.select_country = country.label
          this.getData()
        },
        handleStatusCommand(status) {
          this.search.status = status.value
          this.search.select_status = status.label
          this.getData()
        },
        selectDate(e){
          this.$refs.test.pickerVisible = true
        },
        changeDate(){
          this.search.begin = this.search.select_date[0]
          this.search.end = this.search.select_date[1]
          this.search.selectDate = this.search.select_date[0] + '-' + this.search.select_date[1]
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
.select_guojia2{
  color: rgba(63, 197, 209, 1);
  font-size: 13px;
}
.content {
  width: 100%;
  height: 100%;
  .title_box {
    height: 120px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.12);
    border-radius: 12px;
    .el-row {
      height: 120px;
      .el-col {
        height: 120px;
      }
      .first {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 120px;
        .select_guojia {
          height: 80px;
          width: 100px;
          .el-dropdown {
            color: rgba(63, 197, 209, 1);
            font-size: 13px;
          }
          p {
            font-size: 36px;
            font-weight: 500;
            color: rgba(0, 0, 0, 1);
            letter-spacing: 3px;
            margin-top: 10px;
          }
        }
      }
      .scend {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 120px;
        .select_guojia {
          height: 80px;
          width: 200px;
          .el-dropdown {
            color:rgba(248,153,0,1);
            font-size: 13px;
          }
          p {
            font-size: 36px;
            font-weight: 500;
            color: rgba(0, 0, 0, 1);
            letter-spacing: 3px;
            margin-top: 10px;
          }
        }
      }
      .third {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 120px;
        .select_guojia {
          height: 80px;
          width: 100px;
          .el-dropdown {
           color:rgba(63,197,209,1);
            font-size: 13px;
          }
          p {
            font-size: 36px;
            font-weight: 500;
            color: rgba(0, 0, 0, 1);
            letter-spacing: 3px;
            margin-top: 10px;
          }
        }
      }
    }
  }
}
.el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner{
  width: 60px;
  border: none;
  display: none;
}
date-time-picker{
  display: none;
  top: 14%;
  left: 57%;
  position: absolute;
}
</style>
