<template>
  <div v-if="isDisplayPageHeader"
    class="page-header">
    <span v-if="isHome"
      class="el-page-header__content">{{title}}</span>
    <el-page-header v-else
      title="首页"
      :content="title"
      @back="onBack"></el-page-header>

  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'PageHeader',

  computed: {
    ...mapState('layout', ['isDisplayPageHeader', 'title']),
    isHome() {
      return this.$route.name === 'main'
    }
  },

  methods: {
    ...mapMutations('layout', ['updatePageTitle']),
    onBack() {
      this.$router.replace({ name: 'main' })
      this.updatePageTitle('首页')
    }
  }
}
</script>

<style lang="scss" scoped>
.page-header {
  flex-shrink: 0;
  margin-bottom: 20px;
}
</style>
