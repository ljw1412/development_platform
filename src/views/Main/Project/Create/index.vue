<template>
  <base-list-layout class="project-create">
    <template #action>
      <el-steps simple
        :active="activeIndex">
        <el-step v-for="(step,index) of stepList"
          :key="mode+'-'+index"
          :title="step.title"
          :icon="step.icon"></el-step>
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
        new: [
          { title: '新建项目', icon: '', component: CreateProject },
          { title: '完成', icon: '' }
        ],
        import: [{ title: '导入项目', icon: '' }, { title: '完成', icon: '' }]
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
}
</style>