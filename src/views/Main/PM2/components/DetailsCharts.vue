<template>
  <e-charts :option="cpuChartsOption"
    height="300px"></e-charts>
</template>

<script>
export default {
  name: 'CpuCharts',

  props: {
    title: String,
    list: { type: Array, default: () => [] },
    yUnit: String
  },

  computed: {
    cpuChartsOption() {
      return {
        title: {
          top: 10,
          right: 10,
          text: this.title
        },
        grid: { containLabel: true, top: 40, bottom: 0, left: 5, right: 5 },
        tooltip: {
          trigger: 'axis',
          formatter: params => {
            return (
              params[0].name + ' ' + this.list[params[0].dataIndex].originValue
            )
          },
          axisPointer: {
            animation: false
          }
        },
        xAxis: {
          name: '时间',
          splitLine: {
            show: false
          },
          boundaryGap: false,
          data: this.list.map(item => item.time)
        },
        yAxis: {
          name: this.yUnit,
          type: 'value',
          boundaryGap: [0, '50%'],
          splitLine: {
            show: false
          }
        },
        series: [
          {
            name: '模拟数据',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            smooth: true,
            areaStyle: {},
            data: this.list.map(item => item.value)
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>