<template>
  <div class="complete">
    <result title="项目创建成功"
      icon="el-icon-circle-check"
      icon-color="#67C23A">
      <template #subTitle>
        <span class="complete__redirection"
          @click="onRedirectionClick">{{id?'进入项目':'返回列表'}}</span>
      </template>
    </result>
  </div>
</template>

<script>
export default {
  name: 'ProjectComplete',

  props: { id: [String, Number] },

  methods: {
    onRedirectionClick() {
      if (this.id) {
        this.$router.replace({
          name: 'projectDetails',
          query: { id: this.id }
        })
      } else {
        this.$router.replace({ name: 'project' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/index.scss';
.complete {
  margin-top: 40px;
  &__redirection {
    cursor: pointer;
    &:hover {
      color: $--color-success;
    }
  }
}
</style>
