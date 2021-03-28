<template>
  <div>
    <div style="height: 50px">
      <el-date-picker
        v-model="chosen"
        align="right"
        type="date"
        placeholder="选择日期"
        :picker-options="pickerOptions"
        @change="getInfo"
        value-format="yyyy-MM-dd">
      </el-date-picker>
    </div>
    <div style="height: 390px">
      <div id="pie" style="width: 100%; height: 100%"></div>
    </div>
    <div style="height: 390px">
      <div id="line" style="width: 100%; height: 100%"></div>
    </div>
  </div>
</template>

<script>
  import * as echarts from 'echarts'
  import Constant from "../pub/Constant";
  export default {
		name: "AdminEcharts",
    data() {
		  return {
        baseUrl: Constant.data.baseUrl,
        title: '取件时间段分布图',
        subText: '仅供参考',
        name: '取件时间',
        data: [
          {value: 1048, name: '搜索引擎'},
          {value: 735, name: '直接访问'},
          {value: 580, name: '邮件营销'},
          {value: 484, name: '联盟广告'},
          {value: 300, name: '视频广告'}
        ],
        count: [19, 20, 36, 48, 52, 61, 71, 81, 69, 100, 65],
        chosen: '2021-03-28',
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
      }
    },
    methods: {
		  // Echarts 饼图
      pie(value) {
        const _this = this
        let chartDom = document.getElementById('pie');
        let myChart = echarts.init(chartDom);
        let option;
        option = {
          title: {
            text: _this.title,
            subtext: _this.subText,
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
          },
          series: [
            {
              name: _this.name,
              type: 'pie',
              radius: '50%',
              data: value,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        option && myChart.setOption(option);
      },
      // Echarts 平滑折线图
      line(value) {
        const _this = this
        let chartDom = document.getElementById('line')
        let myChart = echarts.init(chartDom)
        let option
        option = {
          xAxis: {
            type: 'category',
            data: value
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: _this.count,
            type: 'line',
            smooth: true
          }],
          tooltip : {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          }
        };
        option && myChart.setOption(option)
      },
      // 获取数据
      getInfo() {
        const _this = this
        let param = new URLSearchParams()
        let token = sessionStorage.getItem("token")
        param.append('token', token)
        param.append('datee', this.chosen)
        const loading = this.$loading({
          lock: true,
          text: '正在获取中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.$axios({
          method: 'post',
          url: _this.baseUrl + '/echarts/get-data',
          data: param
        })
          .then(function (response) {
            loading.close()
            if (response.data.fail === 'get info fail') {
              _this.$notify({
                showClose: true,
                title: '警告',
                message: '登录状态失效，请重新登录！',
                type: 'warning'
              })
              _this.$router.push('/loginAndRegister')
            } else {
              _this.data = response.data.result.data
              _this.count = response.data.result.count
            }
          })
          .catch(function (error) {
            _this.$notify.error({
              showClose: true,
              title: '错误',
              message: '服务器出错啦！'
            })
          })
      }
    },
    created() {
		  this.getInfo()
    },
    mounted() {
      this.pie(this.data)
      this.line(this.count)
    },
    watch: {

    }
  }
</script>

<style scoped>

</style>
