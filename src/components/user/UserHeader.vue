<template>
	<div>
    <el-row>
      <el-col :span="8" class="grid-content">
        <div id="title"><b>基 于 Web 的 校 园 快 递 管 理 系 统</b></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1">
            <div class="bottom">
              <div class="block">
                <el-tooltip class="item" effect="dark" :content="userName" placement="bottom">
                  <el-avatar :size="40" :src="imgUrl"></el-avatar>
                </el-tooltip>
              </div>
            </div>
          </el-menu-item>
          <el-menu-item index="2">消息中心</el-menu-item>
          <el-submenu index="3">
            <template slot="title">我的工作台</template>
            <el-menu-item index="3-1">已入站</el-menu-item>
            <el-menu-item index="3-2">揽收</el-menu-item>
            <el-menu-item index="3-3">入站</el-menu-item>
          </el-submenu>
          <el-menu-item index="4">
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
		name: "UserHeader",
    data() {
      return {
        activeIndex: '1',
        imgUrl: '',
        userCard: '',
        userName: ''
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      exit() {
        const _this = this
        this.$axios({
          method: 'post',
          url: 'http://localhost:8080/user/exit'
        })
          .then(function (response) {
            console.log(response.data)
            if (response.data === 'exit success') {
              _this.$router.push('/')
            } else {
              console.log("退出登录失败！")
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    created() {
		  let userUrl = 'assets/image/user.png'
      this.imgUrl = require("@/" + userUrl)
    },
    mounted() {
      this.userCard = this.$store.state.userCard
      this.userName = this.$store.state.userName
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
    font: 50px Extra large;
    font-family: "微软雅黑";
    line-height: 1.7;
    text-align: center;
    color: coral;
    margin-top: 3%;
    position: absolute;
    left: 20%;
  }

  .el-menu-demo {
    position: absolute;
    right: 1%;
  }
</style>
