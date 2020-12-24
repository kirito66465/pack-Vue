<template>
	<div>
    <el-container>
      <el-header height="300px">
        <div>
          <div id="toLogin">
            <span>你好，请<i><router-link to="/loginAndRegister">登录</router-link></i></span>
          </div>
          <div id="title"><b>基 于 Web 的 校 园 快 递 管 理 系 统</b></div>
        </div>
      </el-header>
      <hr>
      <el-main>
        <div class="indexShow">
          <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="item in 6" :key="item">
              <h3 class="medium">{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
	export default {
		name: "Index",
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
	}
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  #title {
    font: 50px Extra large;
    font-family: "微软雅黑";
    line-height: 1.7;
    text-align: center;
    color: coral;
    margin-top: 3%;
  }

  #toLogin {
    margin-left: 96%;
  }

  body {
    background-color: #99a9bf;
  }

  .indexShow {
    width: 800px;
    position: absolute;
    left: 34%;
  }
</style>
