<template>
  <div class="main_box">
    <div class="contenter_box">
      <div class="form_box">
        <!-- 标题 -->
        <p>账号密码登录</p>
        <!-- 表单 -->
        <div class="login-wrapper">
          <!-- 登录表单 -->
          <el-form
            :model="loginForm"
            status-icon
            :rules="rules"
            ref="loginForm"
            class="demo-ruleForm"
          >
          <i type="user" />
            <!-- 账号 -->
            <el-form-item prop="username">
              <el-input
                type="text"
                prefix-icon="el-icon-user-solid"
                placeholder="请输入您的账号"
                v-model="loginForm.username"
                class="username-input"
              ></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password">
              <el-input
                type="password"
                prefix-icon="el-icon-lock"
                placeholder="请输入您的密码"
                v-model="loginForm.password"
                class="username-input"
              ></el-input>
            </el-form-item>
            <!-- 记住密码 -->
            <!-- <div>
              <el-checkbox v-model="checked">记住密码</el-checkbox>
            </div> -->
            <!-- 登录按钮&重置按钮 -->
            <el-form-item class="login-btn-div">
              <el-button
                ref="loginForm"
                @click="submitForm('loginForm')"
                class="login-btn"
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
import { post} from '@/api/index.js';
import loginApi from '@/api/login.js';
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
          // { min: 3, max: 12, message: "账号长度在 3 - 12 位", trigger: "blur" }
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
      this.$refs[form].validate((valid) => {
        if (valid) {
          
				// let res = {
        //   data : {
        //     login_res: {
        //       token_type: '134213',
        //       access_token: '1q235154',
        //     },
        //     user: {
        //       id: 1,
        //       name: 'admin'
        //     }
        //   }
        // }
        
				// let token_type = res.data.login_res.token_type
				// let access_token = res.data.login_res.access_token
				// let userInfo = res.data.user

				// localStorage.setItem("token_type", token_type)
				// localStorage.setItem("access_token", access_token)
        // localStorage.setItem("user", JSON.stringify(userInfo))
        
				// this.$router.push({
				//   path: '/echarts',
        // })
        // return false

          var params = { name : this.loginForm.username, password: this.loginForm.password }
          var that = this
          post(loginApi.login, params)
            .then(function(res){
                if(res.code != 1){
                  that.$message({
                    type: 'error',
                    message: res.msg
                  })
                  return false
                }
                let token_type = res.data.login_res.token_type
                let access_token = res.data.login_res.access_token
                let userInfo = res.data.user
                localStorage.setItem("token_type", token_type)
                localStorage.setItem("access_token", access_token)
                localStorage.setItem("user", JSON.stringify(userInfo))
                that.$router.push({
                  path: '/',
                })
            })
        } else {
          this.$message({
            type: 'warning',
            message: '请输入正确的用户名或密码'
          })
          return false;
        }
      });
      // localStorage.setItem('token', 1)
      // this.$router.push({
      //   path: '/echarts',
      // })
    },
  }
};
</script>
<style lang="less" scoped>
.el-input__inner{
    -webkit-appearance: none;
    border: none;
    display: inline-block;
    height: 2.916667rem;
    line-height:2.916667rem;
    font-size: 0.9375rem;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
}
.main_box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-image: url("../../assets/imgs/robot-2.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .contenter_box {
    width: 28rem;
    height: 24rem;
    background: #fff;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 2rem;
    border-radius: 12px;
    background-color: #f8f8f8;
    .form_box {
      width: 100%;
      height: 100%;
      position: relative;
      p {
        text-align: center;
        font-size: 1.5rem;
        color: #373737;
        letter-spacing: 2px;
        margin: 0 0 3rem 0;
      }
      .login-wrapper {
        width: 24rem;
        height: 18.5rem;
        .el-form{
          width: 100%;
          height: 100%;
          .el-form-item{
            margin-bottom: 0rem;
            .el-form-item__content{
              color: red;
              height: 4.166666rem;
              line-height: 4.166666rem;
              font-size: .9375rem;
              .username-input{
                height:  4.166666rem;
                line-height: 4.166666rem;
                font-size: 0.9375rem;
                border: none;
              }
            }
          }
          .login-btn-div{
            position: absolute;
            width: 24rem;
            bottom: 1rem;
          }
        }

        .login-btn{
          width: 100%;
          height: 2.916667rem;
          border-radius: .208333rem;
          color: #fff;
          background-color: #4179f9;
          border: none;
          cursor: pointer;
          margin-top: 1.239583rem;
        }
      }
    }
  }
}
</style>

<style scoped>
/* .el-form-item__content {
  font-size: 18px;
}
.el-input {
  height: 2.916667rem;
  background: #fff;
  font-size: 0.9375rem;
}
.el-input--prefix {
  height: 2.916667rem;
  line-height: 2.916667rem;
}
.el-input__inner {
  height: 2.916667rem;
  line-height: 2.916667rem;
  font-size: 0.9375rem;
}
.el-icon-user-solid:before {
  color: #2e8cff;
  font-size: 20px;
}
.el-icon-lock:before {
  color: #2e8cff;
  font-size: 20px;
}

.el-input--prefix .el-input__inner{
  padding-left: 2rem;
} */
</style>


