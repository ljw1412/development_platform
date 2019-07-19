<template>
  <session-card class="cpu-info">
    <template #header>CPU状态</template>
    <ul>
      <li v-for="(item,index) of cpu"
        :key="index">
        <div>#{{index}}: {{ item.model }}</div>
        <div>
          <span v-for="(time,name) in item.times"
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

  props: { cpu: { type: Array, default: () => [] } }
}
</script>

<style lang="scss" scoped>
</style>