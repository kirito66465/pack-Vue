<template>
  <div id="pie" style="width: 100%; height: 100%"></div>
</template>

<script>
  import * as echarts from 'echarts'
	export default {
		name: "AdminPie",
    data() {
      return {
        title: '某站点用户访问来源',
        subText: '纯属虚构',
        name: '取件时间',
        data: [
          {value: 1048, name: '搜索引擎'},
          {value: 735, name: '直接访问'},
          {value: 580, name: '邮件营销'},
          {value: 484, name: '联盟广告'},
          {value: 300, name: '视频广告'}
        ],
      }
    },
    methods: {
      option() {
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
              data: _this.data,
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
      }
    },
    mounted() {
      this.option()
    }
	}
</script>

<style scoped>

</style>
