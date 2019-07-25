<template>
  <base-list-layout class="project-create">
    <template #action>
      <el-steps simple
        :active="activeIndex">
        <el-step title="选择创建模式"
          icon="el-icon-thumb"></el-step>
        <el-step v-for="(step,index) of stepList"
          :key="mode+'-'+index"
          :title="step.title"
          :icon="step.icon"></el-step>
      </el-steps>
    </template>

    <template #main>
      <div class="step-1">
        <el-card class="select-card"
          shadow="hover"
          @click.native="onModeCardClick('new')">
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

  </base-list-layout>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'ProjectCreate',

  computed: {
    stepList() {
      if (!this.mode) return []
      return this.steps[this.mode]
    }
  },

  data() {
    return {
      activeIndex: 1,
      mode: '',
      steps: {
        new: [{ title: '新建项目', icon: '' }, { title: '完成', icon: '' }],
        import: [{ title: '导入项目', icon: '' }, { title: '完成', icon: '' }]
      }
    }
  },

  methods: {
    onModeCardClick(mode) {
      this.mode = mode
    }
  },

  created() {
    this.$setPageTitle({
      title: '项目管理/创建项目',
      isBack: true
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/index.scss';
.step-1 {
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  .select-card {
    width: 400px;
    height: 300px;
    user-select: none;
    cursor: pointer;
    &:first-child {
      margin-right: 40px;
    }
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