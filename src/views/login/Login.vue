<template>
  <div class="main_box">
    <div class="contenter_box">
      <div class="form_box">
        <!-- 标题 -->
        <p>MCN后台管理系统</p>
        <!-- 表单 -->
        <div class="login-wrapper">
          <!-- 登录表单 -->
          <el-form
            :model="loginForm"
            status-icon
            style="margin:auto"
            :rules="rules"
            ref="loginForm"
            class="demo-ruleForm"
          >
          <Icon type="user" />
            <!-- 账号 -->
            <el-form-item prop="username">
              <el-input
                type="text"
                prefix-icon="el-icon-user-solid"
                placeholder="请输入您的账号"
                v-model="loginForm.username"
                style="height: 70px;line-height:70px;font-size:18px;"
              ></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password">
              <el-input
                type="password"
                prefix-icon="el-icon-lock"
                placeholder="请输入您的密码"
                v-model="loginForm.password"
                style="height: 70px;line-height:70px;font-size:18px;"
              ></el-input>
            </el-form-item>
            <!-- 记住密码 -->
            <!-- <div>
              <el-checkbox v-model="checked">记住密码</el-checkbox>
            </div> -->
            <!-- 登录按钮&重置按钮 -->
            <el-form-item>
              <el-button
                ref="loginForm"
                @click="submitForm('loginForm')"
                style="width:100%;
                height:70px;
                font-size:21px;
                letter-spacing:2px;
                margin-top:70px;
                border-radius:10px;"
                type="primary"
              >立即登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    // 包含特殊字符的函数
    const checkSpecificKey = str => {
      var specialKey =
        "[`~!#$^&*()=|{}':;',\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘'";
      for (var i = 0; i < str.length; i++) {
        if (specialKey.indexOf(str.substr(i, 1)) != -1) {
          return false;
        }
      }
      return true;
    };
    // 验证密码的函数
    const pass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 3 || value.length > 12) {
        callback(new Error("密码长度 3 - 12 位"));
      } else if (!checkSpecificKey(value)) {
        callback(new Error("密码不能包含特殊字符"));
      } else {
        if (this.loginForm.checkPwd !== "") {
          // 如果确认密码不为空
          this.$refs.loginForm.validateField("checkPwd"); // 调用确认密码的验证（一致性验证）
        }
        // 成功的回调
        callback();
      }
    };
    return {
      // 登录表单的数据
      loginForm: {
        username: "",
        password: "",
        checkPwd: ""
      },
      // 验证的规则（一份数据）
      rules: {
        // 验证用户名
        username: [
          // 非空验证
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 12, message: "账号长度在 3 - 12 位", trigger: "blur" }
        ],
        // 验证密码
        password: [
          // 非空验证
          { required: true, validator: pass, trigger: "blur" }
        ]
        /* 
        验证规则字段说明：
            { required: true/false 必填,   message: "错误的提示信息", trigger: "触发验证的方式" }
            { min: 最小长度, max: 最大长度, message: "错误的提示信息", trigger: "触发验证的方式" }
            { validator： 自定义验证规则函数名，  trigger: 'blur'}
        */
      }
    };
  },
  methods:{
    submitForm(form){
      localStorage.setItem('token', 1)
      this.$router.push({
        path: '/echarts',
      })
    },
  }
};
</script>

<style lang="less" scoped>
.main_box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-image: url("../../assets/imgs/robot.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .contenter_box {
    width: 674px;
    height: 689px;
    background: #fff;
    box-sizing: border-box;
    padding: 100px 104px;
    border-radius: 12px;
    .form_box {
      width: 100%;
      height: 100%;

      p {
        text-align: center;
        font-size: 34px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        letter-spacing: 2px;
      }
      .login-wrapper {
        margin-top: 100px;
        width: 100%;
      }
    }
  }
}
</style>

<style scoped>
.el-form-item__content {
  font-size: 18px;
}
.el-input {
  height: 70px;
  background: #fff;
  font-size: 18px;
}
.el-input--prefix {
  height: 70px;
}
.el-input__inner {
  height: 70px;
  line-height: 70px;
  font-size: 18px;
}
.el-icon-user-solid:before {
  color: #2e8cff;
  font-size: 20px;
}
.el-icon-lock:before {
  color: #2e8cff;
  font-size: 20px;
}
</style>


