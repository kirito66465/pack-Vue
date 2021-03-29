<template>
  <div>
    <el-container>
      <el-header height="300px">
        <div id="title"><b>基 于 Web 的 校 园 快 递 管 理 系 统</b></div>
      </el-header>
      <el-main style="height: 500px">
        <div style="height: 300px">
          <el-row>
            <el-col :span="8"><div class="grid-content"></div></el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-steps :active="active" finish-status="success" align-center>
                  <el-step title="请输入学号"></el-step>
                  <el-step title="请输入手机号"></el-step>
                  <el-step title="请重新设置密码"></el-step>
                </el-steps>
              </div>
            </el-col>
            <el-col :span="8"><div class="grid-content"></div></el-col>
          </el-row>
          <el-row>
            <el-col :span="8"><div class="grid-content"></div></el-col>
            <el-col :span="8"><div class="grid-content"></div></el-col>
            <el-col :span="8"><div class="grid-content"></div></el-col>
          </el-row>
          <el-row style="height: 150px">
            <el-col :span="11"><div class="grid-content"></div></el-col>
            <el-col :span="4">
              <div class="grid-content">
                <el-form v-if="active === 0" ref="user" :model="user" :rules="rules">
                  <el-form-item :required="true" label=" " prop="card">
                    <el-input v-model="user.card" placeholder="请输入学号" clearable size="small" type="text" style="width: 200px"></el-input>
                  </el-form-item>
                </el-form>
                <el-form v-if="active === 1" ref="user" :model="user" :rules="rules">
                  <el-form-item :required="true" label=" " prop="phone">
                    <el-input v-model="user.phone" placeholder="请输入注册时手机号" clearable size="small" type="text" style="width: 200px"></el-input>
                  </el-form-item>
                </el-form>
                <el-form v-if="active === 2" ref="user" :model="user" :rules="rules">
                  <el-form-item :required="true" label=" " prop="password">
                    <el-input v-model="user.password" placeholder="请输入密码" show-password clearable size="small" type="text" style="width: 200px"></el-input>
                  </el-form-item>
                  <el-form-item :required="true" label=" " prop="checkPwd">
                    <el-input v-model="user.checkPwd" placeholder="请再次输入密码" show-password clearable size="small" type="text" style="width: 200px"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </el-col>
            <el-col :span="9"><div class="grid-content"></div></el-col>
          </el-row>
          <el-row>
            <el-col :span="11"><div class="grid-content"></div></el-col>
            <el-col :span="5">
              <div class="grid-content">
                <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
                <el-button style="margin-top: 12px;" @click="submit" ref="btn" :disabled="active !== 2">提交</el-button>
              </div>
            </el-col>
            <el-col :span="9"><div class="grid-content"></div></el-col>
          </el-row>
        </div>
      </el-main>
    </el-container>
  </div>

</template>

<script>
	import md5 from "js-md5"
  import Constant from "./Constant"
  export default {
		name: "ForgetPwd",
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
        active: 0,
        user: {
          card: '',
          phone: '',
          password: '',
          checkPwd: ''
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
      };
    },
    methods: {
		  // 下一项
      next() {
        const _this = this
        this.$refs['user'].validate((valid) => {
          if (valid) {
            _this.active++
            if (_this.active > 2) {
              _this.active = 0
            }
          } else {
            return false
          }
        })
      },
      // 忘记密码提交
      submit() {
        const _this = this
        this.$refs['user'].validate((valid) => {
          if (valid) {
            _this.forgetPwd()
          } else {
            return false
          }
        })
      },
      // 忘记密码请求
      forgetPwd() {
        let param = new URLSearchParams()
        let pwd = md5(this.user.password)
        param.append('card', this.user.card)
        param.append('phone', this.user.phone)
        param.append('password', pwd)
        const _this = this
        const loading = this.$loading({
          lock: true,
          text: '重置密码中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.$axios({
          method: 'put',
          url: _this.baseUrl + '/user/forgetPwd',
          data: param
        })
          .then(function (response) {
            loading.close()
            if (response.data.result === 'update password success') {
              _this.$message({
                showClose: true,
                message: '重置密码成功！',
                type: 'success'
              })
              sessionStorage.setItem("token", response.data.token)
              sessionStorage.setItem("card", _this.user.card)
              sessionStorage.setItem("name", response.data.name)
              _this.$router.push('/user-home/all-pack')
            } else if (response.data.result === 'not exist') {
              _this.$message({
                showClose: true,
                message: '学号/手机号输入错误，或者用户不存在！',
                type: 'warning'
              })
            } else {
              _this.$notify({
                showClose: true,
                title: '警告',
                message: '重置密码失败！',
                type: 'warning'
              })
            }
          })
          .catch(function (error) {
            _this.$notify.error({
              showClose: true,
              title: '错误',
              message: '服务器错误！'
            })
          })
      }
    }
	}
</script>

<style scoped>
  #title {
    font: 50px Extra large;
    font-family: "微软雅黑";
    line-height: 1.7;
    text-align: center;
    color: coral;
    margin-top: 3%;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>
