<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    localStorage.removeItem("card")
    localStorage.removeItem("token")
  }
}
</script>

<style>
/*#app {*/
/*  font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  text-align: center;*/
/*  color: #2c3e50;*/
/*  margin-top: 60px;*/
/*}*/
  #app {
    width: 100%;
    height: 100%;
    background: url("./assets/image/bg.jpg") center center no-repeat;
    background-size: 100% 100%;
    position:absolute;
  }
</style>
