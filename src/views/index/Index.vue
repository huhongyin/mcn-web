<template>
  <el-container class="main">
    <el-aside width="242px" class="nav_list">
      <div class="img_title">
        <img :src="plat_icon" width="32" alt />
        <span class="e-menu-span" style="font-size:14px;color:#8492A6;font-weight:500;">MCN</span>
      </div>
      <el-menu
        :default-active="this.$route.path"
        class="el-menu-vertical-demo"
        router
      >
        <!-- 艺人管理 -->
        <el-submenu index="/management">
          <template slot="title">
            <img :src="userguanli_icon" width="20" style="margin-right:10px" height="20" alt />
            <span class="e-menu-span" style="font-size:14px;color:#8492A6;font-weight:400;letter-spacing:2px;color:white;">基础信息</span>
          </template>
          <el-menu-item-group class="el-item">
            <el-menu-item index="/management" class="el-item e-menu-span" style="color:#C0CCDA;font-size:13px;">主播信息</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      <!-- 签约统计 -->
      <el-submenu index="/echarts">
        <template slot="title">
          <img :src="sign_icon" width="20" style="margin-right:10px" height="20" alt />
          <span class="e-menu-span" style="font-size:14px;color:#8492A6;font-weight:400;letter-spacing:2px;color:white;">签约统计</span>
        </template>
        <el-menu-item-group class="el-item">
          <el-menu-item index="/echarts?type=sign" class="el-item e-menu-span" style="color:#C0CCDA;font-size:13px;">概况</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!-- 运营统计 -->
      <el-submenu index="/operate">
        <template slot="title">
          <img :src="yunying_icon" width="20" style="margin-right:10px" height="20" alt />
          <span class="e-menu-span" style="font-size:14px;color:#8492A6;font-weight:400;letter-spacing:2px;color:white;">运营统计</span>
        </template>
        <el-menu-item-group class="el-item">
          <el-menu-item index="/operate" class="el-item e-menu-span" style="color:#C0CCDA;font-size:13px;">概况</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
        <!-- 主页 -->
        <!-- <el-submenu index="/echarts">
          <template slot="title">
            <img :src="homepage_icon" width="20" style="margin-right:10px" height="20" alt />
            <span class="e-menu-span" style="font-size:14px;color:#8492A6;font-weight:400;letter-spacing:2px;color:white;">数据报表</span>
          </template>
          <el-menu-item-group class="el-item">
            <el-menu-item index="/echarts" class="el-item e-menu-span" style="color:#C0CCDA;font-size:13px;">概况</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group class="el-item">
            <el-menu-item index="/detail" class="el-item e-menu-span" style="color:#C0CCDA;font-size:13px;">明细报表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group class="el-item">
            <el-menu-item index="/total" class="el-item e-menu-span" style="color:#C0CCDA;font-size:13px;">汇总报表</el-menu-item>
          </el-menu-item-group>
        </el-submenu> -->
        <!-- <el-menu-item index="/echarts">
          <img :src="homepage_icon" width="20" style="margin-right:10px" height="20" alt />
          <span class="e-menu-span" slot="title" style="color:#C0CCDA;font-size:13px;font-weight:400;letter-spacing:2px;">主页</span>
        </el-menu-item> -->
        <!-- 财务结算 -->
        <el-submenu index="/finance">
          <template slot="title">
            <!-- <icon class="el-icon-tickets" style="color: gray;"></icon> -->
            <img :src="finanace_icon" width="20" style="margin-right:10px" height="20" alt />
            <span class="e-menu-span" style="font-size:14px;color:#8492A6;font-weight:400;letter-spacing:2px;color:white;">财务结算</span>
          </template>
          <el-menu-item-group class="el-item">
            <el-menu-item index="/financeDetail" class="el-item e-menu-span" style="color:#C0CCDA;font-size:13px;">概况</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <!-- 分组与平台 -->
        <el-submenu index="/department">
          <template slot="title">
            <img :src="sys_icon" width="20" style="margin-right:10px" height="20" alt />
            <span class="e-menu-span" style="font-size:14px;color:#8492A6;font-weight:400;letter-spacing:2px;color:white;">分组与平台</span>
          </template>
          <el-menu-item-group class="el-item">
            <el-menu-item index="/company" class="el-item e-menu-span" style="color:#C0CCDA;font-size:13px;">公司管理</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group class="el-item">
            <el-menu-item index="/rules" class="el-item e-menu-span" style="color:#C0CCDA;font-size:13px;">部门管理</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group class="el-item">
            <el-menu-item index="/users" class="el-item e-menu-span" style="color:#C0CCDA;font-size:13px;">用户管理</el-menu-item>
          </el-menu-item-group>
          <!-- <el-menu-item-group class="el-item">
            <el-menu-item index="/groups" class="el-item e-menu-span" style="color:#C0CCDA;font-size:13px;">运营分组</el-menu-item>
          </el-menu-item-group> -->
        </el-submenu>
        <!-- 涂鸦管理 -->
        <!-- <el-submenu index="/graffiti">
          <template slot="title">
            <img :src="tuyaguanli_icon" width="20" style="margin-right:10px" height="20" alt />
            <span class="e-menu-span" style="font-size:14px;color:#8492A6;font-weight:400;letter-spacing:2px;">涂鸦管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/graffiti">涂鸦分类</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/models">涂鸦模板</el-menu-item>
          </el-menu-item-group>
         
        </el-submenu> -->
        <!-- banner管理 -->
        <!-- <el-menu-item index="/banner">
          <img :src="bannerguanli_icon" width="20" style="margin-right:10px" height="20" alt />
          <span class="e-menu-span" slot="title" style="font-size:14px;color:#8492A6;font-weight:400;letter-spacing:2px;">Banner管理</span>
        </el-menu-item> -->
        <!-- 反馈建议 -->
        
        <!-- <el-submenu index="/feedback">
          <template slot="title">
            <img :src="tuyaguanli_icon" width="20" style="margin-right:10px" height="20" alt />
            <span class="e-menu-span" style="font-size:14px;color:#8492A6;font-weight:400;letter-spacing:2px;">帮助与反馈</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/help">帮助中心</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/suggestions">反馈建议</el-menu-item>
          </el-menu-item-group>
         
        </el-submenu> -->
        <!-- 联系我们 -->
        <!-- <el-menu-item index="/contact">
          <img :src="lianxi_icon" width="20" style="margin-right:10px" height="20" alt />
          <span class="e-menu-span" slot="title" style="font-size:14px;color:#8492A6;font-weight:400;letter-spacing:2px;">联系我们</span>
        </el-menu-item> -->
        <!-- 设备监控 -->
        <!-- <el-menu-item index="/equipment">
          <img :src="video_icon" width="20" style="margin-right:10px" height="20" alt />
          <span class="e-menu-span" slot="title" style="font-size:14px;color:#8492A6;font-weight:400;letter-spacing:2px;">设备监控</span>
        </el-menu-item> -->
        <!-- 操作日志 -->
        <!-- <el-menu-item index="/operation">
          <img :src="caozuo_icon" width="20" style="margin-right:10px" height="20" alt />
          <span class="e-menu-span" slot="title" style="font-size:14px;color:#8492A6;font-weight:400;letter-spacing:2px;">操作日志</span>
        </el-menu-item> -->
      </el-menu>
    </el-aside>
    <el-container class="container_box">
      <!-- 头部 -->
      <el-header class="header">
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <img :src="header_left_icon" style="margin-right:30px;" width="32" height="21" alt />
              <span style="font-size:24px;font-weight:500;letter-spacing:3px;">主页</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light" style="text-align:right;">
                <el-dropdown style="cursor:pointer;" trigger="click" @command="handleCommand">
                  <span class="el-dropdown-link">
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
      <el-main class="main_box">
        <router-view />
        <el-drawer
          title="相关财务统计"
          :visible.sync="drawer"
          :direction="direction"
          size="50%"
          :before-close="handleClose">
            <el-table :data="gridData" id="tongji-table">
              <el-table-column property="title" label="统计标题" width="150"></el-table-column>
              <el-table-column property="value" label="统计结果" width="200"></el-table-column>
              <el-table-column label="操作" width="200">
                <el-button @click="showDetail" size="mini" type="primary">去看看</el-button>
              </el-table-column>
            </el-table>
        </el-drawer>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
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
      drawer: false,
      direction: 'rtl',
      gridData: [
        {
          title: '流水达100万',
          value: '200人',
        }, 
        {
          title: '流水达500万',
          value: '10人',
        }, 
        {
          title: '流水达1000万',
          value: '200人',
        }, 
        {
          title: '流水达100万',
          value: '200人',
        }, 
      ],
      userInfo: JSON.parse(localStorage.getItem("user"))
    };
  },
  created(){
      this.drawer = true
  },
  methods: {
      handleClose(done) {
        done();
      },
      showDetail(){
        this.$message({
          type: 'info',
          message: '该功能暂未开放，参考艺人列表类似的列表页面，点击查看统计详情'
        })
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
    .el-menu-item-group__title{
      background: #35404F;
    }
    .el-submenu div:hover{
      background:#35404F;
    }
    li:hover{
      background:#35404F;
    }
</style>
<style lang='less' scoped>
.el-table__body-wrapper > table,.el-table__header-wrapper > table{
  width: 100%;
} 
.el-menu-item.is-active{
  box-sizing: border-box;
  color: #409EFF;
  background:#35404F;
  border-left: 4px solid #2E8CFF;
}

.el-submenu:hover{
  background:#35404F;
}

.main {
  width: 100%;
  height: 100%;
  .nav_list {
    box-sizing: border-box;
    height: 100%;
    border-right: 1px solid rgba(211, 220, 230, 1);
    background: #35404F;
    .el-item{
      background:#35404F;
    }
    .el-menu-item{
      background: #35404F;
      color: white;
    }
    .main .nav_list .el-item{
      
      background: #35404F;
    }
    .el-menu-item-group__title{
      background: #35404F;
    }
    .el-menu{
      background: #35404F;
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
      color: white;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      box-sizing: border-box;
      padding-top: 20px;
      width: 241px;
      background: #35404F;
      height: 93%;
    }
    .el-menu {
      border: none;
    }
  }
  .container_box {
    background: rgba(243, 247, 253, 1);
    .header {
      line-height: 60px;
      width: 100%;
      border-bottom: 1px solid rgba(211,220,230,1);
    }
  }
  .main_box{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 30px;
    // background: #FFFFFF;
  }
}
</style>
