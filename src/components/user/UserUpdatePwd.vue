<template>
	<div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="原密码">
        <el-input v-model="form.oldPwd" placeholder="请输入原密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="form.newPwd" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="form.newPwdAgain" placeholder="请再次输入新密码"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.phone" placeholder="请输入注册手机号"></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <el-input v-model="form.code" placeholder="请输入验证码"></el-input>
        <el-button type="primary" @click="getCode">获取验证码</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :disabled="isClick">修改密码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
	export default {
		name: "UserUpdatePwd",
    data() {
		  return {
		    form: {
		      oldPwd: '',
          newPwd: '',
          newPwdAgain: '',
          phone: '',
          code: ''
        },
        isClick: true
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!')
      },
      getCode() {
        if (this.form.code !== '') {
          this.isClick = false
        }
      }
    }
	}
</script>

<style scoped>

</style>
