<template>
  <div class="tcb-layout">
    <div v-if="$slots.action"
      class="action">
      <slot name="action"></slot>
    </div>
    <div v-if="$slots.default"
      class="main">
      <slot></slot>
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
.tcb-layout {
  display: flex;
  flex-direction: column;
}
.action {
  flex-shrink: 0;
  .el-input {
    width: 200px;
  }
}
.main {
  flex-grow: 1;
}
.footer {
  flex-shrink: 0;
}
</style>
