<template>
  <scrollbar class="pm2-list">
    <div v-for="item of list"
      class="service"
      :key="item.pmid">
      <div class="service__header">
        <span class="header__title"
          @click="onServiceTitleClick(item)">{{item.name}}</span>
        <span class="header__path">{{item.path}}</span>
        <div class="header__tags">
          <el-tag v-for="tag of item.tags"
            :key="tag.label"
            :type="tag.type">{{tag.label}}</el-tag>
        </div>
      </div>
      <div class="service__body">
        <div class="service__id service__info">
          <div class="info__title">#</div>
          <div class="info__text">{{item.pmid}}</div>
        </div>
        <div class="service__status service__info">
          <div class="info__title">VERSION</div>
          <div class="info__text">{{item.version}}</div>
        </div>
        <div class="service__uptime service__info">
          <div class="info__title">UPTIME</div>
          <div class="info__text">{{item.uptime}}</div>
        </div>
        <div class="service__cpu service__info">
          <div class="info__title">CPU</div>
          <div class="info__text">{{item.cpu}}</div>
        </div>
        <div class="service__memory service__info">
          <div class="info__title">MEMORY</div>
          <div class="info__text">{{item.memory}}</div>
        </div>
        <div class="service__operation service__info">
          <div class="info__title">操作</div>
          <div class="info__text">
            <template v-if="!item.protected">
              <el-tooltip v-if="item.status==='online'"
                content="暂停"
                placement="bottom">
                <i class="el-icon-video-pause"
                  @click="onOperationClick(item,'stop')"></i>
              </el-tooltip>
              <el-tooltip v-else
                content="启动"
                placement="bottom">
                <i class="el-icon-video-play"
                  @click="onOperationClick(item,'start')"></i>
              </el-tooltip>
            </template>
            <el-tooltip content="重启"
              placement="bottom">
              <i class="el-icon-refresh"
                @click="onOperationClick(item,'restart')"></i>
            </el-tooltip>
            <el-tooltip content="重载"
              placement="bottom">
              <i class="el-icon-refresh-left"
                @click="onOperationClick(item,'reload')"></i>
            </el-tooltip>
            <el-tooltip v-if="!item.protected"
              content="删除"
              placement="bottom">
              <i class="el-icon-circle-close"
                @click="onOperationClick(item,'delete')"></i>
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>
  </scrollbar>
</template>

<script>
import Timer from '@/class/Timer'
import { formatFileSize } from '@/utils/file.js'
import { setTags } from '../helper'
export default {
  name: 'PM2List',

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
    },

    reSaveService(id, type) {
      this.$callApi({
        method: 'post',
        api: 'pm2/action',
        param: { id, type }
      }).then(data => {
        this.reFindList()
      })
    },

    onServiceTitleClick(item) {
      this.$router.push({ name: 'PM2Details', query: { id: item.pmid } })
    },

    onOperationClick(item, type) {
      this.reSaveService(item.pmid, type)
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
@import '@/theme/index.scss';
.service {
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
      &__title {
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