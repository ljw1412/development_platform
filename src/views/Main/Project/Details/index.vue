<template>
  <base-list-layout class="project-details">
    <template #action>
      <div class="project-details__header">
        <el-col class="project-details__title"
          :span="18">
          <span>{{project.name}}</span>
          <el-image v-if="project.origin === 'git'"
            style="width:22px;height:22px;"
            :src="require('@/assets/icon-git.svg')"></el-image>
        </el-col>
        <el-col class="project-details__action"
          :span="6">
          <span class="project-details__state"
            :class="{'project-details__state--danger': [0,3].includes(project.state) }">{{project.stateStr}}</span>
          <el-button v-if="project.origin === 'git'&& project.state === 0"
            type="primary"
            size="mini"
            :loading="isIniting"
            @click="onInitClick">初始化</el-button>
        </el-col>
      </div>
      <el-tabs v-model="currentTab"
        type="card">
        <el-tab-pane v-for="tab of tabList"
          :key="tab.name"
          :label="tab.label"
          :name="tab.name">
          <component v-if="tab.component"
            :is="tab.component"
            :project="project"
            @nameChange="reFindProject"></component>
        </el-tab-pane>
      </el-tabs>
    </template>

  </base-list-layout>
</template>

<script>
import { getProjectStateStr } from '../helper'
import ProjectInfo from './components/info'
import ProjectAdvanced from './components/advanced'
import ProjectPublish from './components/publish'
import ProjectTimeline from './components/timeline'
export default {
  name: 'ProjectDetails',

  data() {
    return {
      project: { name: '' },
      currentTab: 'info',
      tabList: [
        { label: '信息', name: 'info', component: ProjectInfo },
        { label: '发布', name: 'publish', component: ProjectPublish },
        { label: '时间轴', name: 'timeline', component: ProjectTimeline },
        { label: '其他', name: 'other' },
        { label: '高级', name: 'advanced', component: ProjectAdvanced }
      ],
      isIniting: false
    }
  },

  methods: {
    reFindProject() {
      this.$callApi({
        api: `project/details`,
        param: { id: this.$route.query.id }
      }).then(data => {
        data.stateStr = getProjectStateStr(data.state)
        this.project = data
      })
    },

    reSaveInit() {
      this.isIniting = true
      this.$callApi({
        method: 'post',
        api: 'project/init',
        param: { id: this.$route.query.id }
      })
        .then(data => {
          this.$notify.success({
            title: '消息',
            message: '初始化成功！'
          })
          this.reFindProject()
          this.isIniting = false
        })
        .catch(() => {
          this.isIniting = false
        })
    },

    onInitClick() {
      this.reSaveInit()
    }
  },

  mounted() {
    this.$setPageTitle({
      title: `项目管理/项目详情`,
      isBack: true
    })
    this.reFindProject()
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/index.scss';
.project-details {
  &__header {
    display: flex;
    position: relative;
    padding: 15px 25px;
    background-color: #fafbfc;
    span {
      margin-right: 5px;
    }
  }

  &__title {
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: 600;
  }

  &__action {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  &__state {
    font-size: 14px;
    color: $--color-success;
    &--danger {
      color: $--color-danger;
    }
  }

  /deep/ {
    .el-tabs {
      &__nav-scroll {
        padding: 0 25px;
      }
      &__header {
        background-color: #fafbfc;
      }
      &__item.is-active {
        background-color: #fff;
      }
    }
  }
}
</style>
