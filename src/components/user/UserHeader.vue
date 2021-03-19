<template>
	<div>
    <el-row>
      <el-col :span="8" class="grid-content">
        <div id="title">基 于 Web 的 校 园 快 递 管 理 系 统</div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <el-menu
          :default-active="$route.path"
          class="el-menu-demo"
          router
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item>
            <div class="bottom">
              <div class="block">
                <el-tooltip class="item" effect="dark" :content="name" placement="bottom">
                  <el-avatar :size="40" :src="imgUrl"></el-avatar>
                </el-tooltip>
              </div>
            </div>
          </el-menu-item>
          <el-menu-item index="/userHome/send" @click.native="">我要寄件</el-menu-item>
          <el-submenu index="1">
            <template slot="title">快递管理</template>
            <el-menu-item index="/userHome/allPacks" @click.native="">全部快递</el-menu-item>
            <el-menu-item index="/userHome/isPacks" @click.native="">已取快递</el-menu-item>
            <el-menu-item index="/userHome/noPacks" @click.native="">未取快递</el-menu-item>
            <el-menu-item index="/userHome/sendList" @click.native="">我的寄件</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">个人管理</template>
            <el-menu-item index="/userHome/info" @click.native="">我的信息</el-menu-item>
            <el-menu-item index="/userHome/resetPwd" @click.native="">修改密码</el-menu-item>
          </el-submenu>
          <el-menu-item>
            <el-popconfirm title="确定退出登录吗？" @confirm="logout">
              <el-button type="text" slot="reference">退出</el-button>
            </el-popconfirm>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
	import Constant from "../pub/Constant"
  export default {
		name: "UserHeader",
    data() {
      return {
        baseUrl: Constant.data.baseUrl,
        imgUrl: '',
        card: '',
        name: ''
      };
    },
    methods: {
		  // 退出
      logout() {
        const _this = this
        let token = sessionStorage.getItem("token")
        let param = new URLSearchParams()
        param.append('token', token)
        const loading = this.$loading({
          lock: true,
          text: '退出登录中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.$axios({
          method: 'post',
          url: _this.baseUrl + '/user/logout',
          data: param
        })
          .then(function (response) {
            loading.close()
            if (response.data === 'exit success') {
              sessionStorage.removeItem("token")
              sessionStorage.removeItem("card")
              sessionStorage.removeItem("userCard")
              sessionStorage.removeItem("name")
              _this.$message({
                showClose: true,
                message: '退出登录成功！'
              })
              sessionStorage.removeItem("codePic")
              _this.$router.push('/')
            } else {
              _this.$notify({
                showClose: true,
                title: '警告',
                message: '退出登录失败！',
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
      },
      // 获取学生信息
      getUserInfo() {
        this.card = sessionStorage.getItem("card")
        this.name = sessionStorage.getItem("name")
      }
    },
    created() {
		  let userUrl = 'assets/image/user.png'
      this.imgUrl = require("@/" + userUrl)
      this.getUserInfo()
    },
    mounted() {
      this.getUserInfo()
    }
  }
</script>

<style scoped>
  .grid-content {
    border-radius: 4px;
    min-height: 40px;
  }

  .bottom {
    clear: both;
    text-align: center;
  }

  .item {
    margin: 4px;
  }

  #title {
    font: 20px Extra large;
    font-family: "微软雅黑";
    line-height: 1.7;
    text-align: center;
    color: coral;
    margin-top: 3%;
    /*position: absolute;*/
    left: 20%;
  }

  .el-menu-demo {
    position: absolute;
    right: 1%;
  }
</style>
