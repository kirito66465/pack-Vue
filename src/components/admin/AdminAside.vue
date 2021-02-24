<template>
  <div>
    <el-row><br></el-row>
    <el-row><br></el-row>
    <el-row>
      <el-button type="text" @click="addPack">快递入站</el-button>
    </el-row>

    <div>
      <!-- 驿站容纳空间百分百:notTotal / maxTotal -->
      <el-row>
        <el-badge :value="allTotal" class="item">
          <el-button size="small">所有快递数量</el-button>
        </el-badge>
      </el-row>
      <el-row>
        <el-badge :value="isTotal" class="item">
          <el-button size="small">已取快递数量</el-button>
        </el-badge>
      </el-row>
      <el-row>
        <el-badge :value="noTotal" class="item">
          <el-button size="small">未取快递数量</el-button>
        </el-badge>
      </el-row>
      <div class="bottom">
        <div class="block">
          <el-tooltip class="item" effect="dark" content="驿站快递容纳百分比" placement="right">
            <el-progress type="circle" :percentage="percentage" :color="colors" stroke-width="12"></el-progress>
          </el-tooltip>
        </div>
      </div>
      <el-row>
        <el-badge :value="sendSubmit" class="item">
          <el-button size="small">已提交寄件数量</el-button>
        </el-badge>
      </el-row>
      <el-row>
        <el-badge :value="sendConfirm" class="item">
          <el-button size="small">已确认寄件数量</el-button>
        </el-badge>
      </el-row>
      <el-row>
        <el-badge :value="sendPay" class="item">
          <el-button size="small">已支付寄件数量</el-button>
        </el-badge>
      </el-row>
      <el-row>
        <el-badge :value="sendOut" class="item">
          <el-button size="small">已发出寄件数量</el-button>
        </el-badge>
      </el-row>
    </div>
  </div>
</template>

<script>
	import Constant from "../pub/Constant"
  export default {
		name: "AdminAside",
    data() {
		  return {
		    baseUrl: Constant.data.baseUrl,
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
        colors: [
          {color: '#1989fa', percentage: 30},
          {color: '#5cb87a', percentage: 60},
          {color: '#ffd530', percentage: 80},
          {color: '#ff8839', percentage: 90},
          {color: '#ee2525', percentage: 100},
        ],
        // 已提交的寄件数量
        sendSubmit: 4,
        // 已确认的寄件数量
        sendConfirm: 3,
        // 已支付的寄件数量
        sendPay: 2,
        // 已发出的寄件数量
        sendOut: 1,
      }
    },
    methods: {
      getTotal() {
        let _this = this
        // 获取数量的请求
        let param = new URLSearchParams()
        let token = localStorage.getItem("token")
        param.append("token", token)
        this.$axios({
          method: 'post',
          url: _this.baseUrl + '/pack/getAdminTotalNum',
          data: param
        })
          .then(function (response) {
            console.log(response.data)
            if (response.data.result === 'get info fail') {
              _this.$notify({
                showClose: true,
                title: '警告',
                message: '登录状态失效！请重新登录！',
                type: 'warning'
              })
            } else {
              // 四舍五入保留小数点后两位
              _this.percentage = response.data.percentage.toFixed(2)
              _this.allTotal = response.data.allTotal
              _this.isTotal = response.data.isTotal
              _this.noTotal = response.data.noTotal
            }
          })
          .catch(function (error) {
            console.log(error)
            _this.$notify.error({
              showClose: true,
              title: '错误',
              message: '服务器出错啦！'
            })
          })
        this.$axios({
          method: 'post',
          url: _this.baseUrl + '/send/getTotalByAdmin',
          data: param
        })
          .then(function (response) {
            console.log(response.data)
            if (response.data.result === 'get info fail') {
              _this.$notify({
                showClose: true,
                title: '警告',
                message: '登录状态失效！请重新登录！',
                type: 'warning'
              })
            } else {
              _this.sendSubmit = response.data.sendSubmit
              _this.sendConfirm = response.data.sendConfirm
              _this.sendPay = response.data.sendPay
              _this.sendOut = response.data.sendOut
            }
          })
          .catch(function (error) {
            console.log(error)
            _this.$notify.error({
              showClose: true,
              title: '错误',
              message: '服务器出错啦！'
            })
          })
      },
      // 快递入站
      addPack() {
        let _this = this
        this.$prompt('请输入快递单号', '快递入站', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          let param = new URLSearchParams()
          let token = localStorage.getItem("token")
          param.append('id', value)
          param.append('token', token)
          _this.$axios({
            method: 'post',
            url: _this.baseUrl + '/pack/addPack',
            data: param
          })
            .then(function (response) {
              console.log(response.data)
              if (response.data === 'the package enter addr success') {
                _this.$message({
                  showClose: true,
                  message: '快递入站成功！',
                  type: 'success'
                })
                let NewPage = "_empty" + "?time=" + new Date().getTime() / 500
                _this.$router.push(NewPage)
                _this.$router.go(-1)
              } else if (response.data === 'please login to operate') {
                _this.$notify({
                  showClose: true,
                  title: '警告',
                  message: '请在登录状态操作',
                  type: 'warning'
                })
                _this.$router.push('/LoginAndRegister')
              } else {
                _this.$notify({
                  showClose: true,
                  title: '警告',
                  message: '快递入站失败！',
                  type: 'warning'
                })
              }
            })
            .catch(function (error) {
              console.log(error)
              _this.$notify.error({
                showClose: true,
                title: '错误',
                message: '服务器出错啦！'
              })
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
      }
    },
    mounted() {
		  this.getTotal()
    }
  }
</script>

<style scoped>
  .item {
    margin-top: 10px;
    margin-right: 40px;
  }

  .right {
    float: right;
    width: 60px;
  }

  .bottom {
    clear: both;
    text-align: center;
  }
</style>
