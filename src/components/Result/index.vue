<template>
  <div class="result">
    <div class="result__image-wrapper"
      :style="imageWrapperStyles">
      <slot name="image">
        <i v-if="isIcon"
          :class="icon"
          :style="iconStyle"></i>
        <el-image v-else
          fit="contain"
          :src="icon">
        </el-image>
      </slot>
    </div>
    <div class="result__title">
      <slot name="title">{{title}}</slot>
    </div>
    <div class="result__sub-title">
      <slot name="subTitle">{{subTitle}}</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Result',

  props: {
    icon: { type: String, default: '' },
    iconSize: { type: String, default: '120px' },
    iconColor: String,
    iconWidth: { type: String, default: '300px' },
    iconHeight: { type: String, default: '300px' },
    title: String,
    subTitle: String
  },

  computed: {
    isIcon() {
      return !this.icon.includes('/')
    },

    imageWrapperStyles() {
      return this.isIcon
        ? { width: this.iconSize }
        : { width: this.iconWidth, height: this.iconHeight }
    },

    iconStyle() {
      return { 'font-size': this.iconSize, color: this.iconColor }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/index.scss';
.result {
  user-select: none;
  &__image-wrapper {
    display: flex;
    margin: 0 auto;
    .image {
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
    }
  }
  &__title {
    margin-top: 15px;
    line-height: 1;
    text-align: center;
    font-size: 20px;
    color: $--color-text-primary;
    padding-left: 15px;
    padding-right: 15px;
  }
  &__sub-title {
    margin-top: 9px;
    line-height: 1.5;
    text-align: center;
    font-size: 16px;
    color: $--color-text-secondary;
    padding-left: 15px;
    padding-right: 15px;
  }
}
</style>