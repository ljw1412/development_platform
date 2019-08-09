<template>
  <div class="process">
    <div class="process__header">
      <span class="header__title"
        :class="{'header__title--allow-click':!disableTitleClick}"
        @click="onServiceTitleClick">{{name}}</span>
      <span class="header__path">{{path}}</span>
      <div class="header__tags">
        <el-tag v-for="tag of tags"
          :key="tag.label"
          :type="tag.type">{{tag.label}}</el-tag>
      </div>
    </div>
    <div class="process__body">
      <div v-for="item of infoList"
        class="process__info"
        :class="item.class"
        :key="item.label">
        <div class="info__title">{{item.label}}</div>
        <div class="info__text">{{item.value}}</div>
      </div>
      <div class="process__operation process__info">
        <div class="info__title">操作</div>
        <div class="info__text">
          <template v-for="item of actionList">
            <el-tooltip v-if="item.isDisplay"
              placement="bottom"
              :key="item.type"
              :content="item.label">
              <i :class="item.icon"
                @click="onOperationClick(item)"></i>
            </el-tooltip>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProcessInfo',

  props: {
    name: String,
    path: String,
    tags: { type: Array, default: () => [] },
    pmid: [Number, String],
    version: String,
    uptime: String,
    cpu: String,
    memory: String,
    restartTime: Number,
    status: String,
    watch: Boolean,
    protect: Boolean,
    disableTitleClick: Boolean
  },

  computed: {
    actionList() {
      const list = [
        {
          label: '暂停',
          icon: 'el-icon-video-pause',
          type: 'stop',
          isDisplay: this.status === 'online' && !this.protect
        },
        {
          label: '启动',
          icon: 'el-icon-video-play',
          type: 'start',
          isDisplay: this.status !== 'online' && !this.protect
        },
        {
          label: '重启',
          icon: 'el-icon-refresh',
          type: 'restart',
          isDisplay: true
        },
        {
          label: '重载',
          icon: 'el-icon-refresh-left',
          type: 'reload',
          isDisplay: true
        },
        {
          label: '删除',
          icon: 'el-icon-circle-close',
          type: 'delete',
          isDisplay: !this.protect
        }
      ]
      return list.filter(item => item.isDisplay)
    },

    infoList() {
      return [
        { label: '#', value: this.pmid, class: ['process__id'] },
        { label: 'VERSION', value: this.version, class: ['process__status'] },
        { label: 'UPTIME', value: this.uptime, class: ['process__uptime'] },
        { label: 'CPU', value: this.cpu, class: ['process__cpu'] },
        { label: 'MEMORY', value: this.memory, class: ['process__memory'] }
      ]
    }
  },

  methods: {
    reSaveService(id, type) {
      this.$callApi({
        method: 'post',
        api: 'pm2/action',
        param: { id, type }
      }).then(data => {
        this.$emit('stateChange')
      })
    },

    onServiceTitleClick() {
      if (this.disableTitleClick) return
      this.$router.push({ name: 'PM2Details', query: { id: this.pmid } })
    },

    onOperationClick(item) {
      this.$confirm(`确定要 ${item.label} 进程 “${this.name}” 吗？`, {
        title: '提示',
        type: 'warning'
      })
        .then(() => {
          this.reSaveService(this.pmid, item.type)
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/index.scss';
.process {
  padding: 8px 10px;
  margin-bottom: 10px;
  border: 1px solid $--border-color-lighter;
  user-select: none;
  &__header {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px 8px 5px;
    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      height: 1px;
      width: 100%;
      background-color: $--border-color-lighter;
    }
    .header {
      &__title--allow-click {
        cursor: pointer;
        &:hover {
          color: $--color-primary;
        }
      }
      &__path {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        font-size: 12px;
        color: $--color-text-placeholder;
        white-space: nowrap;
      }
      &__tags {
        span {
          margin-left: 5px;
        }
      }
    }
  }
  &__body {
    display: flex;
    padding-top: 8px;
  }
  &__info {
    position: relative;
    flex-grow: 1;
    width: 0;
    text-align: center;
    &:last-child::after {
      display: none;
    }
    &::after {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      width: 1px;
      height: 100%;
      background-color: $--border-color-lighter;
    }
    .info {
      &__title {
        color: $--color-text-secondary;
        font-size: 14px;
      }
      &__text {
        color: $--color-text-primary;
        font-size: 22px;
      }
    }
  }
  &__id {
    width: 45px;
    flex-grow: 0;
  }
  &__operation {
    i {
      margin: 0 3px;
      cursor: pointer;
    }
  }
}
@media screen and (max-width: 1000px) {
  .header__path {
    display: none;
  }
  .process {
    &__body {
      flex-wrap: wrap;
    }
    &__info {
      width: 33.33%;
      &:last-child::after {
        display: block;
      }
    }
  }
}
@media screen and (max-width: 600px) {
  .process {
    &__header {
      flex-wrap: wrap;
      & > * {
        width: 100%;
      }
      .header__tags span {
        margin-left: 0;
      }
    }
    &__info {
      width: 50%;
    }
  }
}
</style>