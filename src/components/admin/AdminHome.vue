<template>
	<div>
    <el-container>
      <el-header>
        <admin-header></admin-header>
      </el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
	import AdminHeader from "./AdminHeader";
  export default {
		name: "AdminHome",
    components: {AdminHeader},
    data() {
      return {
        adminCard: '',
        adminName: ''
      }
    },
    methods: {
		  getAdminInfo() {
        const _this = this
        this.$axios({
          method: 'post',
          url: 'http://localhost:8080/admin/getInfo'
        })
          .then(function (response) {
            console.log(response.data)
            if (response.data.result === 'get info fail') {
              window.alert("请登录再操作！")
              _this.$router.push('/loginAndRegister')
            } else {
              _this.adminCard = response.data.admin.card
              _this.adminName = response.data.admin.name
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    created() {
      this.getAdminInfo()
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
