<template>
  <div class="md-editor-wrapper"
    :class="{'no-border': noBorder}">
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
    configs: { type: Object, default: () => ({}) },
    noBorder: Boolean
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
  },

  beforeDestroy() {
    this.editor = null
  },

  watch: {
    value(val) {
      if (val === this.editor.value()) return
      this.editor.value(val)
    }
  }
}
</script>

<style lang="scss" scoped>
.no-border {
  /deep/ {
    .editor-toolbar {
      border: none;
      border-bottom: 1px solid #e8eaec;
    }
    .CodeMirror {
      border: 0;
    }
  }
}
</style>
