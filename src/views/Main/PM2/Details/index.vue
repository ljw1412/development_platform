<template>
  <div class="pm2-details">
    <div class="info">
      <div class="info__name">{{process.name}}</div>
      <div class="info__tags">
        <el-tag v-for="tag of process.tags"
          :key="tag.label"
          :type="tag.type">{{tag.label}}</el-tag>
      </div>
    </div>
  </div>
</template>

<script>
import { setTags } from '../helper'
export default {
  name: 'PM2Details',

  data() {
    return {
      process: { name: '进程名称', tag: [] }
    }
  },

  computed: {
    id() {
      return this.$route.query.id
    }
  },

  methods: {
    reFindProcess() {
      this.$callApi({
        method: 'post',
        api: 'pm2/action',
        param: { id: this.id, type: 'describe' }
      }).then(data => {
        this.process = setTags(data)
      })
    }
  },

  created() {
    this.$setPageTitle({ title: 'PM2', isBack: true })
    this.reFindProcess()
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/index.scss';
.info {
  padding: 8px 10px;
  margin-bottom: 10px;
  border: 1px solid $--border-color-lighter;
  user-select: none;
  &__name {
    position: relative;
    font-size: 20px;
    @include divider;
  }
}
</style>