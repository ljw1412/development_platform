<template>
  <div class="image-editor-wrapper"
    :style="wrapperStyles">
    <div class="image-editor"
      :style="editorStyles">
    </div>
    <div class="image-editor__edge"
      :style="edgeStyles"
      @mousewheel="onMousewheel"></div>
  </div>
</template>

<script>
export default {
  name: 'ImageEditor',

  props: {
    imageSrc: String,
    width: { type: Number, default: 200 },
    height: { type: Number, default: 200 },
    cropWidth: { type: Number, default: 128 },
    cropHeight: { type: Number, default: 128 }
  },

  computed: {
    wrapperStyles() {
      return {
        width: this.width + 'px',
        height: this.height + 'px'
      }
    },

    editorStyles() {
      return {
        'background-image': `url('${this.imageSrc}')`,
        transform: `scale(${this.scale})`
      }
    },

    edgeStyles() {
      return { 'border-width': `${this.top}px ${this.left}px` }
    },
    // 截取的顶部到编辑界面顶部的距离
    top() {
      return (this.width - this.cropWidth) / 2
    },
    // 截取的左边到编辑界面左边的距离
    left() {
      return (this.height - this.cropHeight) / 2
    }
  },

  data() {
    return {
      canvas: null,
      canvasContext: null,
      scale: 1
    }
  },

  methods: {
    initCanvas() {
      this.canvas = document.createElement('canvas')
      this.canvasContext = this.canvas.getContext('2d')
      this.canvasContext.save()
    },

    exportPreview(x, y, width, height) {
      const imageData = this.canvasContext.getImageData(x, y, width, height)
      const blob = new Blob(imageData.data, { type: 'image/png' })
      this.$emit('preview', URL.createObjectURL(blob))
    },

    onMousewheel(e) {
      if (e.deltaY > 0 && this.scale > 1) {
        this.scale -= 0.1
      } else if (e.deltaY < 0 && this.scale <= 4) {
        this.scale += 0.1
      }
    }
  },

  created() {
    this.initCanvas()
  },

  watch: {}
}
</script>

<style lang="scss" scoped>
.image-editor-wrapper {
  position: relative;
  display: inline-block;
  border: 1px solid #999;
  overflow: hidden;
}
.image-editor {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  &__edge {
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-style: solid;
    border-color: rgba($color: #999, $alpha: 0.75);
  }
}
</style>
