<template>
  <session-card class="network-info">
    <template #header>网络接口</template>
    <el-tabs tab-position="left">
      <el-tab-pane v-for="( list, name ) of mNetwork"
        :key="name"
        :label="name">
        <pre><template v-for="item of list">{{item}}</template></pre>
      </el-tab-pane>
    </el-tabs>
  </session-card>
</template>

<script>
import SessionCard from './SessionCard'
export default {
  name: 'NetworkInfo',

  components: {
    SessionCard
  },

  props: { network: { type: Object, default: () => ({}) } },

  computed: {
    mNetwork() {
      const o = {}
      Object.keys(this.network).forEach(key => {
        o[key] = this.network[key].map(
          item => JSON.stringify(item, null, 2) + '\n'
        )
      })
      return o
    }
  }
}
</script>

<style lang="scss" scoped>
pre {
  padding: 5px;
  background-color: #002833;
  color: #839495;
}
</style>