<template>
  <div class="mode-choise">
    <el-card class="select-card"
      shadow="hover"
      @click.native="onModeCardClick('create')">
      <div class="select-card__title">新建项目</div>
      <div class="select-card__explain">从头开始创建项目</div>
    </el-card>
    <el-card class="select-card"
      shadow="hover"
      @click.native="onModeCardClick('import')">
      <div class="select-card__title">导入项目</div>
      <div class="select-card__explain">导入服务器现有的项目</div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ProjectModeChoise',

  inject: ['creator'],

  methods: {
    onModeCardClick(mode) {
      this.creator.mode = mode
      this.creator.activeIndex = 2
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/index.scss';
.mode-choise {
  @include auto-center-view(1200px);
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  .select-card {
    width: 400px;
    height: 300px;
    user-select: none;
    cursor: pointer;
    // &:first-child {
    //   margin-right: 40px;
    // }
    &__title {
      font-size: 24px;
      font-weight: 500;
      color: $--color-text-primary;
    }
    &__explain {
      font-size: 16px;
      color: $--color-text-regular;
    }
    &:hover {
      .select-card {
        &__title {
          color: $--color-primary;
        }
        &__explain {
          color: $--color-primary-light-4;
        }
      }
    }
  }
}
</style>