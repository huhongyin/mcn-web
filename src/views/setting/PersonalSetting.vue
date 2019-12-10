<template>
    <el-card class="box-card">
        <div class="clearfix" slot="header">个人设置</div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="真实姓名">
            <el-input v-model="form.rel_name"></el-input>
          </el-form-item>
          <el-form-item label="登录账号">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input v-model="form.c_password" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
import {get, post} from '@/api/index.js';
import settingApi from '@/api/setting.js';

export default {
    data() {
      return {
        form: {
          id: '',
          name: '',
          rel_name: '',
          password: '',
          c_password: '',
        }
      }
    },
    created(){
      this.getInfo()
    },
    methods: {
      getInfo(){
        get(settingApi.userInfo).then((res) => {
          this.form = res.data.info
        })
      },
      onSubmit(){
        if(this.form.password != '' && this.form.c_password != '' && this.form.password != null && this.form.c_password != null && typeof this.form.password != 'undefined' && typeof this.form.c_password != 'undefined'){
          if(this.form.password != this.form.c_password){
            this.$message.error("两次输入的密码不一致");
            return false;
          }
          if(this.form.password.length < 6 || this.form.password.length > 10){
            this.$message.error("密码长度是6-10位之间");
          }
        }

        post(settingApi.updateUser, this.form).then((res) => {
          this.$message.success(res.msg)
        })
      },
    }
}
</script>