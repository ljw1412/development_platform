<template>
  <base-list-layout class="project">
    <template #action>
      <el-button type="primary">新建项目</el-button>
    </template>

    <template #main>
      <ul class="project__list"
        :class="{'project__list--empty':!projectList.length}">
        <li v-for="project of projectList"
          class="project__item"
          :key="project.id"></li>
      </ul>
    </template>
  </base-list-layout>
</template>

<script>
import BaseList from '@/components/layout/BaseList'
export default {
  components: {
    BaseListLayout: BaseList
  },

  data() {
    return {
      projectList: []
    }
  }
}
</script>

<style lang="scss" scoped>
.project {
  &__list {
    min-height: 300px;
    &--empty {
      &::before {
        content: '';
      }
      &::after {
        content: '您还未创建任何项目';
      }
    }
  }
}
</style>
