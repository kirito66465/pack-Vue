<template>
	<div>
    <el-row>
      <el-col :span="8" class="grid-content">
        <div id="title"><b>基 于 Web 的 校 园 快 递 管 理 系 统</b></div>
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
          <el-menu-item index="/admin-home/shelf" @click.native="">货架查看</el-menu-item>
          <el-submenu index="1">
            <template slot="title">快递管理</template>
            <el-menu-item index="/admin-home/all-pack" @click.native="">全部快递</el-menu-item>
            <el-menu-item index="/admin-home/is-pick" @click.native="">已取快递</el-menu-item>
            <el-menu-item index="/admin-home/no-pick" @click.native="">未取快递</el-menu-item>
            <el-menu-item index="/admin-home/collection" @click.native="">揽收快递</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">个人管理</template>
            <el-menu-item index="/admin-home/info" @click.native="">我的信息</el-menu-item>
            <el-menu-item index="/admin-home/reset-pwd" @click.native="">修改密码</el-menu-item>
            <el-menu-item index="/admin-home/pack-id" @click.native="">快递单号</el-menu-item>
            <el-menu-item index="/admin-home/echarts" @click.native="">辅助决策</el-menu-item>
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
		name: "AdminHeader",
    data() {
      return {
        baseUrl: Constant.data.baseUrl,
        imgUrl: '',
        adminCard: '',
        adminName: ''
      }
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
          url: _this.baseUrl + '/admin/logout',
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
                message: '退出登录成功！',
                type: 'success'
              })
              _this.$router.push('/')
            } else {
              _this.$message({
                showClose: true,
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
      // 获取驿站信息
      getAdminInfo() {
        this.adminCard = sessionStorage.getItem("card")
        this.adminName = sessionStorage.getItem("name")
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
    font: 30px Extra large;
    font-family: "微软雅黑";
    line-height: 1.7;
    text-align: center;
    color: #048afc;
    margin-top: 2%;
    /*position: absolute;*/
    left: 20%;
  }

  .el-menu-demo {
    position: absolute;
    right: 1%;
  }
</style>
