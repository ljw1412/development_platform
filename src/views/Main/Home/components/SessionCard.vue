<template>
  <div class="session-card">
    <div v-if="$slots.header"
      class="session-card__header">
      <slot name="header"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'SessionCard'
}
</script>

<style lang="scss" scoped>
@import '@/theme/index.scss';
.session-card {
  padding: 10px 15px;
  font-size: 16px;
  border: 1px solid $--border-color-lighter;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
  &__header {
    margin-bottom: 10px;
  }
}
</style>