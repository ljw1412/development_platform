<template>
  <div v-if="isDisplayPageHeader"
    class="page-header">
    <div v-if="isBack"
      class="page-header__back"
      @click="onBack">
      <i class="el-icon-back"></i>
      <div class="page-header__back-title">{{backTitle}}</div>
    </div>
    <span class="el-page-header__content page-header__content">{{title}}</span>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'PageHeader',

  computed: {
    ...mapState('layout', ['isDisplayPageHeader', 'title', 'isBack']),

    backTitle() {
      return this.isBack ? '返回' : '首页'
    }
  },

  methods: {
    onBack() {
      if (this.isBack) {
        this.$router.go(-1)
      } else {
        this.$router.replace({ name: 'main' })
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
    margin-right: 40px;
    position: relative;
    &:hover {
      color: $--color-primary;
    }
    &::after {
      content: '';
      position: absolute;
      width: 1px;
      height: 16px;
      right: -20px;
      top: 50%;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      background-color: #dcdfe6;
    }
    .el-icon-back {
      font-size: 18px;
      margin-right: 6px;
      align-self: center;
    }
  }
  &__back-title {
    font-size: 14px;
    font-weight: 500;
  }
  &__content {
    font-size: 18px;
    color: $--color-text-primary;
  }
}
</style>
