<template>
  <base-list-layout class="project main-content-wrapper">
    <template #action>
      <el-button type="primary"
        @click="$router.push({name:'projectCreate'})">创建项目</el-button>
    </template>

    <template #main>
      <ul class="project-list">
        <result v-if="!projectList.length"
          title="您还未创建任何项目"
          imageHeight="300px"
          style="padding-top:100px;"
          :src="require('@/assets/no-data.svg')"></result>
        <li v-for="project of projectList"
          class="project-list__item"
          :key="project.id"></li>
      </ul>
    </template>
  </base-list-layout>
</template>

<script>
import Result from '@/components/Result'

export default {
  name: 'ProjectList',

  components: {
    Result
  },

  data() {
    return {
      projectList: []
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/index.scss';
.project-list {
  min-height: 300px;
}
</style>
