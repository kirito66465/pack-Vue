<template>
	<div>
    <el-container>
      <el-header>
        <admin-header></admin-header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <admin-aside></admin-aside>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
	import AdminHeader from "./AdminHeader"
  import AdminAllPack from "./AdminAllPack"
  import AdminAside from "./AdminAside";
  import AdminResetPwd from "./AdminResetPwd"
  import AdminInfo from "./AdminInfo"
  import AdminIsPick from "./AdminIsPick"
  import AdminNoPick from "./AdminNoPick"
  import AdminShelf from "./AdminShelf"
  import AdminCollection from "./AdminCollection"
  import PackId from "./PackId"
  export default {
		name: "AdminHome",
    components: {AdminAllPack, AdminHeader, AdminAside, AdminResetPwd, AdminInfo, AdminIsPick, AdminNoPick, AdminShelf, AdminCollection, PackId},
    data() {
      return {
        adminCard: '',
        adminName: ''
      }
    },
    methods: {
		  getAdminInfo() {
        this.adminCard = localStorage.getItem("card")
        this.adminName = localStorage.getItem("name")
      }
    },
    created() {
      this.getAdminInfo()
    },
    mounted() {
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
</style>
