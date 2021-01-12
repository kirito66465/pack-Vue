<template>
	<div>
    <el-button type="text" @click="dialogFormVisible = true">我要取件</el-button>
    <el-dialog title="我要取件" :visible.sync="dialogFormVisible">
      <el-form :model="pick">
        <el-form-item label="驿站地址" :label-width="formLabelWidth">
          <el-select v-model="pick.addr" placeholder="请选择驿站">
            <el-option label="中苑" value="中苑"></el-option>
            <el-option label="西苑" value="西苑"></el-option>
            <el-option label="北苑" value="北苑"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="取件码" :label-width="formLabelWidth">
          <el-input v-model="pick.code" autocomplete="off" placeholder="请输入取件码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="pickPack">确 定</el-button>
      </div>
    </el-dialog>

    <div>
      <el-badge :value="allTotal" class="item">
        <el-button size="small">所有快递数量</el-button>
      </el-badge>
      <el-badge :value="isTotal" class="item">
        <el-button size="small">已取快递数量</el-button>
      </el-badge>
      <el-badge :value="noTotal" class="item">
        <el-button size="small">未取快递数量</el-button>
      </el-badge>
      <el-badge :value="sendSubmit" class="item">
        <el-button size="small">已提交寄件数量</el-button>
      </el-badge>
      <el-badge :value="sendConfirm" class="item">
        <el-button size="small">已确认寄件数量</el-button>
      </el-badge>
      <el-badge :value="sendPay" class="item">
        <el-button size="small">已支付寄件数量</el-button>
      </el-badge>
      <el-badge :value="sendOut" class="item">
        <el-button size="small">已发出寄件数量</el-button>
      </el-badge>
    </div>
  </div>
</template>

<script>

	export default {
		name: "UserAside",
    data() {
		  return {
        dialogFormVisible: false,
        pick: {
          addr: "",
          code: ""
        },
        formLabelWidth: '120px',
        // 所有快递数量，包括已取出和未取出的快递
        allTotal: 100,
        // 已取出的快递数量
        isTotal: 20,
        // 未取出的快递数量
        noTotal: 80,
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
		  pickPack() {
        let _this = this
        let param = new URLSearchParams()
        let token = localStorage.getItem("token")
        param.append('addr', this.pick.addr)
        param.append('code', this.pick.code)
        param.append('token', token)
        this.$axios({
          method: 'post',
          url: 'http://localhost:8080/pack/pickPackByUser',
          data: param
        })
          .then(function (response) {
            console.log(response.data)
            if (response.data === 'pick up the package success') {
              _this.$message({
                showClose: true,
                message: '取件成功！',
                type: 'success'
              })
              let NewPage = "_empty" + "?time=" + new Date().getTime() / 500
              _this.$router.push(NewPage)
              _this.$router.go(-1)
            } else if (response.data === 'take over') {
              _this.$message({
                showClose: true,
                message: '代取成功!',
                type: 'success'
              })
              let NewPage = "_empty" + "?time=" + new Date().getTime() / 500
              _this.$router.push(NewPage)
              _this.$router.go(-1)
            } else if (response.data === 'not exist') {
              _this.$message({
                showClose: true,
                message: '该快递不存在！',
                type: 'warning'
              })
            } else if (response.data === 'please login to operate') {
              _this.$notify({
                showClose: true,
                title: '警告',
                message: '请在登录状态操作!',
                type: 'warning'
              })
              _this.$router.push('/LoginAndRegister')
            } else {
              _this.$notify({
                showClose: true,
                title: '警告',
                message: '取件失败！',
                type: 'warning'
              })
            }
          })
          .catch(function (error) {
            console.log(error)
            _this.$notify.error({
              showClose: true,
              title: '错误',
              message: '服务器错误！请稍后重试！'
            })
          })
        this.dialogFormVisible = false
        this.pick.addr = ""
        this.pick.code = ""
      },
      getTotal() {
        let _this = this
        // 获取数量的请求
        let param = new URLSearchParams()
        let token = localStorage.getItem("token")
        param.append("token", token)
        this.$axios({
          method: 'post',
          url: 'http://localhost:8080/pack/getUserTotalNum',
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
          url: 'http://localhost:8080/send/getTotalByUser',
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
</style>
