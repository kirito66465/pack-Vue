<template>
	<div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="原密码">
        <el-input v-model="form.oldPwd" placeholder="请输入原密码" show-password clearable type="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="form.newPwd" placeholder="请输入新密码" show-password clearable type="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="form.newPwdAgain" placeholder="请再次输入新密码" show-password clearable type="password"></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <el-input v-model="form.code" placeholder="请输入验证码"></el-input>
        <el-image
          style="width: 100px; height: 100px"
          :src="url"
          :fit="fit"
          @click="getCheckCode">
        </el-image>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :disabled="form.code === ''">修改密码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import md5 from 'js-md5'
  import Constant from "../pub/Constant"
	export default {
		name: "AdminResetPwd",
    data() {
		  return {
		    baseUrl: Constant.data.baseUrl,
		    form: {
		      oldPwd: '',
          newPwd: '',
          newPwdAgain: '',
          code: ''
        },
        fit: 'contain',
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!')
        const _this = this
        let token = localStorage.getItem("token")
        let card = localStorage.getItem("card")
        let oldPwd = md5(this.form.oldPwd)
        let newPwd = md5(this.form.newPwd)
        let param = new URLSearchParams()
        param.append('token', token)
        param.append('card', card)
        param.append('oldPwd', oldPwd)
        param.append('newPwd', newPwd)
        param.append('checkCode', this.form.code)
        this.$axios({
          method: 'post',
          url: _this.baseUrl + '/admin/resetPwd',
          data: param
        })
          .then(function (response) {
            if (response.data.result === 'update password success') {
              _this.$message({
                showClose: true,
                message: '密码修改成功',
                type: 'success'
              })
            } else if (response.data.result === 'please login to operate') {
              _this.$notify({
                showClose: true,
                title: '警告',
                message: '请在登录状态操作!',
                type: 'warning'
              })
              _this.$router.push('/LoginAndRegister')
            } else if (response.data.result === 'check code is wrong') {
              _this.$message({
                showClose: true,
                message: '验证码输入错误！',
                type: 'error'
              })
            } else if (response.data.result === 'password not same') {
              _this.$message({
                showClose: true,
                message: '原密码输入错误！',
                type: 'error'
              })
            } else if (response.data.result === 'code has expired') {
              _this.$message({
                showClose: true,
                message: '验证码已过期！',
                type: 'info'
              })
            } else {
              _this.$notify({
                showClose: true,
                title: '警告',
                message: '修改密码失败！',
                type: 'warning'
              })
            }
            _this.form.oldPwd = ''
            _this.form.newPwd = ''
            _this.form.newPwdAgain = ''
            _this.form.code = ''
            _this.getCheckCode()
            let codePic = localStorage.getItem("codePic")
            _this.url = 'data:image/png;base64,' + codePic
          })
          .catch(function (error) {
            console.log(error)
            _this.$notify.error({
              showClose: true,
              title: '错误',
              message: '服务器出错啦！'
            })
          })
      },
      getCheckCode() {
        const _this = this
        let token = localStorage.getItem("token")
        let param = new URLSearchParams()
        param.append('token', token)
        this.$axios({
          method: 'post',
          url: _this.baseUrl + '/getCheckCode',
          data: param
        })
          .then(function (response) {
            console.log(response.data)
            if (response.data.result === 'get info success') {
              localStorage.setItem("codePic", response.data.codePic)
              let codePic = response.data.codePic
              _this.url = 'data:image/png;base64,' + codePic
            } else if (response.data.result === 'please login to operate') {
              _this.$notify({
                showClose: true,
                title: '警告',
                message: '登录状态失效，请重新登录！',
                type: 'warning'
              })
              _this.$router.push('/loginAndRegister')
            } else {
              _this.$message({
                showClose: true,
                message: '获取验证码图片失败！',
                type: 'warning'
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
    },
    created() {
		  this.getCheckCode()
		  let codePic = localStorage.getItem("codePic")
		  this.url = 'data:image/png;base64,' + codePic
    }
  }
</script>

<style scoped>

</style>
