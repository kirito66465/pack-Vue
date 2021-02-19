<template>
  <div>
    <el-container>
      <el-header height="300px">
        <div id="title"><b>基 于 Web 的 校 园 快 递 管 理 系 统</b></div>
      </el-header>
      <el-main>
        <div class="loginAndRegister">
          <el-tabs type="border-card" @tab-click="handleClick" :stretch="true">
            <el-tab-pane label="登录">
              <login></login>
            </el-tab-pane>
            <el-tab-pane label="注册">
              <register></register>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import Login from "./Login";
  import Register from "./Register";
  export default {
    name: "LoginAndRegister",
    components: {Register, Login},
    data() {
      return {
        activeIndex: '1'
      }
    },
    methods: {
      /*
      // 标签页点击处理
      handleClick(tab, event) {
        console.log(tab, event);
      }
       */
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

  .loginAndRegister {
    width: 500px;
    position: absolute;
    left: 40%;
  }
</style>
