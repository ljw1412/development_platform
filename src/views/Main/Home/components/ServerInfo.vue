<template>
  <session-card class="server-info">
    <div class="server-info__left">
      <div class="server-info__hostname left__item">
        <i class="el-icon-monitor"></i>
        <span>{{ hostname }}</span>
      </div>
      <div class="server-info__os left__item">
        <span>系统: {{ os }}</span>
      </div>
      <div class="server-info__uptime left__item">
        不间断运行时间: {{formatUptime}}
      </div>
    </div>
    <div class="server-info__right">
    </div>
  </session-card>
</template>

<script>
import SessionCard from './SessionCard'
export default {
  name: 'ServerInfo',

  components: {
    SessionCard
  },

  props: {
    hostname: String,
    os: String,
    uptime: [String, Number]
  },

  computed: {
    formatUptime() {
      if (!this.uptime) return ''
      return this.getFormatTime(this.uptime)
    }
  },

  methods: {
    addPreZero(num) {
      return ('000000000' + num).substr(-2)
    },

    getFormatTime(second) {
      let time = ''
      const timeList = [
        {
          unit: '天',
          value: Math.floor(this.uptime / 3600 / 24)
        },
        {
          unit: '小时',
          value: Math.floor(this.uptime / 3600) % 24
        },
        {
          unit: '分钟',
          value: ('0' + (Math.floor(this.uptime / 60) % 60)).substr(-2)
        }
      ]
      return timeList
        .map(item => (item.value > 0 ? item.value + item.unit : ''))
        .join('')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/index.scss';
.server-info {
  padding: 10px 15px;
  margin-bottom: 15px;
  border: 1px solid $--border-color-lighter;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  &__left,
  &__right {
    display: flex;
  }

  .left__item {
    margin-right: 20px;
    i {
      margin-right: 5px;
    }
  }
}
</style>