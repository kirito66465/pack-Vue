<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px" :rules="rules" status-icon>
      <el-form-item label="驿站选择" prop="admin" :required="true">
        <el-select v-model="form.admin" placeholder="请选择驿站" clearable>
          <el-option label="中苑" value="中苑"></el-option>
          <el-option label="西苑" value="西苑"></el-option>
          <el-option label="北苑" value="北苑"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="收件人姓名" prop="name" :required="true">
        <el-input v-model="form.name" clearable placeholder="请输入收件人姓名"></el-input>
      </el-form-item>
      <el-form-item label="收件人联系方式" prop="phone" :required="true">
        <el-input v-model="form.phone" clearable placeholder="请输入收件人联系方式"></el-input>
      </el-form-item>
      <el-form-item label="收件人地址" prop="addr" :required="true">
        <div class="block">
          <el-cascader
            v-model="form.addr"
            clearable
            filterable
            placeholder="请选择收件省市"
            :options="region"
            :props="{ expandTrigger: 'hover' }"
            @change="handleChangeCity"></el-cascader>
        </div>
      </el-form-item>

      <el-form-item label="物品信息" prop="info" :required="true">
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

      <el-form-item label="物品重量" prop="weight" :required="true">
        <el-input-number v-model="form.weight" @change="handleChangeWeight" :min="1" :max="100" label="物品重量"></el-input-number>
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
        预估运费￥{{ form.price }}
        <el-link type="primary" :underline="false" href="#">
          运费明细
        </el-link>
      </el-form-item>



      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')" :disabled="!form.isRead">立即下单</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import qs from 'qs'
  import { regionData, CodeToText } from 'element-china-area-data'
	export default {
		name: "UserSend",
    data() {
      return {
        form: {
          admin: '',
          name: '',
          phone: '',
          addr: [],
          info: '',
          weight: 1,
          hasPack: false,
          isRead: false,
          price: 0
        },
        region: regionData,
        rules: {
          admin: [
            { required: true, message: '请选择驿站!', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入收件人姓名!', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入收件人联系方式!', trigger: 'blur' },
            { min: 8, max: 11, message: '请正确输入手机号!', trigger: 'blur' }
          ],
          addr: [
            { required: true, message: '请选择收件人地址!', trigger: 'blur' }
          ],
          info: [
            { required: true, message: '请选择物品信息!', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      onSubmit(formName) {
        const _this = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (_this.form.addr[0] === '540000' || _this.form.addr[0] === '710000' ||
              _this.form.addr[0] === '810000' || _this.form.addr[0] === '820000' ||
              _this.form.addr[0] === '') {
              _this.$message({
                showClose: true,
                message: '警告哦，无法寄到该收件地址！',
                type: 'warning'
              })
            } else {
              let token = localStorage.getItem('token')
              let addr = CodeToText[_this.form.addr[0]] + CodeToText[_this.form.addr[1]] + CodeToText[_this.form.addr[2]]
              _this.$axios({
                method: 'post',
                url: 'http://localhost:8080/send/getSendInfo',
                data: {
                  admin: _this.form.admin,
                  name: _this.form.name,
                  phone: _this.form.phone,
                  addr: addr,
                  info: _this.form.info,
                  weight: _this.form.weight,
                  price: _this.form.price,
                  token: token
                }
              })
                .then(function (response) {
                  console.log(response.data)
                  if (response.data.result === 'do success') {
                    _this.$message({
                      showClose: true,
                      message: '下单成功，请支付！',
                      type: 'success'
                    })
                    let NewPage = "_empty" + "?time=" + new Date().getTime() / 500
                    _this.$router.push(NewPage)
                    _this.$router.go(-1)
                  } else if (response.data.result === 'do fail') {
                    _this.$notify({
                      showClose: true,
                      title: '警告',
                      message: '寄件下单失败！',
                      type: 'warning'
                    })
                  } else if (response.data.result === 'please login to operate') {
                    _this.$notify({
                      showClose: true,
                      title: '警告',
                      message: '请在登录状态操作',
                      type: 'warning'
                    })
                    _this.$router.push('/LoginAndRegister')
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
            }
          } else {
            console.log('error submit!!')
            _this.$message({
              showClose: true,
              message: '警告哦，请完成寄件信息填写！',
              type: 'warning'
            })
            return false
          }
        })
      },
      handleChangeWeight(value) {
        console.log(value)
      },
      handleChangeCity(value) {
        console.log(CodeToText[value[0]])       // 省
        console.log(CodeToText[value[1]])       // 市
        console.log(CodeToText[value[2]])       // 区
      },
      setPrice() {
        const _this = this
        if (_this.form.addr[0] === '310000' || _this.form.addr[0] === '320000' || _this.form.addr[0] === '320000') {
          _this.form.price = 4 + _this.form.weight
        } else if (_this.form.addr[0] === '110000' || _this.form.addr[0] === '120000' || _this.form.addr[0] === '130000' ||
          _this.form.addr[0] === '140000' || _this.form.addr[0] === '220000' || _this.form.addr[0] === '350000' ||
          _this.form.addr[0] === '360000' || _this.form.addr[0] === '370000' || _this.form.addr[0] === '410000' ||
          _this.form.addr[0] === '420000' || _this.form.addr[0] === '430000' || _this.form.addr[0] === '440000' ||
          _this.form.addr[0] === '500000' || _this.form.addr[0] === '410000' || _this.form.addr[0] === '520000' ||
          _this.form.addr[0] === '530000') {
          _this.form.price = 3 + 10 * _this.form.weight
        } else if (_this.form.addr[0] === '540000' || _this.form.addr[0] === '710000' || _this.form.addr[0] === '810000' ||
          _this.form.addr[0] === '820000') {
          _this.form.price = 0
        } else {
          _this.form.price = 5 + 10 * _this.form.weight
        }
      }
		},
    updated() {
		  this.setPrice()
    }
  }
</script>

<style scoped>

</style>
