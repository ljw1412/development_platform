<template>
  <div class="home main-content-wrapper">
    <server-info v-bind="base"
      :uptime="state.uptime"></server-info>
    <server-state v-bind="state"></server-state>
    <cpu-info :cpus="state.cpus || []"></cpu-info>
    <network-info :network="state.networkInterfaces||{}"></network-info>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Timer from '@/class/Timer'
import ServerInfo from './components/ServerInfo'
import ServerState from './components/ServerState'
import CpuInfo from './components/CpuInfo'
import NetworkInfo from './components/NetworkInfo'
export default {
  name: 'home',

  components: {
    ServerInfo,
    ServerState,
    CpuInfo,
    NetworkInfo
  },

  data() {
    return {
      timer: new Timer(5000, true, this.reFindState, 'state'),
      base: { os: '', hostname: '' },
      state: {}
    }
  },

  methods: {
    reFindState(action) {
      this.$callApi({
        api: 'system',
        param: { action }
      }).then(data => {
        this[action] = data
      })
    }
  },

  created() {
    this.reFindState('base')
    this.timer.start()
  },

  beforeDestroy() {
    this.timer.stop()
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/index.scss';
.home {
  margin: 16px 24px;
  * {
    color: $--color-text-primary;
  }
}
</style>