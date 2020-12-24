<template>
  <div>
    <el-form ref="form" :model="user" label-width="80px">
      <el-form-item>
        <el-input v-model="user.card" placeholder="username" clearable size="small" type="text" style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="user.password" placeholder="password" show-password clearable size="small" type="password" style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item>
        <div style="margin-top: 20px">
          <el-radio-group v-model="user.radio" size="small">
            <el-radio :label="1" border>学生</el-radio>
            <el-radio :label="2" border>管理</el-radio>
          </el-radio-group>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
        <el-button type="primary" @click="forgetPwd">?忘记密码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        user: {
          card: '',
          password: '',
          radio: 1
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('----------login----------');
        if (this.user.radio === 1) {
          console.log("身份: user")
          this.userLogin()
        } else {
          console.log("身份: admin");
          this.adminLogin()
        }
      },
      userLogin() {
        let param = new URLSearchParams()
        param.append('card', this.user.card)
        param.append('password', this.user.password)
        const _this = this
        this.$axios({
          method: 'post',
          url: 'http://localhost:8080/user/login',
          data: param
        })
          .then(function (response) {
            console.log(response.data)
            if (response.data === 'login success') {
              _this.$router.push('/userHome')
            } else {
              alert("账户或密码输入错误！")
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      adminLogin() {
        let param = new URLSearchParams()
        param.append('card', this.user.card)
        param.append('password', this.user.password)
        const _this = this
        this.$axios({
          method: 'post',
          url: 'http://localhost:8080/admin/login',
          data: param
        })
          .then(function (response) {
            console.log(response.data)
            if (response.data === 'login success') {
              _this.$router.push('/adminHome')
            } else {
              alert("账户或密码输入错误！")
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      forgetPwd() {
        console.log("忘记密码")
        this.$router.push('/forgetPwd')
      }
    }
  }
</script>

<style scoped>

</style>
