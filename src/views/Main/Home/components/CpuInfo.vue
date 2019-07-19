<template>
  <session-card class="cpu-info">
    <template #header>CPU状态</template>
    <ul>
      <li v-for="(cpu,index) of cpus"
        :key="index">
        <div>#{{index}}: {{ cpu.model }}</div>
        <div>
          <span v-for="(time,name) in cpu.times"
            :key="`${name}-${index}`">
            {{name}}:{{time}}
          </span>
        </div>
      </li>
    </ul>
  </session-card>
</template>

<script>
import SessionCard from './SessionCard'
export default {
  name: 'CpuInfo',

  components: {
    SessionCard
  },

  props: { cpus: { type: Array, default: () => [] } }
}
</script>

<style lang="scss" scoped>
</style>