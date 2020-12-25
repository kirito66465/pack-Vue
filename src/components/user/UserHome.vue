<template>
  <div>
    <el-container>
      <el-header>
        <user-header></user-header>
      </el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import UserHeader from "./UserHeader";
  export default {
    name: "UserHome",
    components: {UserHeader},
    data() {
      return {
        userCard: '',
        userName: ''
      }
    },
    methods: {
      getUserInfo() {
        const _this = this
        this.$axios({
          method: 'post',
          url: 'http://localhost:8080/user/getInfo'
        })
          .then(function (response) {
            console.log(response.data)
            if (response.data.result === 'get info fail') {
              window.alert("请登录再操作！")
              _this.$router.push('/loginAndRegister')
            } else {
              console.log(response.data.result)

              console.log("-------------5---------------")
              console.log(_this.$store.state.userName)

              _this.$store.dispatch("setUserCard", response.data.result.card)
              _this.$store.dispatch("setUserName", response.data.result.name)
              _this.$store.dispatch("setUserPhone", response.data.result.phone)
              _this.$store.dispatch("setUserAddr", response.data.result.addr)
              _this.$store.dispatch("setUserCount", response.data.result.count)
              _this.userCard = _this.$store.state.userCard
              _this.userName = _this.$store.state.userName

              console.log("-------------6---------------")
              console.log(_this.$store.state.userName)
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    created() {
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
    line-height: 160px;
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
