<template>
  <div>
    <el-container>
      <el-header>
        <user-header></user-header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <user-aside></user-aside>
        </el-aside>
        <el-main>
<!--          <user-all-pack></user-all-pack>-->
<!--          <user-is-pick></user-is-pick>-->
<!--          <user-no-pick></user-no-pick>-->
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
  export default {
    name: "UserHome",
    components: {UserNoPick, UserIsPick, UserAllPack, UserHeader, UserAside, UserSendList},
    data() {
      return {
        card: '',
        name: ''
      }
    },
    methods: {
      getUserInfo() {
        this.card = localStorage.getItem("card")
        this.name = localStorage.getItem("name")
      }
    },
    created() {
      console.log("UserHead的created时获取信息")
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
    line-height: 200px;
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
</style>
