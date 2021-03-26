<template>
  <div id="line" style="width: 100%; height: 100%"></div>
</template>

<script>
  import * as echarts from 'echarts'
	export default {
		name: "AdminLine",
    data() {
		  return {
        count: [19, 20, 36, 48, 52, 61, 71, 81, 69, 100, 65]
      }
    },
    methods: {
      option() {
        const _this = this
        let chartDom = document.getElementById('line')
        let myChart = echarts.init(chartDom)
        let option
        option = {
          xAxis: {
            type: 'category',
            data: ['9点', '10点', '11点', '12点', '13点', '14点', '15点', "16点", "17点", "18点", "19点"]
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
      }
    }, mounted() {
      this.option()
    }
  }
</script>

<style scoped>

</style>
