<template>
  <div class="home">
    <server-info v-bind="base"></server-info>
    <server-state v-bind="state"></server-state>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ServerInfo from './components/ServerInfo'
import ServerState from './components/ServerState'
export default {
  name: 'home',

  components: {
    ServerInfo,
    ServerState
  },

  data() {
    return {
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
    this.reFindState('state')
    this.reFindState('base')
  }
}
</script>

<style lang="scss" scoped>
</style>