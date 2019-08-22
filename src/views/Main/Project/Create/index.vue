<template>
  <base-list-layout class="project-create"
    :class="wrapperClasses">
    <template #action>
      <el-steps simple
        :active="activeIndex">
        <el-step v-for="(step,index) of stepList"
          :key="mode+'-'+index"
          :title="step.title"
          :icon="step.icon"></el-step>
      </el-steps>
    </template>

    <component :is="currentComponent"
      :id="id"></component>

  </base-list-layout>
</template>

<script>
import { mapActions } from 'vuex'
import ModeChoise from './components/ModeChoise'
import ProjectCreator from './components/ProjectCreator'
import ProjectComplete from './components/ProjectComplete'
export default {
  name: 'ProjectCreate',

  provide() {
    return { creator: this }
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
      // 保存成功后返回的 id
      id: '',
      mode: '',
      steps: {
        create: [
          {
            title: '新建项目',
            icon: 'el-icon-edit',
            component: ProjectCreator
          },
          { title: '完成', icon: '', component: ProjectComplete }
        ],
        import: [
          { title: '导入项目', icon: 'el-icon-edit' },
          { title: '完成', icon: '', component: ProjectComplete }
        ]
      }
    }
  },

  methods: {},

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
  // &--create-mode {
  //   background-color: mix(white, green, 80%);
  // }
  // &--import-mode {
  //   background-color: mix(white, orange, 80%);
  // }
}
</style>