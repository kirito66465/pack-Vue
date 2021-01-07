<template>
	<div>
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
      <el-form-item label="地址">
        <el-input v-model="form.addr"></el-input>
      </el-form-item>
      <el-form-item label="未取快递">
        <el-input v-model="form.count" disabled></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">更新信息</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
	export default {
		name: "UserInfo",
    data() {
		  return {
        form: {
          card: '2120170000',
          phone: '17700000000',
          name: 'kirito',
          addr: '中苑',
          count: 0
        }
      }
    },
    methods: {
		  getUserInfo() {
        const _this = this
        let param = new URLSearchParams()
        let token = localStorage.getItem("token")
        param.append("token", token)
        this.$axios({
          method: 'post',
          url: 'http://localhost:8080/user/getInfo',
          data: param
        })
          .then(function (response) {
            console.log(response.data)
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
      },
      onSubmit() {
        console.log('submit!')
      }
    },
    created() {
		  this.getUserInfo()
    }
  }
</script>

<style scoped>

</style>
