<template>
  <el-container class="main">
      <!-- 头部 -->
      <el-header class="header">
        <el-row style="height:100%;">
          <el-col :span="12" style="height: 100%;">
            <div class="grid-content bg-purple">
              <!-- <img :src="plat_icon" width="32" alt /> -->
              <!-- <span class="e-menu-span" style="font-size:14px;color:#8492A6;font-weight:500;">MCN</span> -->
              <a href="/#/management">
                <img class="img" :src="plat_icon" alt/>
                <el-divider direction="vertical"></el-divider>
                <span class="title-web">MCN</span>
              </a>
            </div>
          </el-col>
          <el-col :span="12" style="height: 100%;">
            <div class="grid-content bg-purple-light" style="text-align:right;height: 100%;">
                <el-dropdown style="cursor:pointer;height: 100%;" trigger="click" @command="handleCommand">
                  <span class="el-dropdown-link" style="position: absolute;right: 0;width: 8rem;top: 1rem;">
                    {{ userInfo.name+'欢迎您！'}}<i class="el-icon-arrow-down el-icon--right el-icon-user-solid"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="logout">退出</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>

            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container class="container_box">
        <div style="width:10%;background:#f5f5f5;" class="nav-list-menu">
          <el-aside width="100%" class="nav_list">
            <el-menu
              :default-active="this.$route.path"
              active-text-color="#4285f4"
              class="el-menu-vertical-demo"
              router
            >
            <!-- 签约统计 -->
            <el-menu-item v-show="userInfo.department != null && (userInfo.department.type == 2 || userInfo.department.type == 4)" index="/" class="el-item e-menu-span" style="font-size:13px;"><img :src="sign_icon" width="20" style="margin-right:10px" height="20" alt />
                签约统计
              </el-menu-item>
            <!-- 运营统计 -->
            <el-menu-item v-show="userInfo.department != null && (userInfo.department.type == 1 || userInfo.department.type == 4)" index="/operate" class="el-item e-menu-span" style="font-size:13px;"><img :src="yunying_icon" width="20" style="margin-right:10px" height="20" alt />
                运营统计
              </el-menu-item>
              <!-- 财务结算 -->
            <el-menu-item v-show="userInfo.department != null && (userInfo.department.type == 3 || userInfo.department.type == 4)" index="/financeDetail" class="el-item e-menu-span" style="font-size:13px;"><img :src="finanace_icon" width="20" style="margin-right:10px" height="20" alt />
                财务结算
              </el-menu-item>
              <!-- 未读消息 -->
              <el-menu-item index="/msg" class="el-item e-menu-span" style="font-size:13px;"><img :src="msg_icon" width="20" style="margin-right:10px" height="20" alt />
                消息列表
                <el-badge :hidden="is_read" style="margin-top:-9px;" :value="msg_count"></el-badge>
              </el-menu-item>
              <!-- 数据录入 -->
              <el-submenu v-if="userInfo.department.company.type == 1" index="/data" v-show="userInfo.department != null && (userInfo.department.type == 5 || userInfo.department.type == 4)">
                <template slot="title">
                  <img :src="sys_icon" width="20" style="margin-right:10px" height="20" alt />
                  <span class="e-menu-span router-link">数据查询</span>
                </template>
                <el-menu-item-group class="el-item">
                  <el-menu-item index="/day/end" class="el-item e-menu-span" style="font-size:13px;">结算单查看</el-menu-item>
                  <el-menu-item index="/old" class="el-item e-menu-span" style="font-size:13px;">日数据查看</el-menu-item>
                  <el-menu-item index="/oldMonth" class="el-item e-menu-span" style="font-size:13px;">月数据查看</el-menu-item>
                  <el-menu-item v-if="userInfo.department.company.type == 1" index="/import" class="el-item e-menu-span" style="font-size:13px;">数据录入</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <!-- 榜单查看 -->
              <el-submenu index="/bangdan" v-show="userInfo.department != null && (userInfo.department.type == 5 || userInfo.department.type == 4|| userInfo.department.type == 1)">
                <template slot="title">
                  <img :src="bangdan_icon" width="20" style="margin-right:10px" height="20" alt />
                  <span class="e-menu-span router-link">榜单查看</span>
                </template>
                <el-menu-item-group class="el-item">
                  <el-menu-item index="/day/sign?type=2" class="el-item e-menu-span" style="font-size:13px;">签约数据排名</el-menu-item>
                  <el-menu-item index="/day/sign?type=1" class="el-item e-menu-span" style="font-size:13px;">运营数据排名</el-menu-item>
                  <el-menu-item index="/day/team" class="el-item e-menu-span" style="font-size:13px;" v-if="userInfo.is_operate_admin">团队日榜</el-menu-item>
                  <el-menu-item index="/day/company" class="el-item e-menu-span" style="font-size:13px;">公司榜</el-menu-item>
                  <el-menu-item index="/company_data" class="el-item e-menu-span" style="font-size:13px;">公司数据</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <!-- <el-menu-item index="/import" class="el-item e-menu-span" style="font-size:13px;"><img :src="import_icon" width="20" style="margin-right:10px" height="20" alt />
                数据录入
              </el-menu-item> -->
              <!-- 艺人管理 -->
              <el-submenu index="/management">
                <template slot="title">
                  <img :src="userguanli_icon" width="20" style="margin-right:10px" height="20" alt />
                  <span class="e-menu-span router-link">基础信息</span>
                </template>
                <el-menu-item-group class="el-item">
                  <el-menu-item index="/management" class="el-item e-menu-span" style="font-size:13px;">主播信息</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group class="el-item">
                  <el-menu-item index="/wait/managemant" class="el-item e-menu-span" style="font-size:13px;">待签署主播</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <!-- 分组与平台 -->
              <el-submenu index="/company" v-show="userInfo.department != null && userInfo.department.type == 4">
                <template slot="title">
                  <img :src="sys_icon" width="20" style="margin-right:10px" height="20" alt />
                  <span class="e-menu-span router-link">分组与平台</span>
                </template>
                <el-menu-item-group class="el-item">
                  <el-menu-item index="/company" class="el-item e-menu-span" style="font-size:13px;">公司管理</el-menu-item>
                  <el-menu-item index="/department" class="el-item e-menu-span" style="font-size:13px;">部门管理</el-menu-item>
                  <el-menu-item index="/guild" class="el-item e-menu-span" style="font-size:13px;">公会管理</el-menu-item>
                  <el-menu-item index="/users" class="el-item e-menu-span" style="font-size:13px;">用户管理</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <!-- 个人设置 -->
              <el-submenu index="/setting">
                <template slot="title">
                  <img :src="sys_icon" width="20" style="margin-right:10px" height="20" alt />
                  <span class="e-menu-span router-link">设置</span>
                </template>
                <el-menu-item-group class="el-item">
                  <el-menu-item index="/personalSetting" class="el-item e-menu-span" style="font-size:13px;">个人设置</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <!-- 流程列表 -->
              <el-menu-item index="/myFlow" class="el-item e-menu-span" style="font-size:13px;"><img :src="yunying_icon" width="20" style="margin-right:10px" height="20" alt />
                我的流程
              </el-menu-item>
              <!-- <el-submenu index="/flowList">
                <template slot="title">
                  <img :src="sys_icon" width="20" style="margin-right:10px" height="20" alt />
                  <span class="e-menu-span router-link">流程列表</span>
                </template>
                <el-menu-item-group class="el-item">
                  <el-menu-item index="/myFlow" class="el-item e-menu-span" style="font-size:13px;">我的流程</el-menu-item>
                </el-menu-item-group>
              </el-submenu> -->
              <!-- 自动签 -->
              <el-submenu index="/auto_sign">
                <template slot="title">
                  <img :src="sys_icon" width="20" style="margin-right:10px" height="20" alt />
                  <span class="e-menu-span router-link">自动签</span>
                </template>
                <el-menu-item-group class="el-item">
                  <el-menu-item index="/flowConfig" class="el-item e-menu-span" style="font-size:13px;">流程管理</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group class="el-item">
                  <el-menu-item index="/template" class="el-item e-menu-span" style="font-size:13px;">合同模板</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group class="el-item">
                  <el-menu-item index="/auto/sign" class="el-item e-menu-span" style="font-size:13px;">签约主播</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-aside>
        </div>
        <el-main class="main_box">
          <router-view />
        </el-main>
      </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      bangdan_icon: require("../../assets/imgs/bangdan.png"),
      plat_icon: require("../../assets/imgs/plat_icon.png"),
      sign_icon: require("../../assets/imgs/sign_data.png"),
      yunying_icon: require("../../assets/imgs/yunying_data.png"),
      finanace_icon: require("../../assets/imgs/finance_icon.png"),
      sys_icon: require("../../assets/imgs/sys_icon.png"),
      homepage_icon: require("../../assets/imgs/homepage.png"),
      userguanli_icon: require("../../assets/imgs/userguanli.png"),
      tuyaguanli_icon: require("../../assets/imgs/tuyaguanli.png"),
      bannerguanli_icon: require("../../assets/imgs/bannerguanli.png"),
      video_icon: require("../../assets/imgs/video.png"),
      lianxi_icon: require("../../assets/imgs/lianxi.png"),
      fankui_icon: require("../../assets/imgs/fankui.png"),
      caozuo_icon: require("../../assets/imgs/caozuo.png"),
      header_left_icon: require("../../assets/imgs/header_left.png"),
      msg_icon: require("../../assets/imgs/msg.png"),
      import_icon: require("../../assets/imgs/import.png"),
      direction: 'rtl',
      userInfo: JSON.parse(localStorage.getItem("user")),
      is_read: false,
      msg_count: 9
    };
  },
  created(){
    if(this.userInfo == null){
      this.$router.push({
					path: '/login',
        })
        return false
    }
    if(this.userInfo == null || this.userInfo.department == null){
      this.$router.push({
        path: "/management",
      })
    }
    let is_read = localStorage.getItem('is_read')
    if(typeof(is_read) != 'undefined' && is_read == 1){
      this.is_read = true
    }
  },
  methods: {
      handleClose(done) {
        done();
      },
      handleCommand(command) {
        switch(command){
          case 'logout':
              this.logout()
            break;
        }
      },
      logout(){
        this.$message({
          type: 'success', 
          message: '退出成功',
          duration: 1000,
        })
        localStorage.removeItem("token_type")
        localStorage.removeItem("access_token", "")
        localStorage.removeItem("user")
        this.$router.push({
          path: '/login',
        })
      },
    // handleOpen(key, keyPath) {
    //   console.log(key, keyPath);
    // },
    // handleClose(key, keyPath) {
    //   console.log(key, keyPath);
    // }
  }
};
</script>
<style>
    body{
      overflow-x: scroll;
    }
    .el-button--primary{
      background-color: #4285f4;
      border-color:#4285f4;
      border-radius:2px;
    }
    .nav_list{
      background: #f5f5f5;
    }
    
    .el-menu-vertical-demo > .el-submenu > .el-submenu__title:hover{ background: #ccc };
    .el-menu-vertical-demo > .el-submenu > .el-menu--inline > .el-menu-item-group > ul > li:hover{ background: #ccc };
</style>
<style lang='less' scoped>
@media screen and (max-width: 415px) {
  .nav-list-menu {
    display: none;
  }
}
.el-table__body-wrapper > table,.el-table__header-wrapper > table{
  width: 100%;
} 
.el-menu-item .is-active{
  box-sizing: border-box;
  background:#ccc;
}

.main {
  width: 100%;
  height: 100%;
  .nav_list {
    overflow-x: hidden;
    box-sizing: border-box;
    height: 100%;
    border-right: 1px solid rgba(211, 220, 230, 1);
    background: #f5f5f5;
    .el-item{
      background:#35404F;
    }
    .el-menu-item{
      background: #eeeeee;
      color: white;
    }
    .main .nav_list .el-item{
      
      background: #35404F;
    }
    .el-menu{
      border: none;
      background: #f5f5f5;
      ul{
          border-top: 1px solid #e6e6e6;
          border-bottom: 1px solid #e6e6e6;
        li{
          background: #eeeeee;
        }
      }
      .el-menu--inline{
        li{
          ul{
            li:hover{
              background: #ccc;
            }
          }
        }
      }
    }
    .img_title {
      display: flex;
      box-sizing: border-box;
      padding-top: 20px;
      width: 55%;
      height: 7%;
      align-items: center;
      margin: auto;
      img {
        margin-right: 10px;
      }
    }
    .e-menu-span{
      color: dimgray;
    }
    .router-link{
      font-size:14px;
      color:#8492A6;
      font-weight:400;
      letter-spacing:2px;
      color:dimgray;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      box-sizing: border-box;
      padding-top: 20px;
      width: 100%;
      background: #f5f5f5;
      height: auto;
    }
    
  }

  .header {
    width: 100%;
    background-color: #ffffff;
    border-bottom: 1px solid rgba(211,220,230,1);

    .grid-content{
      height: 100%;
    }
    .el-divider--vertical{
      position: absolute;
      top: .9rem;
      left: 2.5rem;
      width:.05rem;
      height:2rem;
      margin:0 .4rem;
    }
    .img{
        position: absolute;
        width: 2.5rem;
        height: 1.8rem;
        top: 1rem;
    }

    .title-web{
      position: absolute;
      font-size: 1.8rem;
      left: 3.3rem;
      color: #706e6e;
      top: .5rem;
    }
  }
  .container_box {
    background: #eee;
  }
  .main_box{
    padding: 1.6%;
    // width: 84%;
    // height: 100%;
    // box-sizing: border-box;
    // position: absolute;
    // left: 14%;
    // padding-top: 5%;
    // overflow-y: scroll;
    // margin-left: 2%;
  }
}
</style>
