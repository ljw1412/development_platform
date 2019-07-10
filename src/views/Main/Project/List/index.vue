<template>
  <base-list-layout class="project">
    <template #action>
      <el-button type="primary"
        @click="$router.push({name:'projectCreate'})">创建项目</el-button>
    </template>

    <template #main>
      <ul class="project-list">
        <result v-if="!projectList.length"
          title="您还未创建任何项目"></result>
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
.project-list {
  min-height: 300px;
}
</style>
