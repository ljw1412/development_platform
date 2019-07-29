<template>
  <div ref="echarts"
    class="echarts">
  </div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
// 引入柱状图
import('echarts/lib/chart/bar')
// 引入提示框和标题组件
import('echarts/lib/component/tooltip')
import('echarts/lib/component/title')
import {
  addResizeListener,
  removeResizeListener
} from '@/utils/resize-event.js'

export default {
  name: 'ECharts',

  props: {
    option: { type: Object, default: () => ({}) }
  },

  data() {
    return {
      echarts: null
    }
  },

  methods: {
    resize() {
      if (this.echarts) this.echarts.resize()
    }
  },

  watch: {
    option(val) {
      this.echarts.setOption(this.option)
    }
  },

  mounted() {
    this.echarts = echarts.init(this.$refs.echarts)
    addResizeListener(this.$refs.echarts, this.resize)
  },

  beforeDestroy() {
    removeResizeListener(this.$refs.echarts, this.resize)
  }
}
</script>

<style lang="scss" scoped>
</style>