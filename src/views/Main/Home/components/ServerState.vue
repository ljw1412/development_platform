<template>
  <div class="state">
  </div>
</template>

<script>
export default {
  name: 'ServerState',

  computed: {
    formatUptime() {
      if (!this.uptime) return ''
      return this.uptime
    }
  },

  props: {
    cpu: { type: Array, default: () => [] },
    loadAvg: { type: Array, default: () => [] },
    memory: { type: Object, default: () => ({}) },
    networkInterfaces: { type: Object, default: () => ({}) },
    uptime: { type: [Number, String], default: () => '' }
  }
}
</script>

<style lang="scss" scoped>
</style>