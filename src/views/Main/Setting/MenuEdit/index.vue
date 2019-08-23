<template>
  <div class="menu-edit">
    <el-button type="danger"
      @click="onResetClick">重新生成菜单</el-button>
    <quill-editor v-model="html"></quill-editor>
    <md-editor v-model="html"
      no-border></md-editor>
  </div>
</template>

<script>
import QuillEditor from '@/components/QuillEditor'
import mdEditor from '@/components/MDEditor'
export default {
  name: 'MenuEdit',

  components: {
    QuillEditor,
    mdEditor
  },

  data() {
    return {
      html: ''
    }
  },

  methods: {
    reResetMenu() {
      this.$callApi({
        method: 'post',
        api: 'api/reset_menu',
        param: {}
      }).then(data => {
        this.$notify.success({
          title: '消息',
          message: '菜单栏重新生成成功！(请刷新查看)'
        })
      })
    },

    onResetClick() {
      this.$confirm('确认要重新生成菜单吗？', '提示', { type: 'warning' })
        .then(() => {
          this.reResetMenu()
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
