<template>
  <div>
    <el-row>
      <el-col :span="8" :offset="8">
        <el-form ref="form" :model="form" label-width="150px" :rules="rules" status-icon>
          <el-form-item label="驿站选择" prop="admin" :required="true">
            <el-select v-model="form.admin" placeholder="请选择驿站" clearable>
              <el-option label="中苑" value="中苑"></el-option>
              <el-option label="西苑" value="西苑"></el-option>
              <el-option label="北苑" value="北苑"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="收件人姓名" prop="name" :required="true">
            <el-input v-model="form.name" clearable placeholder="请输入收件人姓名" style="width: 220px"></el-input>
          </el-form-item>
          <el-form-item label="收件人联系方式" prop="phone" :required="true">
            <el-input v-model="form.phone" clearable placeholder="请输入收件人联系方式" style="width: 220px"></el-input>
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
          <el-link type="primary" :underline="false" @click="prohibitDrawer = true">了解禁寄物品</el-link>

          <el-form-item label="物品重量" prop="weight" :required="true">
            <el-input-number v-model="form.weight" @change="handleChangeWeight" :min="1" :max="100" label="物品重量"></el-input-number>
          </el-form-item>
          <el-link type="primary" :underline="false" @click="priceTable = true">了解计费方式</el-link>

          <el-form-item label="有无原包装">
            <el-switch
              v-model="form.hasPack"
              active-text="有原包装"
              inactive-text="无原包装">
            </el-switch>
          </el-form-item>

          <el-form-item label="是否同意协议">
            <el-checkbox v-model="form.isRead">
              我已阅读并同意
              <el-link type="primary" :underline="false" href="#">
                《服务协议》
              </el-link>
            </el-checkbox>
          </el-form-item>

          <el-form-item label="预估运费">
            ￥{{ form.price }}
            <el-link type="primary" :underline="false" @click="clickPrice">
              运费明细
            </el-link>
          </el-form-item>
          <el-button type="primary" @click="onSubmit('form')" :disabled="!form.isRead">立即下单</el-button>
        </el-form>
      </el-col>
    </el-row>

    <el-drawer
      :title=priceDataTitle
      :visible.sync="priceTable"
      direction="rtl"
      size="50%">
      <el-table :data="priceData">
        <el-table-column property="province" label="省份" width="200"></el-table-column>
        <el-table-column property="code" label="区域码" width="200"></el-table-column>
        <el-table-column property="base" label="首重价格" width="200"></el-table-column>
        <el-table-column property="continue" label="续重价格" width="200"></el-table-column>
      </el-table>
    </el-drawer>

    <el-drawer
      :title=prohibitDrawerTitle
      :visible.sync="prohibitDrawer"
      direction="rtl"
      size="50%"
      style="text-align: left;font-family: 仿宋;font-size: 20px">
      <h1>一、枪支（含仿制品、主要零部件）弹药</h1><br>
      <b>1. 枪支（含仿制品、主要零部件）</b>：如手枪、步枪、冲锋枪、防暴枪、气枪、猎枪、运动枪、麻醉注射枪、钢珠枪、催泪枪等。<br>
      <b>2. 弹药（含仿制品）</b>：如子弹、炸弹、手榴弹、火箭弹、照明弹、燃烧弹、烟幕（雾）弹、信号弹、催泪弹、毒气弹、地雷、手雷、炮弹、火药等。<br>
      <h1>二、管制器具</h1><br>
      <b>1. 管制刀具</b>：如匕首、三棱刮刀、带有自锁装置的弹簧刀（跳刀）、其他相类似的单刃、双刃、三棱尖刀等。<br>
      <b>2. 其他</b>：如弩、催泪器、催泪枪、电击器等。<br>
      <h1>三、爆炸物品</h1><br>
      <b>1. 爆破器材</b>：如炸药、雷管、导火索、导爆索、爆破剂等。<br>
      <b>2. 烟花爆竹</b>：如烟花、鞭炮、摔炮、拉炮、砸炮、彩药弹等烟花爆竹及黑火药、烟火药、发令纸、引火线等。<br>
      <b>3. 其他</b>：如推进剂、发射药、硝化棉、电点火头等。<br>
      <h1>四、压缩和液化气体及其容器</h1><br>
      <b>1. 易燃气体</b>：如氢气、甲烷、乙烷、丁烷、天然气、液化石油气、乙烯、丙烯、乙炔、打火机等。<br>' +
      <b>2. 有毒气体</b>：如一氧化碳、一氧化氮、氯气等。<br>
      <b>3. 易爆或者窒息、助燃气体</b>：如压缩氧气、氮气、氦气、氖气、气雾剂等。<br>
      <h1>五、易燃液体</h1><br>
      如汽油、柴油、煤油、桐油、丙酮、乙醚、油漆、生漆、苯、酒精、松香油等。<br>
      <h1>六、易燃固体、自燃物质、遇水易燃物质</h1><br>
      <b>1. 易燃固体</b>：如红磷、硫磺、铝粉、闪光粉、固体酒精、火柴、活性炭等。<br>
      <b>2. 自燃物质</b>：如黄磷、白磷、硝化纤维（含胶片）、钛粉等。<br>
      <b>3. 遇水易燃物质</b>：如金属钠、钾、锂、锌粉、镁粉、碳化钙（电石）、氰化钠、氰化钾等。<br>
      <h1>七、氧化剂和过氧化物</h1><br>
      如高锰酸盐、高氯酸盐、氧化氢、过氧化钠、过氧化钾、过氧化铅、氯酸盐、溴酸盐、硝酸盐、双氧水等。<br>
      <h1>八、毒性物质</h1><br>
      如砷、砒霜、汞化物、铊化物、氰化物、硒粉、苯酚、汞、剧毒农药等。<br>
      <h1>九、生化制品、传染性、感染性物质</h1><br>
      如病菌、炭疽、寄生虫、排泄物、医疗废弃物、尸骨、动物器官、肢体、未经硝制的兽皮、未经药制的兽骨等。<br>
      <h1>十、放射性物质</h1><br>
      如铀、钴、镭、钚等。<br>
      <h1>十一、腐蚀性物质</h1><br>
      如硫酸、硝酸、盐酸、蓄电池、氢氧化钠、氢氧化钾等。<br>
      <h1>十二、毒品及吸毒工具、非正当用途麻醉药品和精神药品、非正当用途的易制毒化学品</h1><br>
      <b>1. 毒品、麻醉药品和精神药品</b>：如鸦片（包括罂粟壳、花、苞、叶）、吗啡、海洛因、可卡因、大麻、甲基苯丙胺（冰毒）、氯胺酮、甲卡西酮、苯丙胺、安钠咖等。<br>
      <b>2. 易制毒化学品</b>：如胡椒醛、黄樟素、黄樟油、麻黄素、伪麻黄素、羟亚胺、邻酮、苯乙酸、溴代苯丙酮、醋酸酐、甲苯、丙酮等。<br>
      <b>3. 吸毒工具</b>：如冰壶等。<br>
      <h1>十三、非法出版物、印刷品、音像制品等宣传品</h1><br>
      如含有反动、煽动民族仇恨、破坏国家统一、破坏社会稳定、宣扬邪教、宗教极端思想、淫秽等内容的图书、刊物、图片、照片、音像制品等。<br>
      <h1>十四、间谍专用器材</h1><br>
      如暗藏式窃听器材、窃照器材、突发式收发报机、一次性密码本、密写工具、用于获取情报的电子监听和截收器材等。<br>
      <h1>十五、非法伪造物品</h1><br>
      如伪造或者变造的货币、证件、公章等。<br>
      <h1>十六、侵犯知识产权和假冒伪劣物品</h1><br>
      <b>1. 侵犯知识产权</b>：如侵犯专利权、商标权、著作权的图书、音像制品等。<br>
      <b>2. 假冒伪劣</b>：如假冒伪劣的食品、药品、儿童用品、电子产品、化妆品、纺织品等。<br>
      <h1>十七、濒危野生动物及其制品</h1><br>
      如象牙、虎骨、犀牛角及其制品等。<br>
      <h1>十八、禁止进出境物品</h1><br>
      如有碍人畜健康的、来自疫区的以及其他能传播疾病的食品、药品或者其他物品；内容涉及国家秘密的文件、资料及其他物品。<br>
      <h1>十九、其他物品</h1><br>
      《危险化学品目录》《民用爆炸物品品名表》《易制爆危险化学品名录》《易制毒化学品的分类和品种目录》《中华人民共和国禁止进出境物品表》载明的物品和《人间传染的病原微生物名录》载明的第一、二类病原微生物等，以及法律、行政法规、国务院和国务院有关部门规定禁止寄递的其他物品。'
    </el-drawer>
  </div>
</template>

<script>
  import { regionData, CodeToText } from 'element-china-area-data'
  import Constant from "../pub/Constant"
	export default {
		name: "UserSend",
    data() {
      return {
        baseUrl: Constant.data.baseUrl,
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
        },
        price: {
          base: 0,
          continue: 0
        },
        priceTable: false,
        prohibitDrawer: false,
        priceData: [
          { province: '江苏', code: '310000', base: 5, continue: 1},
          { province: '上海', code: '320000', base: 5, continue: 1},
          { province: '浙江', code: '330000', base: 5, continue: 1},
          { province: '安徽', code: '340000', base: 10, continue: 8},
          { province: '北京', code: '110000', base: 13, continue: 10},
          { province: '天津', code: '120000', base: 13, continue: 10},
          { province: '河北', code: '130000', base: 13, continue: 10},
          { province: '山西', code: '140000', base: 13, continue: 10},
          { province: '吉林', code: '220000', base: 13, continue: 10},
          { province: '福建', code: '350000', base: 13, continue: 10},
          { province: '江西', code: '360000', base: 13, continue: 10},
          { province: '山东', code: '370000', base: 13, continue: 10},
          { province: '河南', code: '410000', base: 13, continue: 10},
          { province: '湖北', code: '420000', base: 13, continue: 10},
          { province: '湖南', code: '430000', base: 13, continue: 10},
          { province: '广东', code: '440000', base: 13, continue: 10},
          { province: '重庆', code: '500000', base: 13, continue: 10},
          { province: '四川', code: '510000', base: 13, continue: 10},
          { province: '贵州', code: '520000', base: 13, continue: 10},
          { province: '云南', code: '530000', base: 13, continue: 10},
          { province: '内蒙', code: '150000', base: 15, continue: 10},
          { province: '辽宁', code: '210000', base: 15, continue: 10},
          { province: '黑龙', code: '230000', base: 15, continue: 10},
          { province: '广西', code: '450000', base: 15, continue: 10},
          { province: '海南', code: '460000', base: 15, continue: 10},
          { province: '陕西', code: '610000', base: 15, continue: 10},
          { province: '甘肃', code: '620000', base: 15, continue: 10},
          { province: '青海', code: '630000', base: 15, continue: 10},
          { province: '宁夏', code: '640000', base: 15, continue: 10},
          { province: '新疆', code: '650000', base: 15, continue: 10},
          { province: '西藏', code: '540000', base: 0, continue: 0},
          { province: '台湾', code: '710000', base: 0, continue: 0},
          { province: '香港', code: '810000', base: 0, continue: 0},
          { province: '澳门', code: '820000', base: 0, continue: 0}
        ],
        priceDataTitle: '计费方式（以下区域码数据来自 airyland/china-area-data）',
        prohibitDrawerTitle: '禁寄物品'
      }
    },
    methods: {
		  // 寄件提交
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
              let token = sessionStorage.getItem('token')
              let addr = CodeToText[_this.form.addr[0]] + CodeToText[_this.form.addr[1]] + CodeToText[_this.form.addr[2]]
              _this.$axios({
                method: 'post',
                url: _this.baseUrl + '/send/getSendInfo',
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
                  // console.log(response.data)
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
                  // console.log(error)
                  _this.$notify.error({
                    showClose: true,
                    title: '错误',
                    message: '服务器出错啦！'
                  })
                })
            }
          } else {
            // console.log('error submit!!')
            _this.$message({
              showClose: true,
              message: '警告哦，请完成寄件信息填写！',
              type: 'warning'
            })
            return false
          }
        })
      },
      // 重量处理
      handleChangeWeight(value) {
        // console.log(value)
      },
      // 选择省市区处理
      handleChangeCity(value) {
        // console.log(CodeToText[value[0]])       // 省
        // console.log(CodeToText[value[1]])       // 市
        // console.log(CodeToText[value[2]])       // 区
      },
      // 运费处理
      setPrice() {
        const _this = this
        if (_this.form.addr[0] === '310000' || _this.form.addr[0] === '320000' || _this.form.addr[0] === '330000') {
          _this.form.price = 4 + _this.form.weight
          _this.price.base = 5
          _this.price.weight = 1
        } else if (_this.form.addr[0] === '110000' || _this.form.addr[0] === '120000' || _this.form.addr[0] === '130000'
          || _this.form.addr[0] === '140000' || _this.form.addr[0] === '220000' || _this.form.addr[0] === '350000'
          || _this.form.addr[0] === '360000' || _this.form.addr[0] === '370000' || _this.form.addr[0] === '410000'
          || _this.form.addr[0] === '420000' || _this.form.addr[0] === '430000' || _this.form.addr[0] === '440000'
          || _this.form.addr[0] === '500000' || _this.form.addr[0] === '410000' || _this.form.addr[0] === '510000'
          || _this.form.addr[0] === '520000' || _this.form.addr[0] === '530000') {
          _this.form.price = 3 + 10 * _this.form.weight
          _this.price.base = 13
          _this.price.weight = 10
        } else if (_this.form.addr[0] === '540000' || _this.form.addr[0] === '710000' || _this.form.addr[0] === '810000' ||
          _this.form.addr[0] === '820000') {
          _this.form.price = 0
          _this.price.base = 0
          _this.price.weight = 0
        } else if (_this.form.addr[0] === '340000') {
          _this.form.price = 2 + 8 * _this.form.weight
          _this.price.base = 10
          _this.price.weight = 8
        } else if (_this.form.addr[0] === '150000' || _this.form.addr[0] === '210000' || _this.form.addr[0] === '230000'
          || _this.form.addr[0] === '450000' || _this.form.addr[0] === '460000' || _this.form.addr[0] === '610000'
          || _this.form.addr[0] === '620000' || _this.form.addr[0] === '630000' || _this.form.addr[0] === '640000'
          || _this.form.addr[0] === '650000') {
          _this.form.price = 5 + 10 * _this.form.weight
          _this.price.base = 15
          _this.price.weight = 10
        }
      },
      // 查看运费明细
      clickPrice() {
        const _this = this
        this.$msgbox({
          title: '运费明细',
          message: '<strong>首重价格：</strong>￥' + _this.price.base
            + '<br><strong>续重价格：</strong>￥' + _this.price.continue
            + '/kg<br><strong>运费总价：</strong>￥' + _this.form.price,
          dangerouslyUseHTMLString: true,
          center: true
        })
      },
		},
    updated() {
		  this.setPrice()
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">

  /* el-drawer 内部添加滚动条 */
  .el-drawer.rtl {
    overflow: scroll;
  }

  /*.el-input__inner {*/
  /*  width: 300px;*/
  /*}*/
</style>
