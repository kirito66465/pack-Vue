<template>
  <div>
    <el-form ref="user" :model="user" :rules="rules" label-width="80px" status-icon>
      <el-form-item prop="card" :required="true" label="学号">
        <el-input v-model="user.card" placeholder="username" clearable size="small" type="text" style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item prop="password" :required="true" label="密码">
        <el-input v-model="user.password" placeholder="password" show-password clearable size="small" type="password" style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item prop="checkPwd" :required="true" label="确认密码">
        <el-input v-model="user.checkPwd" placeholder="password again" show-password clearable size="small" type="password" style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item prop="tel" :required="true" label="手机">
        <el-input v-model="user.tel" placeholder="telephone" clearable size="small" type="text" style="width: 200px"></el-input>
      </el-form-item>

      <el-form-item
        prop="mail"
        label="邮箱"
        :rules="[{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]">
        <el-input v-model="user.mail" placeholder="email" clearable size="small" type="text" style="width: 200px"></el-input>
      </el-form-item>

      <el-form-item label="姓名">
        <el-input v-model="user.name" placeholder="name" clearable size="small" type="text" style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="user.addr" placeholder="address" clearable size="small" type="text" style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('user')">注册</el-button>
        <el-button @click="resetForm('user')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import Schema from 'async-validator'
  import md5 from "js-md5"
  import Constant from "./Constant"
  export default {
    name: "Register",
    data() {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.user.checkPwd !== '') {
            this.$refs.user.validateField('checkPwd');
          }
          callback();
        }
      }
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.user.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }
      return {
        baseUrl: Constant.data.baseUrl,
        user: {
          card: '',
          password: '',
          checkPwd: '',
          tel: '',
          mail: '',
          name: '',
          addr: ''
        },
        rules: {
          card: [
            { required: true, message: '请输入学号!', trigger: 'blur' },
            { min: 10, max: 11, message: '长度为10 个字符!', trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPwd: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          tel: [
            { required: true, message: '请输入手机号!', trigger: 'blur' },
            { min: 8, max: 11, message: '请正确输入手机号!', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.userRegister()
          } else {
            console.log('error submit!!');
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      userRegister() {
        const _this = this
        let pwd = md5(this.user.password)
        this.$axios({
          method: 'post',
          url: _this.baseUrl + '/user/register',
          data: {
            card: _this.user.card,
            password: pwd,
            phone: _this.user.tel,
            name: _this.user.name,
            addr: _this.user.addr,
            count: 0,
            mail: _this.user.mail
          }
        })
          .then(function (response) {
            console.log(response.data)
            if (response.data.result === "register success") {
              sessionStorage.setItem("card", _this.user.card)
              sessionStorage.setItem("name", _this.user.name)
              sessionStorage.setItem("token", response.data.token)
              _this.$message({
                showClose: true,
                message: '注册成功！',
                type: 'success'
              })
              _this.$router.push('/userHome')
            } else if (response.data.result === "is exist") {
              _this.$message({
                showClose: true,
                message: '此学号已注册！',
                type: 'warning'
              })
            } else {
              _this.$notify.error({
                showClose: true,
                title: '错误',
                message: '注册失败！'
              })
            }
          })
          .catch(function (error) {
            console.log(error)
            _this.$notify.error({
              showClose: true,
              title: '错误',
              message: '服务器出错啦！'
            })
          })
      }
    }
  }
</script>

<style scoped>

</style>
