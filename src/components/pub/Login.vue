<template>
  <div>
    <el-form ref="form" :model="user" label-width="80px" @keydown="onSubmit">
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
  import md5 from 'js-md5'
  import Constant from "./Constant"
  export default {
    name: "Login",
    data() {
      return {
        baseUrl: Constant.data.baseUrl,
        user: {
          card: '',
          password: '',
          radio: 1
        }
      }
    },
    methods: {
      // 点击登录按钮
      onSubmit() {
        if (this.user.radio === 1) {
          this.userLogin()
        } else {
          this.adminLogin()
        }
      },
      // 学生登录
      userLogin() {
        let param = new URLSearchParams()
        let pwd = md5(this.user.password)
        param.append('card', this.user.card)
        param.append('password', pwd)
        const _this = this
        this.$axios({
          method: 'post',
          url: _this.baseUrl + '/user/login',
          data: param
        })
          .then(function (response) {
            if (response.data.result === 'login success') {
              // 将用户的 token 存储到本地 sessionStorage 中
              sessionStorage.setItem('card', _this.user.card)
              let token = response.data.token
              sessionStorage.setItem('token', token)
              _this.getUserInfo()
            } else {
              _this.$message({
                showClose: true,
                message: '账户或密码输入错误！',
                type: 'error'
              })
            }
          })
          .catch(function (error) {
            _this.$notify.error({
              showClose: true,
              title: '错误',
              message: '服务器出错啦！'
            })
          })
      },
      // 管理员登录
      adminLogin() {
        let param = new URLSearchParams()
        let pwd = md5(this.user.password)
        param.append('card', this.user.card)
        param.append('password', pwd)
        const _this = this
        this.$axios({
          method: 'post',
          url: _this.baseUrl + '/admin/login',
          data: param
        })
          .then(function (response) {
            if (response.data.result === 'login success') {
              // 将用户的 token 存储到本地 sessionStorage 中
              sessionStorage.setItem('card', _this.user.card)
              let token = response.data.token
              sessionStorage.setItem('token', token)
              _this.getAdminInfo()
            } else {
              _this.$message({
                showClose: true,
                message: '账户或密码输入错误！',
                type: 'error'
              })
            }
          })
          .catch(function (error) {
            _this.$notify.error({
              showClose: true,
              title: '错误',
              message: '服务器出错啦！'
            })
          })
      },
      // 忘记密码跳转
      forgetPwd() {
        this.$router.push('/forget-pwd')
      },
      // 获取学生信息
      getUserInfo() {
        const _this = this
        let param = new URLSearchParams()
        let token = sessionStorage.getItem("token")
        param.append('token', token)
        this.$axios({
          method: 'post',
          url: _this.baseUrl + '/user/get-info',
          data: param
        })
          .then(function (response) {
            if (response.data.result === 'get info success') {
              sessionStorage.setItem("card", response.data.user.card)
              sessionStorage.setItem("name", response.data.user.name)
              _this.$message({
                showClose: true,
                message: response.data.user.name + ', 登录成功',
                type: 'success'
              })
              _this.$router.push('/user-home/all-pack')
            } else {
              _this.$message({
                showClose: true,
                message: '请先登录！',
                type: 'warning'
              })
              _this.$router.push('/login-register')
            }
          })
          .catch(function (error) {
            _this.$notify.error({
              showClose: true,
              title: '错误',
              message: '服务器出错啦！'
            })
          })
      },
      // 获取管理员信息
      getAdminInfo() {
        const _this = this
        let param = new URLSearchParams()
        let token = sessionStorage.getItem("token")
        param.append('token', token)
        this.$axios({
          method: 'post',
          url: _this.baseUrl + '/admin/get-info',
          data: param
        })
          .then(function (response) {
            if (response.data.result === 'get info success') {
              sessionStorage.setItem("card", response.data.admin.card)
              sessionStorage.setItem("name", response.data.admin.name)
              _this.$message({
                showClose: true,
                message: response.data.admin.name + ', 登录成功',
                type: 'success'
              })
              _this.$router.push('/admin-home/echarts')
            } else {
              _this.$message({
                showClose: true,
                message: '警告,请登录！',
                type: 'warning'
              })
              _this.$router.push('/login-register')
            }
          })
          .catch(function (error) {
            _this.$notify.error({
              showClose: true,
              title: '错误',
              message: '服务器出错啦！'
            })
          })
      }
    },
    created() {
      sessionStorage.removeItem("token")
      sessionStorage.removeItem("card")
      sessionStorage.removeItem("name")

    },
    mounted() {
      sessionStorage.removeItem("token")
      sessionStorage.removeItem("card")
      sessionStorage.removeItem("name")
    }
  }
</script>

<style scoped>

</style>
