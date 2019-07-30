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
      <div class="process__id process__info">
        <div class="info__title">#</div>
        <div class="info__text">{{pmid}}</div>
      </div>
      <div class="process__status process__info">
        <div class="info__title">VERSION</div>
        <div class="info__text">{{version}}</div>
      </div>
      <div class="process__uptime process__info">
        <div class="info__title">UPTIME</div>
        <div class="info__text">{{uptime}}</div>
      </div>
      <div class="process__cpu process__info">
        <div class="info__title">CPU</div>
        <div class="info__text">{{cpu}}</div>
      </div>
      <div class="process__memory process__info">
        <div class="info__title">MEMORY</div>
        <div class="info__text">{{memory}}</div>
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
                @click="onOperationClick(item.type)"></i>
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
    pmid: { type: Number, default: -1 },
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
    }
  },

  methods: {
    reSaveService(id, type) {
      this.$callApi({
        method: 'post',
        api: 'pm2/action',
        param: { id, type }
      }).then(data => {
        this.reFindList()
      })
    },

    onServiceTitleClick() {
      if (this.disableTitleClick) return
      this.$router.push({ name: 'PM2Details', query: { id: this.pmid } })
    },

    onOperationClick(type) {
      this.reSaveService(this.pmid, type)
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
}
</style>