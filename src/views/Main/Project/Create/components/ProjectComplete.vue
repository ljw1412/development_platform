<template>
  <div class="complete">
    <result title="项目创建成功"
      icon="el-icon-circle-check"
      icon-color="#67C23A">
      <template #subTitle>
        <span class="complete__back"
          @click="onBackListClick">返回列表</span>
      </template>
    </result>
  </div>
</template>

<script>
export default {
  name: 'ProjectComplete',

  methods: {
    onBackListClick() {
      this.$router.push({ name: 'project' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/index.scss';
.complete {
  margin-top: 40px;
  &__back {
    cursor: pointer;
    &:hover {
      color: $--color-success;
    }
  }
}
</style>
