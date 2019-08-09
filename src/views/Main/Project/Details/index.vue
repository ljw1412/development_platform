<template>
  <div class="project-details main-content-wrapper">
    <h2>
      <span>{{project.name}}</span>
      <el-image v-if="project.origin === 'git'"
        style="width:22px;height:22px;"
        :src="require('@/assets/icon-git.svg')"></el-image>
    </h2>
  </div>
</template>

<script>
export default {
  name: 'ProjectDetails',

  data() {
    return {
      project: { name: '' }
    }
  },

  methods: {
    reFindProject() {
      this.$callApi({
        api: `project/details`,
        param: { id: this.$route.query.id }
      }).then(data => {
        Object.assign(this.project, data)
      })
    }
  },

  mounted() {
    this.$setPageTitle({
      title: `项目管理/${this.$route.query.name}`,
      isBack: true
    })
    this.reFindProject()
  }
}
</script>

<style lang="scss" scoped>
h2 {
  display: flex;
  align-items: center;
  span {
    margin-right: 5px;
  }
}
</style>
