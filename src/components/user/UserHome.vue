<template>
  <div class="index">
    <el-container>
      <el-header>
        <user-header></user-header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <user-aside></user-aside>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import UserHeader from "./UserHeader"
  import UserAllPack from "./UserAllPack"
  import UserIsPick from "./UserIsPick"
  import UserNoPick from "./UserNoPick"
  import UserAside from "./UserAside"
  import UserSendList from "./UserSendList"
  import UserInfo from "./UserInfo"
  import UserUpdatePwd from "./UserResetPwd"
  export default {
    name: "UserHome",
    components: {UserNoPick, UserIsPick, UserAllPack, UserHeader, UserAside, UserSendList, UserInfo, UserUpdatePwd},
    data() {
      return {
        card: '',
        name: ''
      }
    },
    methods: {
      // 获取学生信息
      getUserInfo() {
        this.card = sessionStorage.getItem("card")
        this.name = sessionStorage.getItem("name")
      }
    },
    created() {
      this.getUserInfo()
    },
    mounted() {
      this.getUserInfo()
    }
  }
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 50px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    /*line-height: 160px;*/
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .index{
    height: calc(100vh);
  }

  html, body, #app, .el-container {
    height: 100%;
  }
</style>
