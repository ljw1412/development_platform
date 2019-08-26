<template>
  <div class="publish">
    <result title="您还未创建任何发布流程"
      icon="el-icon-truck"
      icon-color="#606266">
      <template #subTitle>
        <el-link type="primary">
          <span>立刻创建</span>
          <i class="el-icon-right"></i>
        </el-link>
      </template>
    </result>
  </div>
</template>

<script>
export default {
  name: 'ProjectPublish',

  data() {
    return {
      isLoaded: false,
      publishList: []
    }
  },

  methods: {
    reFindPublishList() {
      this.$callApi({
        api: '',
        param: {}
      }).then(data => {})
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
