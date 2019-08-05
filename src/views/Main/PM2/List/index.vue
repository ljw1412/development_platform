<template>
  <div class="pm2-list">
    <div class="pm2-list__status">
      <span>当前进程数:{{count}}</span>
      <span>使用内存:{{totalUsedMemory}}</span>
      <span>CPU使用率:{{totalUsedCpu}}</span>
    </div>
    <process-info v-for="item of list"
      v-bind="item"
      :key="item.pmid"
      @stateChange="onProcessStateChange"></process-info>
  </div>
</template>

<script>
import ProcessInfo from '../components/ProcessInfo'
import Timer from '@/class/Timer'
import { formatFileSize } from '@/utils/file.js'
import { setTags } from '../helper'
export default {
  name: 'PM2List',

  components: {
    ProcessInfo
  },

  data() {
    return {
      count: 0,
      list: [],
      timer: new Timer()
    }
  },

  computed: {
    totalUsedMemory() {
      const sum = this.list.reduce((sum, b) => sum + b.memoryByte, 0)
      return formatFileSize(sum)
    },

    totalUsedCpu() {
      const sum = this.list.reduce((sum, b) => sum + b.cpuPercentage, 0)
      return (sum ? sum.toFixed(1) : 0) + '%'
    }
  },

  methods: {
    reFindList() {
      this.$callApi({
        api: 'pm2/list'
      }).then(({ count, list }) => {
        this.count = count
        this.list = list.map(item => setTags(item))
      })
    },

    onProcessStateChange() {
      this.reFindList()
    }
  },

  created() {
    this.$setPageTitle('PM2进程管理器')
    this.timer
      .setFunction(this.reFindList)
      .setDelay(5000)
      .setImmediate(true)
      .start()
  },

  beforeDestroy() {
    this.timer.stop()
  }
}
</script>

<style lang="scss" scoped>
.pm2-list {
  &__status {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-bottom: 10px;
    span {
      flex-grow: 1;
      width: 33.333%;
      text-align: center;
    }
  }
}
</style>