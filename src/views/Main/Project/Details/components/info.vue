<template>
  <div class="info">
    <div v-if="project.description"
      class="info__description">{{project.description}}</div>
    <el-form label-width="100px">
      <el-form-item v-for="info of infoList"
        :key="info.key"
        :label="info.label">{{info.value}}</el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ProjectDetailsInfo',

  props: {
    project: { type: Object, default: () => ({}) }
  },

  data() {
    return {
      mapList: [
        { key: 'git', label: 'git' },
        { key: 'path', label: '项目路径' }
      ]
    }
  },

  computed: {
    infoList() {
      return this.mapList.map(item =>
        Object.assign({ value: this.project[item.key] }, item)
      )
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/index.scss';
.info {
  &__description {
    position: relative;
    margin: 0 25px;
    margin-bottom: 15px;
    padding-bottom: 15px;
    font-size: 12px;
    color: $--color-text-secondary;
    @include divider;
  }
}
.el-form {
  @include auto-center-view(800px);
}
</style>
