<template>
  <div class="pm2-details">
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
    <div class="logs">
      <div class="logs__action">
        <span>实时日志</span>
        <div>
          <el-button type="danger"
            size="mini"
            @click="logList = []">清空</el-button>
          <el-button type="primary"
            size="mini"
            @click="onSaveLogClick">保存</el-button>
        </div>
      </div>
      <div class="logs__content">
        <p v-for="(log,index) of logList"
          :key="index">{{log}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import ProcessInfo from '../components/ProcessInfo'
import DetailsCharts from '../components/DetailsCharts'
import { setTags } from '../helper'
import { download } from '@/utils/file'
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
        this.logList.unshift(...line.reverse())
        this.lineNum = lineNum
      })
    },

    onSaveLogClick() {
      try {
        const blob = new Blob([this.logList.join('\n')], { type: 'text/plain' })
        download(
          blob,
          this.process.name + moment().format('_YYYY-MM-DD_HH-mm-ss')
        )
      } catch (error) {
        console.error(error)
      }
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
.pm2-details {
  box-sizing: border-box;
  height: 100%;
}
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
.logs {
  position: relative;
  height: 200px;
  padding: 8px 0 0 10px;
  border: 1px solid $--border-color-lighter;
  &__action {
    position: absolute;
    display: flex;
    width: calc(100% - 16px);
    justify-content: space-between;
    align-items: center;
  }
  &__content {
    margin-top: 32px;
    height: calc(100% - 32px);
    overflow-y: auto;
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