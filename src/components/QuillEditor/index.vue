<template>
  <div class="quill-editor-wrapper"
    :class="{'no-border': noBorder}"
    :style="[editorStyles]">
    <!-- Create the editor container -->
    <div class="quill-editor i-quill-no-border"
      ref="editor"
      :id="editorId"></div>
  </div>
</template>

<script>
import Quill from 'quill'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.bubble.css'
import 'quill/dist/quill.snow.css'
import { toolbarOptions } from './options'

export default {
  name: 'QuillEditor',

  props: {
    width: String,
    height: String,
    value: { type: String, default: '' },
    placeholder: { type: String, default: '请输入内容...' },
    // 可选 bubble snow 或自定义
    theme: { type: String, default: 'snow' },
    toolbar: [Object, Array],
    noBorder: Boolean
  },

  data() {
    return {
      unix: new Date().getTime(),
      editor: null
    }
  },

  computed: {
    editorId() {
      return `editor-${this.unix}`
    },

    editorStyles() {
      return {
        width: this.width,
        height: this.height
      }
    }
  },

  methods: {
    setDisabled(isDabled) {
      this.editor.enable(!isDabled)
    },

    setContent(content) {
      this.editor.clipboard.dangerouslyPasteHTML(content)
      return this.editor
    },

    getContent() {
      return this.editor.container.firstChild.innerHTML
    },

    initQuill() {
      this.editor = new Quill(this.$refs.editor, {
        modules: {
          formula: false,
          syntax: false,
          history: {
            delay: 1000,
            userOnly: true
          },
          toolbar: this.toolbar || toolbarOptions
        },
        theme: this.theme,
        placeholder: this.placeholder
      })
      this.setContent(this.value)

      this.editor.on('text-change', delta => {
        const content = this.getContent()
        this.$emit('input', content)
        this.$emit('change', this.quill)
      })

      this.$emit('init', this.editor, this)
    }
  },

  mounted() {
    this.initQuill()
  }
}
</script>

<style lang="scss" scoped>
.quill-editor {
  min-height: 300px;
  /deep/ .ql-editor {
    height: 100%;
  }
}
.no-border {
  .quill-editor,
  /deep/ .ql-toolbar {
    border: 0;
  }
}
</style>
