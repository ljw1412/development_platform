<template>
  <div class="project-create">
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'ProjectCreate',

  methods: {
    ...mapActions('layout', ['updateTitle'])
  },

  created() {
    this.updateTitle({ title: '项目管理/创建项目', isBack: true })
  }
}
</script>

<style lang="scss" scoped>
</style>