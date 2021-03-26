<template>
  <div>
    <div style="height: 400px">
      <admin-pie></admin-pie>
    </div>
    <div style="height: 400px">
      <admin-line></admin-line>
    </div>
  </div>
</template>

<script>
	import AdminLine from "./AdminLine"
  import AdminPie from "./AdminPie"
  export default {
		name: "AdminEcharts",
    components: {AdminPie, AdminLine},
    data() {
		  return {

      }
    },
  }
</script>

<style scoped>

</style>
