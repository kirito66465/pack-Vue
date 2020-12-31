<template>
  <div>
    <el-button type="text" @click="open">快递入站</el-button>
    <div>
      <!-- 驿站容纳空间百分百:notTotal / maxTotal -->
      <el-badge :value="allTotal" class="item">
        <el-button size="small">所有快递数量</el-button>
      </el-badge>
      <div>驿站快递容纳百分比</div>
      <el-progress type="circle" :percentage="percentage" :status="status" stroke-width="12"></el-progress>
    </div>
  </div>
</template>

<script>
	export default {
		name: "AdminAside",
    data() {
		  return {
        // 所有快递数量，包括已取出和未取出的快递
        allTotal: 100,
        // 已取出的快递数量
        isTotal: 20,
        // 未取出的快递数量
        notTotal: 80,
        // 寄件的快递数量
        sendTotal: 0,
        // 驿站能容纳最大容量快递数量
        maxTotal: 2400,
        // 百分比
        percentage: 20,
        status: "success"
      }
    },
    methods: {
      getTotal() {
        let _this = this
        // 获取数量的请求
      },
      open() {
        let _this = this
        this.$prompt('请输入快递单号', '快递入站', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          let param = new URLSearchParams()
          param.append('id', value)
          _this.$axios({
            method: 'post',
            url: 'http://localhost:8080/pack/addPack',
            data: param
          })
            .then(function (response) {
              console.log(response.data)
              if (response.data === 'the package enter addr success') {
                _this.$notify({
                  title: '成功',
                  message: '快递入站成功！',
                  type: 'success'
                })
              } else {
                _this.$notify({
                  title: '警告',
                  message: '快递入站失败！',
                  type: 'warning'
                })
              }
            })
            .catch(function (error) {
              console.log(error)
              _this.$notify.error({
                title: '错误',
                message: '服务器错误！'
              })
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
      }
    }
	}
</script>

<style scoped>
  .item {
    margin-top: 10px;
    margin-right: 40px;
  }
</style>
