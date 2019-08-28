<template>
  <el-drawer size="90%"
    direction="btt"
    title="编辑发布流程"
    :visible.sync="mVisible">
    <base-list-layout class="pubish-edit">
      <div></div>
      <div slot="footer"
        style="text-align:right;">
        <el-button type="primary">保存</el-button>
      </div>
    </base-list-layout>
  </el-drawer>
</template>

<script>
export default {
  name: 'ProjectPublishEdit',

  props: {
    visible: { type: Boolean, default: false },
    isEdit: { type: Boolean, default: false }
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
      this.$emit('update:visible', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.pubish-edit {
  height: 100%;
  padding: 0 10px 10px 10px;
}
</style>
