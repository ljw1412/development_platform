<template>
  <base-list-layout class="project-create"
    :class="wrapperClasses">
    <template #action>
      <el-steps simple
        :active="activeIndex">
        <el-step v-for="(step,index) of stepList"
          :key="mode+'-'+index"
          :title="step.title"
          :icon="step.icon"
          @click.native="onStepClick($event,step)"></el-step>
      </el-steps>
    </template>

    <template #main>
      <component :is="currentComponent"></component>
    </template>

  </base-list-layout>
</template>

<script>
import { mapActions } from 'vuex'
import ModeChoise from './components/ModeChoise'
import CreateProject from './components/CreateProject'
export default {
  name: 'ProjectCreate',

  provide() {
    return { project: this }
  },

  components: {
    ModeChoise,
    CreateProject
  },

  computed: {
    wrapperClasses() {
      const classes = []
      if (this.mode) classes.push(`project-create--${this.mode}-mode`)
      return classes
    },

    stepList() {
      let stepList = [
        {
          title: '选择创建模式',
          icon: 'el-icon-thumb',
          component: ModeChoise
        }
      ]
      if (this.mode) stepList = stepList.concat(this.steps[this.mode])
      return stepList
    },

    currentStep() {
      return this.stepList[this.activeIndex - 1]
    },

    currentComponent() {
      return this.currentStep.component
    }
  },

  data() {
    return {
      activeIndex: 1,
      mode: '',
      steps: {
        create: [
          { title: '新建项目', icon: '', component: CreateProject },
          { title: '完成', icon: '' }
        ],
        import: [{ title: '导入项目', icon: '' }, { title: '完成', icon: '' }]
      }
    }
  },

  methods: {
    onStepClick(e, step) {
      console.log(e, step)
    }
  },

  created() {
    this.$setPageTitle({ title: '项目管理/创建项目', isBack: true })
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/index.scss';
.project-create {
  height: 100%;
  background-color: #fff;
  transition: background-color 0.5s;
  &--create-mode {
    background-color: mix(white, green, 80%);
  }
  &--import-mode {
    background-color: mix(white, orange, 80%);
  }
}

.el-step:first-child {
  /deep/ .el-step__title.is-finish {
    cursor: pointer;
  }
}
</style>