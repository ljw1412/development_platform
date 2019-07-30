<template>
  <scrollbar class="pm2-details">
    <process-info v-bind="process"
      disableTitleClick>
    </process-info>
    <div class="charts">
      <details-charts title="cpu 使用率"
        yUnit="%"
        :list="cpuList"></details-charts>
      <details-charts title="内存使用情况"
        yUnit="MB"
        :list="memoryList"></details-charts>
    </div>
    <div>
      <p v-for="(log,index) of logList"
        :key="index">{{log}}</p>
    </div>
  </scrollbar>
</template>

<script>
import ProcessInfo from '../components/ProcessInfo'
import DetailsCharts from '../components/DetailsCharts'
import { setTags } from '../helper'
import Timer from '@/class/Timer'
export default {
  name: 'PM2Details',

  components: { ProcessInfo, DetailsCharts },

  data() {
    return {
      timer: new Timer(3000, true, this.getInfo),
      process: { name: '进程名称', tag: [] },
      cpuList: [],
      memoryList: [],
      logList: [],
      lineNum: undefined
    }
  },

  computed: {
    id() {
      return this.$route.query.id
    }
  },

  methods: {
    addDataToList(list, data) {
      if (list.length >= 20) list.shift()
      list.push({
        time: moment().format('HH:mm:ss'),
        value: parseFloat(data),
        originValue: data
      })
    },

    getInfo() {
      this.reFindProcess()
      this.reFindLog()
    },

    reFindProcess() {
      this.$callApi({
        method: 'post',
        api: 'pm2/action',
        param: { id: this.id, type: 'describe' }
      }).then(data => {
        this.process = setTags(data)
        this.addDataToList(this.cpuList, data.cpu)
        this.addDataToList(this.memoryList, data.memory)
      })
    },

    reFindLog() {
      this.$callApi({
        api: 'pm2/logs',
        param: { id: this.id, lineNum: this.lineNum }
      }).then(({ line, lineNum }) => {
        this.logList.push(...line)
        this.lineNum = lineNum
      })
    }
  },

  created() {
    this.$setPageTitle({ title: '进程详情', isBack: true })
    this.timer.start()
  },

  beforeDestroy() {
    this.timer.stop()
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/index.scss';
.charts {
  display: flex;
  padding: 8px 10px;
  margin-bottom: 10px;
  border: 1px solid $--border-color-lighter;
  * {
    flex-grow: 1;
    width: 0;
  }
}

@media screen and (max-width: 1000px) {
  .charts {
    flex-direction: column;
    & > * {
      width: 100%;
    }
  }
}
</style>