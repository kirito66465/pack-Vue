<template>
	<div>
    <el-row><br></el-row>
    <el-row><br></el-row>
    <div v-show="isShow.zy">
      <el-row>
        <span>中通: </span><el-link :underline="false" @click="getPackId('ZTO')">{{ packId.zto }}</el-link>
      </el-row>
      <el-row><br></el-row>
      <el-row><br></el-row>
      <el-row>
        <span>申通: </span><el-link :underline="false" @click="getPackId('STO')">{{ packId.sto }}</el-link>
      </el-row>
      <el-row><br></el-row>
      <el-row><br></el-row>
      <el-row>
        <span>圆通: </span><el-link :underline="false" @click="getPackId('YTO')">{{ packId.yto }}</el-link>
      </el-row>
    </div>
    <div v-show="isShow.xy">
      <el-row>
        <span>京东: </span><el-link :underline="false" @click="getPackId('JD')">{{ packId.jd }}</el-link>
      </el-row>
      <el-row><br></el-row>
      <el-row><br></el-row>
      <el-row>
        <span>顺丰: </span><el-link :underline="false" @click="getPackId('SF')">{{ packId.sf }}</el-link>
      </el-row>
      <el-row><br></el-row>
      <el-row><br></el-row>
      <el-row>
        <span>韵达: </span><el-link :underline="false" @click="getPackId('YD')">{{ packId.yd }}</el-link>
      </el-row>
    </div>
    <div v-show="isShow.by">
      <el-row>
        <span>天天: </span><el-link :underline="false" @click="getPackId('TT')">{{packId.tt}}</el-link>
      </el-row>
      <el-row><br></el-row>
      <el-row><br></el-row>
      <el-row>
        <span>EMS : </span><el-link :underline="false" @click="getPackId('EMS')">{{packId.ems}}</el-link>
      </el-row>
    </div>
  </div>
</template>

<script>
  import Constant from "../pub/Constant"
	export default {
		name: "PackId",
    data() {
		  return {
        baseUrl: Constant.data.baseUrl,
        packId: {
          zto: '75422367643267',
          sto: '773072367777377',
          yto: 'YT2314067841778',
          jd: 'JD0022367889542',
          sf: 'SF1234068005544',
          yd: '4311023134584',
          tt: '88823068134988',
          ems: 'EA238299768CN'
        },
        isShow: {
          zy: false,
          xy: false,
          by: false
        }
      }
    },
    methods: {
		  // 根据快递所属公司获取对应快递单号
		  getPackId(type) {
        const _this = this
        let param = new URLSearchParams()
        param.append('type', type)
        const loading = this.$loading({
          lock: true,
          text: '随机生成中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.$axios({
          method: 'post',
          url: _this.baseUrl + '/admin/getPackId',
          data: param
        })
          .then(function (response) {
            loading.close()
            switch (type) {
              case 'ZTO': _this.packId.zto = response.data;break;
              case 'STO': _this.packId.sto = response.data;break;
              case 'YTO': _this.packId.yto = response.data;break;
              case 'JD': _this.packId.jd = response.data;break;
              case 'SF': _this.packId.sf = response.data;break;
              case 'YD': _this.packId.yd = response.data;break;
              case 'TT': _this.packId.tt = response.data;break;
              case 'EMS': _this.packId.ems = response.data;break;
              default:
                break;
            }
          })
      }
    },
    created() {
		  let card = sessionStorage.getItem("card")
      if (card === '2101') {
        this.isShow.zy = true
        this.getPackId("ZTO")
        this.getPackId("STO")
        this.getPackId("YTO")
      } else if (card === '2102') {
        this.isShow.xy = true
        this.getPackId('JD')
        this.getPackId('SF')
        this.getPackId('YD')
      } else if (card === '2103') {
        this.isShow.by = true
        this.getPackId('TT')
        this.getPackId('EMS')
      }
    }
  }
</script>

<style scoped>

</style>
