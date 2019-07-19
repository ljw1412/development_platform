<template>
  <session-card class="network-info">
    <el-tabs>
      <el-tab-pane v-for="(list,name) of network"
        :key="name"
        :label="name">
        <ul>
          <li v-for="(item,index) of list"
            :key="name+index">
            {{item}}
          </li>
        </ul>
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

  props: { network: { type: Object, default: () => ({}) } }
}
</script>

<style lang="scss" scoped>
</style>