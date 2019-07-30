<template>
  <scrollbar class="pm2-list">
    <pocess-info v-for="item of list"
      :key="item.pmid"
      v-bind="item"></pocess-info>
  </scrollbar>
</template>

<script>
import PocessInfo from '../components/PocessInfo'
import Timer from '@/class/Timer'
import { formatFileSize } from '@/utils/file.js'
import { setTags } from '../helper'
export default {
  name: 'PM2List',

  components: {
    PocessInfo
  },

  data() {
    return {
      list: [],
      timer: new Timer()
    }
  },

  methods: {
    reFindList() {
      this.$callApi({
        api: 'pm2/list'
      }).then(({ count, list }) => {
        this.list = list.map(item => setTags(item))
        this.$setPageTitle(`PM2进程管理器(${count})`)
      })
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
</style>