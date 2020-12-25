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
              _this.getUserInfo()
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
      },
      getUserInfo() {
        const _this = this
        this.$axios({
          method: 'post',
          url: 'http://localhost:8080/user/getInfo'
        })
          .then(function (response) {
            console.log(response.data)
            console.log(response.data.result)
            console.log("-------------1---------------")
            console.log(_this.$store.state.userName)
            _this.$store.dispatch("setUserCard", response.data.result.card)
            _this.$store.dispatch("setUserName", response.data.result.name)
            console.log("-------------2---------------")
            console.log(_this.$store.state.userName)
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    updated() {
      /*
        TODO
        OK但有问题：
        Login在updated获取信息
        UserHome在created获取信息
        UserHeader在created获取信息
        1、Login输入时每输入一个字符就向服务器发送一次请求

        Fail：345612
        Login在点击登录后，跳转到Home前进行请求信息；Login和UserHome进行了请求信息
        0、登录验证请求，输出login success
        1、UserHeader中created日志  - 无值
        2、UserHeader中mounted日志  - 无值
        3、UserHome中赋值前日志      - 无值
        4、UserHome中赋值后日志      - 有值
        5、Login中赋值前日志         - 有值
        6、Login中赋值后日志         - 无值
        7、Login中登录验证成功，跳转到Home前进行输出（5/6）
       */
      // this.getUserInfo()
    }
  }
</script>

<style scoped>

</style>
