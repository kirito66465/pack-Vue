<template>
	<div>
    <el-row>
      <el-col :span="8" :offset="8">
        <el-form ref="form" :model="form" label-width="80px" status-icon :rules="rules">
          <el-form-item label="原密码" prop="oldPwd">
            <el-input v-model="form.oldPwd" placeholder="请输入原密码" show-password clearable type="password"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPwd">
            <el-input v-model="form.newPwd" placeholder="请输入新密码" show-password clearable type="password"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPwdAgain">
            <el-input v-model="form.newPwdAgain" placeholder="请再次输入新密码" show-password clearable type="password"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-input v-model="form.code" placeholder="请输入验证码"></el-input>
            <el-image
              v-loading.lock="loading"
              style="width: 100px; height: 100px"
              :src="url"
              :fit="fit"
              @click="getCheckCode">
            </el-image>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="verify('form')" :disabled="form.code === ''">修改密码</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import md5 from 'js-md5'
  import Constant from "../pub/Constant"
	export default {
		name: "UserResetPwd",
    data() {
      let checkOldPwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入原密码'))
        } else {
          callback()
        }
      }
      let checkNewPwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'))
        } else {
          if (this.form.newPwdAgain !== '') {
            this.$refs.form.validateField('checkPass')
          }
          callback()
        }
      }
      let checkNewPwdAgain = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入新密码'))
        } else if (value !== this.form.newPwd) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      let checkCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'));
        } else {
          callback()
        }
      }
		  return {
		    baseUrl: Constant.data.baseUrl,
		    form: {
		      oldPwd: '',
          newPwd: '',
          newPwdAgain: '',
          code: ''
        },
        fit: 'contain',
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        rules: {
          oldPwd: [{validator: checkOldPwd, trigger: 'blur'}],
          newPwd: [{validator: checkNewPwd, trigger: 'blur'}],
          newPwdAgain: [{validator: checkNewPwdAgain, trigger: 'blur'}],
          code: [{validator: checkCode, trigger: 'blur'}],
        },
        loading: false
      }
    },
    methods: {
		  // 表单验证
      verify(formName) {
        const _this = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            _this.onSubmit()
          } else {
            return false
          }
        })
      },
		  // 修改密码提交
      onSubmit() {
        const _this = this
        let token = sessionStorage.getItem("token")
        let card = sessionStorage.getItem("card")
        let oldPwd = md5(this.form.oldPwd)
        let newPwd = md5(this.form.newPwd)
        let param = new URLSearchParams()
        param.append('token', token)
        param.append('card', card)
        param.append('oldPwd', oldPwd)
        param.append('newPwd', newPwd)
        param.append('checkCode', this.form.code)
        const loading = this.$loading({
          lock: true,
          text: '修改密码中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.$axios({
          method: 'put',
          url: _this.baseUrl + '/user/resetPwd',
          data: param
        })
          .then(function (response) {
            loading.close()
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
                type: 'warning'
              })
            } else if (response.data.result === 'code has expired') {
              _this.$message({
                showClose: true,
                message: '验证码已过期！',
                type: 'info'
              })
            } else if (response.data.result === 'password not same') {
              _this.$message({
                showClose: true,
                message: '原密码输入错误！',
                type: 'warning'
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
            let codePic = sessionStorage.getItem("codePic")
            _this.url = 'data:image/png;base64,' + codePic
          })
          .catch(function (error) {
            _this.$notify.error({
              showClose: true,
              title: '错误',
              message: '服务器出错啦！'
            })
          })
      },
      // 获取验证码图片
      getCheckCode() {
        const _this = this
        let token = sessionStorage.getItem("token")
        let param = new URLSearchParams()
        param.append('token', token)
        this.loading = true
        this.$axios({
          method: 'post',
          url: _this.baseUrl + '/getCheckCode',
          data: param
        })
          .then(function (response) {
            _this.loading = false
            if (response.data.result === 'get info success') {
              sessionStorage.setItem("codePic", response.data.codePic)
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
		  let codePic = sessionStorage.getItem("codePic")
		  this.url = 'data:image/png;base64,' + codePic
    }
  }
</script>

<style scoped>

</style>
