<template>
  <div class="pm2-list">
    <process-info v-for="item of list"
      :key="item.pmid"
      v-bind="item"></process-info>
  </div>
</template>

<script>
import ProcessInfo from '../components/ProcessInfo'
import Timer from '@/class/Timer'
import { formatFileSize } from '@/utils/file.js'
import { setTags } from '../helper'
export default {
  name: 'PM2List',

  components: {
    ProcessInfo
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