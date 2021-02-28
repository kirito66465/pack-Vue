<template>
	<div>
    <el-row>
      <el-col :span="8" :offset="8">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="学号">
            <el-input v-model="form.card" disabled></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="form.phone" disabled></el-input>
          </el-form-item>
          <el-link type="primary" :underline="false">如需更改学号和手机号，请联系管理员操作！</el-link>
          <el-form-item label="姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item
            prop="mail"
            label="邮箱"
            :rules="[{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]">
            <el-input v-model="form.mail"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="form.addr"></el-input>
          </el-form-item>
          <el-form-item label="未取快递">
            <el-input v-model="form.count" disabled></el-input>
          </el-form-item>
          <el-button type="primary" @click="onSubmit">修改信息</el-button>
        </el-form>
      </el-col>
    </el-row>

  </div>
</template>

<script>
	import Constant from "../pub/Constant"
  export default {
		name: "UserInfo",
    data() {
		  return {
		    baseUrl: Constant.data.baseUrl,
        form: {
          card: '2120170000',
          phone: '17700000000',
          name: 'kirito',
          mail: '1204505357@qq.com',
          addr: '中苑',
          count: 0
        }
      }
    },
    methods: {
		  // 获取学生信息
		  getUserInfo() {
        const _this = this
        let param = new URLSearchParams()
        let token = sessionStorage.getItem("token")
        param.append("token", token)
        this.$axios({
          method: 'post',
          url: _this.baseUrl + '/user/getInfo',
          data: param
        })
          .then(function (response) {
            // console.log(response.data)
            if (response.data.result === 'get info fail') {
              _this.$notify({
                showClose: true,
                title: '警告',
                message: '登录状态失效！请重新登录！',
                type: 'warning'
              })
            } else {
              _this.form.card = response.data.user.card
              _this.form.phone = response.data.user.phone
              _this.form.name = response.data.user.name
              _this.form.addr = response.data.user.addr
              _this.form.count = response.data.user.count
              _this.form.mail = response.data.user.mail
            }
          })
          .catch(function (error) {
            // console.log(error)
            _this.$notify.error({
              showClose: true,
              title: '错误',
              message: '服务器出错啦！'
            })
          })
      },
      // 更新提交
      onSubmit() {
        const _this = this
        let param = new URLSearchParams()
        let token = sessionStorage.getItem("token")
        param.append("token", token)
        param.append("name", this.form.name)
        param.append("addr", this.form.addr)
        param.append("mail", this.form.mail)
        this.$axios({
          method: 'put',
          url: _this.baseUrl + '/user/updateInfo',
          data: param
        })
          .then(function (response) {
            // console.log(response.data)
            if (response.data.result === 'do success') {
              _this.$message({
                showClose: true,
                message: '信息更新成功',
                type: 'success'
              })
              _this.getUserInfo()
            } else if (response.data.result === 'please login to operate') {
              _this.$notify({
                showClose: true,
                title: '警告',
                message: '请在登录状态操作!',
                type: 'warning'
              })
              _this.$router.push('/LoginAndRegister')
            } else {
              _this.$notify({
                showClose: true,
                title: '警告',
                message: '信息更新失败！',
                type: 'warning'
              })
            }
          })
          .catch(function (error) {
            // console.log(error)
            _this.$notify.error({
              showClose: true,
              title: '错误',
              message: '服务器出错啦！'
            })
          })
      }
    },
    created() {
		  this.getUserInfo()
    }
  }
</script>

<style scoped>

</style>
