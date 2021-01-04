<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="驿站选择">
        <el-select v-model="form.admin" placeholder="请选择驿站" clearable>
          <el-option label="中苑" value="中苑"></el-option>
          <el-option label="西苑" value="西苑"></el-option>
          <el-option label="北苑" value="北苑"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="收件人姓名">
        <el-input v-model="form.name" clearable></el-input>
      </el-form-item>
      <el-form-item label="收件人联系方式">
        <el-input v-model="form.phone" clearable></el-input>
      </el-form-item>
      <el-form-item label="收件人地址">
        <el-input v-model="form.addr" clearable></el-input>
      </el-form-item>

      <el-form-item label="物品信息">
        <el-select v-model="form.info" placeholder="请选择物品信息" clearable>
          <el-option label="日用品" value="中苑"></el-option>
          <el-option label="食品" value="西苑"></el-option>
          <el-option label="文件" value="北苑"></el-option>
          <el-option label="衣物" value="北苑"></el-option>
          <el-option label="数码产品" value="北苑"></el-option>
          <el-option label="其他" value="北苑"></el-option>
        </el-select>
      </el-form-item>
      <el-link type="primary" :underline="false" href="#">了解禁寄物品</el-link>

      <el-form-item label="物品重量">
        <el-input-number v-model="form.weight" @change="handleChange" :min="1" :max="100" label="物品重量"></el-input-number>
      </el-form-item>
      <el-link type="primary" :underline="false" href="#">了解计费方式</el-link>

      <el-form-item>
        <el-switch
          v-model="form.hasPack"
          active-text="有原包装"
          inactive-text="无原包装">
        </el-switch>
      </el-form-item>

      <el-checkbox v-model="form.isRead">
        我已阅读并同意
        <el-link type="primary" :underline="false" href="#">
          《服务协议》
        </el-link>
      </el-checkbox>

      <el-form-item>
        <el-button type="primary" @click="onSubmit" :disabled="!form.isRead">立即下单</el-button>
      </el-form-item>




      预估运费￥8
      按{1}公斤内物品预估|运费明细 确认 取消
    </el-form>
  </div>
</template>

<script>
	export default {
		name: "UserSend",
    data() {
      return {
        form: {
          admin: '',
          name: '',
          phone: '',
          addr: '',
          info: '',
          weight: 1,
          hasPack: false,
          isRead: false
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!')
        const _this = this
        let param = new URLSearchParams()
        let token = localStorage.getItem("token")
        param.append("token", token)
        this.$axios({
          method: 'post',
          url: 'http://localhost:8080/send',
          data: param
        })
          .then(function (response) {

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
      // 物品重量计数器值改变时
      handleChange(value) {
        console.log(value);
      }
    }
	}
</script>

<style scoped>

</style>
