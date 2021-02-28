<template>
	<div>
    <el-row>
      <el-col :span="8" :offset="8">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="学号">
            <el-input v-model="form.card" disabled></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="form.addr" disabled></el-input>
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
		name: "AdminInfo",
    data() {
		  return {
		    baseUrl: Constant.data.baseUrl,
        form: {
          card: '2101',
          phone: '17700000000',
          name: '中苑快递员',
          addr: '中苑',
          count: 0
        }
      }
    },
    methods: {
		  // 获取驿站信息
		  getAdminInfo() {
        const _this = this
        let param = new URLSearchParams()
        let token = sessionStorage.getItem("token")
        param.append("token", token)
        this.$axios({
          method: 'post',
          url: _this.baseUrl + '/admin/getInfo',
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
              _this.form.card = response.data.admin.card
              _this.form.phone = response.data.admin.phone
              _this.form.name = response.data.admin.name
              _this.form.addr = response.data.admin.addr
              _this.form.count = response.data.admin.count
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
        param.append("phone", this.form.phone)
        this.$axios({
          method: 'put',
          url: _this.baseUrl + '/admin/updateInfo',
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
              _this.getAdminInfo()
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
		  this.getAdminInfo()
    }
  }
</script>

<style scoped>

</style>
