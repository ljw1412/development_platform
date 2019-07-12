<template>
  <div v-if="isDisplayPageHeader"
    class="page-header">
    <transition name="collapse-left">
      <div v-if="isBack"
        class="page-header__back"
        @click="onBack">
        <i class="el-icon-back"></i>
        <div class="page-header__back-title">返回</div>
      </div>
    </transition>
    <span class="page-header__content">{{title}}</span>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'PageHeader',

  computed: {
    ...mapState('layout', ['isDisplayPageHeader', 'title', 'isBack'])
  },

  methods: {
    onBack() {
      if (this.isBack) {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/index.scss';
.page-header {
  display: flex;
  line-height: 24px;
  flex-shrink: 0;
  margin-bottom: 20px;
  user-select: none;
  &__back {
    display: flex;
    cursor: pointer;
    margin-right: 20px;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    transition: color 0.3s ease;
    &:hover {
      color: $--color-primary;
    }
    &::after {
      content: '';
      position: absolute;
      width: 1px;
      height: 16px;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      background-color: #dcdfe6;
    }
    .el-icon-back {
      font-size: 18px;
      margin-right: 6px;
      align-self: center;
      overflow: hidden;
    }
  }
  &__back-title {
    padding-right: 20px;
    font-size: 14px;
    font-weight: 500;
  }
  &__content {
    font-size: 18px;
    color: $--color-text-primary;
  }
}

.collapse-left {
  &-enter-active {
    transition: max-width 1s, margin-right 1s 0.2s;
  }
  &-leave-active {
    transition: max-width 0.3s, margin-right 0.3s 0.3s;
  }
  &-enter,
  &-leave-to {
    max-width: 0;
    opacity: 0;
    margin-right: 0;
  }
  &-leave,
  &-enter-to {
    max-width: 100px;
  }
}
</style>
