<template>
  <el-card class="title-card"
    shadow="hover"
    :body-style="{ padding: '15px' }">
    <template #header>
      <div class="title-card__title">{{title}}</div>
    </template>
    <slot></slot>
  </el-card>
</template>

<script>
export default {
  name: 'TitleCard',

  props: { title: { type: String } }
}
</script>

<style lang="scss" scoped>
.title-card {
  /deep/ .el-card__header {
    padding: 15px;
  }
}
</style>

