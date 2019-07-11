<template>
  <div class="result">
    <div class="result__image"
      :style="{ width: imageWidth, height: imageHeight }">
      <slot name="image">
        <div class="image"
          :style="{ 'background-image': `url(${src})` }"></div>
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
    src: String,
    title: String,
    subTitle: String,
    imageWidth: { type: String, default: '400px' },
    imageHeight: { type: String, default: '400px' }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/index.scss';
.result {
  user-select: none;
  &__image {
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