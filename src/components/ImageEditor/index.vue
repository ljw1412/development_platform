<template>
  <div class="image-editor-wrapper"
    :style="wrapperStyles">
    <div class="image-editor"
      :style="editorStyles">
    </div>
    <div class="image-editor__edge"
      :style="edgeStyles"
      @mousedown="onMousedown"
      @mousewheel="onMousewheel"></div>
  </div>
</template>

<script>
import { on, off } from '@/utils/dom.js'
export default {
  name: 'ImageEditor',

  props: {
    debug: Boolean,
    imageSrc: String,
    width: { type: Number, default: 200 },
    height: { type: Number, default: 200 },
    cropWidth: { type: Number, default: 128 },
    cropHeight: { type: Number, default: 128 },
    maxScale: { type: Number, default: 20 }
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
        'background-position': `${this.x}px ${this.y}px`,
        transform: `scale(${this.scale})`,
        'transform-origin': `${this.top}px ${this.left}px`
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
      scale: 1,
      x: 0,
      y: 0,
      startX: 0,
      startY: 0,
      img: null
    }
  },

  methods: {
    initCanvas() {
      this.canvas = document.createElement('canvas')
      this.canvasContext = this.canvas.getContext('2d')
      this.canvasContext.save()
      this.resetCanvas()
    },

    resetCanvas() {
      this.canvas.width = this.cropWidth
      this.canvas.height = this.cropHeight
    },

    // 加载图片
    loadImage(force = false) {
      if (force || !this.img) {
        const img = new Image()
        img.src = this.imageSrc
        this.img = img
        img.onload = this.corpImage
      }
    },

    // 根据图片比例，计算绘制的大小
    computeDrawSize(img) {
      const width = img.width
      const height = img.height
      let drawWidth = 0,
        drawHeight = 0
      if (width > height) {
        drawWidth = (this.cropHeight / height) * width
        drawHeight = this.cropHeight
      } else {
        drawWidth = this.cropWidth
        drawHeight = (this.cropWidth / width) * height
      }
      return { drawWidth, drawHeight }
    },

    // 裁剪图片
    corpImage() {
      if (!this.img) return this.loadImage()

      this.resetCanvas()
      const { drawWidth, drawHeight } = this.computeDrawSize(this.img)
      this.canvasContext.drawImage(
        this.img,
        (this.x - this.left) * this.scale,
        (this.y - this.top) * this.scale,
        drawWidth * this.scale,
        drawHeight * this.scale
      )
      this.canvasContext.restore()
      this.canvas.toBlob(blob => {
        this.$emit('preview', URL.createObjectURL(blob))
      })
    },

    onMousedown(e) {
      this.startX = e.clientX
      this.startY = e.clientY

      on(window, 'mousemove', this.onMousemove)
      on(window, 'mouseup', this.onMouseup)
    },

    onMousemove(e) {
      const deltaX = (e.clientX - this.startX) / this.scale
      const deltaY = (e.clientY - this.startY) / this.scale
      this.x += deltaX
      this.y += deltaY

      this.startX = e.clientX
      this.startY = e.clientY
    },

    onMouseup(e) {
      off(window, 'mousemove', this.onMousemove)
      off(window, 'mouseup', this.onMouseup)
      this.corpImage()
    },

    onMousewheel(e) {
      if (e.deltaY > 0 && this.scale > 1) {
        this.scale -= 0.1
        this.corpImage()
      } else if (e.deltaY < 0 && this.scale <= this.maxScale) {
        this.scale += 0.1
        this.corpImage()
      }
    }
  },

  created() {
    this.initCanvas()
    this.loadImage()
    this.x = this.left
    this.y = this.top
  },

  mounted() {
    if (this.debug) {
      document.querySelector('.image-editor-wrapper').after(this.canvas)
      this.canvas.style.border = '1px solid #fff'
    }
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
  background-position: center left;
  background-size: auto 128px;
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
