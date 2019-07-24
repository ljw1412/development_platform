<template>
  <session-card class="server-state">
    <template #header>状态</template>
    <div class="server-state__item">
      <div>内存</div>
      <el-progress type="dashboard"
        :percentage="memoryPercentage"
        :color="colors"></el-progress>
    </div>
    <div class="server-state__item">
      <div>CPU</div>
      <el-progress type="dashboard"
        :percentage="cpuPercentage"
        :color="colors"></el-progress>
    </div>
  </session-card>
</template>

<script>
import SessionCard from './SessionCard'
export default {
  name: 'ServerState',

  components: {
    SessionCard
  },

  computed: {
    memoryPercentage() {
      if (!this.memory || !this.memory.free || !this.memory.total) return 0
      return parseInt((1 - this.memory.free / this.memory.total) * 100)
    },

    cpuPercentage() {
      if (!this.cpus || !this.cpus.length) return 0
      return parseFloat(this.cpuUtilizationRate(this.cpus))
    },

    cpuCoreCount() {
      return this.cpus ? this.cpus.length : 0
    }
  },

  data() {
    return {
      colors: [
        { color: '#5cb87a', percentage: 40 },
        { color: '#e6a23c', percentage: 60 },
        { color: '#f56c6c', percentage: 80 }
      ]
    }
  },

  methods: {
    cpuUtilizationRate(cpus) {
      const cpusUsedList = this.cpus.map(cpu => {
        const totalTick = Object.values(cpu.times).reduce((a, b) => a + b)
        const totalIdle = cpu.times.idle
        const idle = totalIdle / cpus.length
        const total = totalTick / cpus.length
        return (100 * (total - idle)) / total
      })
      return (
        cpusUsedList.reduce((a, b) => a + b) / cpusUsedList.length
      ).toFixed(1)
    }
  },

  props: {
    cpus: { type: Array, default: () => [] },
    loadAvg: { type: Array, default: () => [] },
    memory: { type: Object, default: () => ({}) },
    networkInterfaces: { type: Object, default: () => ({}) },
    uptime: { type: [Number, String], default: () => '' }
  }
}
</script>

<style lang="scss" scoped>
.server-state {
  &__item {
    display: inline-block;
    text-align: center;
    margin: 0 20px;
  }
}
</style>