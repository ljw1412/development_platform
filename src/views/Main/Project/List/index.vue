<template>
  <base-list-layout class="project main-content-wrapper">
    <template #action>
      <el-button type="primary"
        @click="$router.push({name:'projectCreate'})">创建项目</el-button>
    </template>

    <el-table :data="projectList"
      :show-header="!!projectList.length"
      :row-style="{cursor: 'pointer'}"
      @row-click="onRowClick">
      <result v-if="isLoaded"
        slot="empty"
        title="您还未创建任何项目"
        iconHeight="200px"
        style="padding:40px 0;"
        :icon="require('@/assets/no-data.svg')"></result>
      <el-table-column label="名称"
        prop="name"></el-table-column>
      <el-table-column label="源">
        <div slot-scope="scope"
          class="project__origin">
          <el-image v-if="scope.row.origin === 'git'"
            style="width:22px;height:22px;"
            :src="require('@/assets/icon-git.svg')"></el-image>
        </div>
      </el-table-column>
      <el-table-column label="状态">
        <span slot-scope="scope">
          {{getProjectStateStr(scope.row.state)}}</span>
      </el-table-column>
    </el-table>
  </base-list-layout>
</template>

<script>
import Result from '@/components/Result'
import { getProjectStateStr } from '../helper'

export default {
  name: 'ProjectList',

  components: {
    Result
  },

  data() {
    return {
      isLoaded: false,
      projectList: []
    }
  },

  methods: {
    getProjectStateStr,

    reFindList() {
      this.$callApi({
        api: 'project/list'
      })
        .then(data => {
          this.isLoaded = true
          this.projectList = data
        })
        .catch(() => {
          this.isLoaded = true
        })
    },

    onRowClick(row, column) {
      this.$router.push({
        name: 'projectDetails',
        query: { id: row.id }
      })
    }
  },

  created() {
    this.reFindList()
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/index.scss';

.project__origin {
  display: flex;
  align-items: center;
}

.el-table::before {
  display: none;
}
</style>
