<template>
  <el-drawer :visible.sync="mVisible">
  </el-drawer>
</template>

<script>
export default {
  name: 'ProjectPublishEdit',

  props: {
    visible: { type: Boolean, default: false }
  },

  data() {
    return {
      mVisible: false
    }
  },

  watch: {
    visible(val) {
      this.mVisible = val
    },

    mVisible(val) {
      this.$emit('updata:visible', val)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
