<template>
  <div class="md-editor-wrapper">
    <textarea ref="editor"
      class="md-editor"></textarea>
  </div>
</template>

<script>
import SimpleMDE from 'simplemde'
import 'simplemde/dist/simplemde.min.css'
import { toolbarButtons } from './config'

export default {
  name: 'MDEditor',

  props: {
    value: String,
    // 是否开启代码高亮
    highlight: { type: Boolean, default: false },
    configs: { type: Object, default: () => ({}) }
  },

  data() {
    return {
      editor: null
    }
  },

  methods: {
    initSimpleMDE() {
      const configs = Object.assign(
        {
          element: this.$refs.editor,
          renderingConfig: {},
          toolbar: toolbarButtons,
          toolbarTips: true
        },
        this.configs
      )

      if (this.highlight) {
        configs.renderingConfig.codeSyntaxHighlighting = true
      }

      this.editor = new SimpleMDE(configs)

      this.editor.codemirror.on('change', () => {
        const content = this.editor.value()
        this.$emit('input', content)
        this.$emit('change', content)
        console.log(content)
      })
    },

    reRender() {
      this.editor.toTextArea()
      this.editor = null
      this.initSimpleMDE()
    }
  },

  mounted() {
    this.initSimpleMDE()
  }
}
</script>

<style lang="scss" scoped>
</style>
