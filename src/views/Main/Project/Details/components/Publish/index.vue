<template>
  <div v-loading="!isLoaded"
    class="publish">
    <div v-if="publishList.length"></div>
    <!-- 没有任何流程的结果页 -->
    <result v-else-if="isLoaded"
      title="您还未创建任何发布流程"
      icon="el-icon-truck"
      icon-color="#606266">
      <template #subTitle>
        <el-link type="primary"
          @click="isDisplayEdit = true">
          <span>立刻创建</span>
          <i class="el-icon-right"></i>
        </el-link>
      </template>
    </result>
    <!-- 编辑抽屉 -->
    <edit :visible.sync="isDisplayEdit"></edit>
  </div>
</template>

<script>
import Edit from './Edit'
export default {
  name: 'ProjectPublish',

  components: {
    Edit
  },

  data() {
    return {
      isLoaded: false,
      isDisplayEdit: false,
      publishList: []
    }
  },

  methods: {
    reFindPublishList() {
      this.isLoaded = false
      this.$callApi({
        api: '',
        param: {}
      }).then(data => {
        this.isLoaded = true
      })
    }
  },

  mounted() {
    this.isLoaded = true
  }
}
</script>

<style lang="scss" scoped>
.publish {
  min-height: 100px;
}
</style>
