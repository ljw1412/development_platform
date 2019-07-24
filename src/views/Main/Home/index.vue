<template>
  <scrollbar class="home">
    <server-info v-bind="base"
      :uptime="state.uptime"></server-info>
    <server-state v-bind="state"></server-state>
    <cpu-info :cpus="state.cpus || []"></cpu-info>
    <network-info :network="state.networkInterfaces||{}"></network-info>
  </scrollbar>
</template>

<script>
import { mapActions } from 'vuex'
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
      timer: null,
      base: { os: '', hostname: '' },
      state: {}
    }
  },

  methods: {
    ...mapActions('layout', ['updateTitle']),

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
    this.updateTitle({ isDisplayPageHeader: false })
    this.reFindState('base')
    this.reFindState('state')
    this.timer = setInterval(() => {
      this.reFindState('state')
    }, 5000)
  },

  beforeDestroy() {
    clearInterval(this.timer)
    this.timer = null
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/index.scss';
.home {
  padding: 2px 10px;
  * {
    color: $--color-text-primary;
  }
}
</style>