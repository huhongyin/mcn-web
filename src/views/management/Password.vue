<template>
    <el-card class="box-card">
        <el-form :model="passwordForm" label-position="top" :rules="rules" ref="passwordForm" label-width="100px" class="demo-ruleForm password-form">
            <el-form-item label="" prop="o_pass">
                <span class="password-label-first">原密码：<span class="password-label-second">（请先完成密码验证）</span></span>
                <el-input type="password" v-model="passwordForm.o_pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="pass">
                <span class="password-label-first">新密码：<span class="password-label-second">（最小成都××个字符）</span></span>
                <el-input type="password" v-model="passwordForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
                <span class="password-label-first">确认新密码：<span class="password-label-second">（最大长度××个字符）</span></span>
                <el-input type="password" v-model="passwordForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="w-100" @click="submitForm('passwordForm')">确认</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
import passwordApi from '@/api/password.js';
import { fPost, get, post } from '@/api/index.js';

export default {
    data(){
            var checkOldPass = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入原密码'));
                }
                console.log('checkOldPass=' + this.isValidate)
            };
            var validatePass = (rule, value, callback) => {
                    if (value === '') {
                        callback(new Error('请输入密码'));
                    } else {
                    if (this.passwordForm.checkPass !== '') {
                        this.$refs.passwordForm.validateField('checkPass');
                    }
                console.log('validatePass=' + this.isValidate)
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                    if (value === '') {
                        callback(new Error('请再次输入密码'));
                    } else if (value !== this.passwordForm.pass) {
                        callback(new Error('两次输入密码不一致!'));
                    } else {
                        callback();
                    }
                };
        return {
            passwordForm: {
                o_pass: '',
                pass: '',
                checkPass: '',
            },
            rules: {
                pass: [
                    { required: true, message: '请输入新密码', trigger: 'blur' }
                ],
                checkPass: [
                    { required: true, message: '请再次输入新密码', trigger: 'blur' }
                ],
                o_pass: [
                    { required: true, message: '请输入原密码', trigger: 'blur' }
                ]
            },
        }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              if(this.passwordForm.pass != this.passwordForm.checkPass){
                  this.$message({
                      duration: 1000,
                      message: '两次输入密码不一致',
                      type: 'warning'
                  })
                  return false
              }
            let that = this
            var params = { o_pass: this.passwordForm.o_pass, pass: this.passwordForm.checkPass }
            fPost(passwordApi.modify, params).then((res) => {
                that.$refs[formName].resetFields()
            })
          } else {
            return false;
          }
        });
      }
    }
}
</script>

<style lang='less' scoped>
    .password-form{
        padding-top: 204px;
        padding-bottom: 206px;
        width: 800px;
        margin: 0 auto;
    }

    .password-label-first{
        color: #333333;
        font-size: 18px;
    }
    .password-label-second{
        color: #6D7278;
        font-size: 14px;
    }
</style>
