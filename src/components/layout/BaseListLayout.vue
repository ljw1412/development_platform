<template>
  <div>
    <div v-if="$slots.action"
      class="action">
      <slot name="action"></slot>
    </div>
    <div v-if="$slots.main"
      class="main">
      <slot name="main"></slot>
    </div>
    <div v-if="$slots.footer"
      class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.action {
  * {
    margin: 0 10px 10px 0;
  }
  .el-input {
    width: 200px;
  }
}
</style>
