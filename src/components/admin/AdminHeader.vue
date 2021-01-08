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
                <el-tooltip class="item" effect="dark" :content="adminName" placement="bottom">
                  <el-avatar :size="40" :src="imgUrl"></el-avatar>
                </el-tooltip>
              </div>
            </div>
          </el-menu-item>
          <el-menu-item index="2">消息中心</el-menu-item>
          <el-submenu index="3">
            <template slot="title">快递管理</template>
            <el-menu-item index="/adminHome/allPacks">全部快递</el-menu-item>
            <el-menu-item>揽收快递</el-menu-item>
            <el-menu-item index="/adminHome/isPicks">未取快递</el-menu-item>
            <el-menu-item index="/adminHome/noPicks">已取快递</el-menu-item>
            <el-menu-item>货架查看</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">个人管理</template>
            <el-menu-item index="/adminHome/resetPwd" @click.native="">我的信息</el-menu-item>
            <el-menu-item index="/adminHome/info" @click.native="">修改密码</el-menu-item>
          </el-submenu>
          <el-menu-item>
            <el-popconfirm title="确定退出登录吗？" @confirm="exit">
              <el-button type="text" slot="reference">退出</el-button>
            </el-popconfirm>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
	export default {
		name: "AdminHeader",
    data() {
      return {
        imgUrl: '',
        adminCard: '',
        adminName: ''
      }
    },
    methods: {
      exit() {
        const _this = this
        let token = localStorage.getItem("token")
        let param = new URLSearchParams()
        param.append('token', token)
        this.$axios({
          method: 'post',
          url: 'http://localhost:8080/admin/exit',
          data: param
        })
          .then(function (response) {
            console.log(response.data)
            if (response.data === 'exit success') {
              localStorage.removeItem("token")
              localStorage.removeItem("card")
              localStorage.removeItem("userCard")
              localStorage.removeItem("name")
              _this.$message({
                showClose: true,
                message: '退出登录成功！'
              })
              _this.$router.push('/')
            } else {
              console.log("退出登录失败！")
              console.log("退出登录失败！")
              _this.$message({
                showClose: true,
                message: '退出登录失败！',
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
      },
      getAdminInfo() {
        this.adminCard = localStorage.getItem("card")
        this.adminName = localStorage.getItem("name")
      },
    },
    created() {
		  let adminUrl = 'assets/image/admin.png'
      this.imgUrl = require("@/" + adminUrl)
      this.getAdminInfo()
    },
    mounted() {
      this.getAdminInfo()
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
