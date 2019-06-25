<template>
  <div ref="wrapper"
    class="scrollbar-view-wrapper"
    @mousewheel="onMousewheel">
    <div ref="content"
      class="scrollbar-view"
      :style="viewStyles">
      <slot></slot>
    </div>
    <div ref="barY"
      class="scrollbar scrollbar--vertical">
      <div ref="thumbY"
        class="scrollbar__thumb"
        :style="{right}"></div>
    </div>
    <div ref="barX"
      class="scrollbar scrollbar--horizontal">
      <div ref="thumbX"
        class="scrollbar__thumb"
        :style="{bottom}"></div>
    </div>
  </div>
</template>

<script>
import {
  addResizeListener,
  removeResizeListener
} from '@/utils/resize-event.js'
export default {
  name: 'VScrollbar',

  props: {
    // hover 悬浮界面时显示，不悬浮是半透明
    // always 总是显示
    showMode: { type: String, default: () => 'hover' },
    // 内容的样式
    contentStyle: { type: [Object, String], default: () => ({}) },
    // 垂直导航栏距离右边的距离
    right: String,
    // 水平导航栏距离底部的距离
    bottom: String
  },

  computed: {
    wrapClasses() {
      return `scroll-view__wrapper--${this.showMode}`
    },

    viewStyles() {
      return [
        this.contentStyle,
        {
          transform: `translate(${this.x}px, ${this.y}px)`
        }
      ]
    },

    scrollableArea() {
      return {
        x: this.wrapper.width - this.content.width,
        y: this.wrapper.height - this.content.height
      }
    }
  },

  data() {
    return {
      y: 0,
      x: 0,

      wrapper: { width: 0, height: 0 },
      content: { width: 0, height: 0 }
    }
  },

  methods: {
    contentResize() {
      this.content.width = this.$refs.content.scrollWidth
      this.content.height = this.$refs.content.scrollHeight
      this.wrapper.width = this.$refs.wrapper.clientWidth
      this.wrapper.height = this.$refs.wrapper.clientHeight
      this.$nextTick(() => {
        if (this.x < this.scrollableArea.x) this.x = this.scrollableArea.x
        if (this.y < this.scrollableArea.y) this.y = this.scrollableArea.y
      })
    },

    /**
     * 滚动
     * @param direction 方向: x,y
     * @param delta 滚动量
     */
    scroll(direction, delta) {
      if (!['x', 'y'].includes(direction)) return
      const temp = this[direction] - delta
      if (temp > 0) {
        this[direction] = 0
      } else if (temp < this.scrollableArea[direction]) {
        this[direction] = this.scrollableArea[direction]
      } else {
        this[direction] = temp
      }
    },

    // 鼠标滚轮事件
    onMousewheel(e) {
      this.scroll('x', e.deltaX)
      this.scroll('y', e.deltaY)
    }
  },

  mounted() {
    addResizeListener(this.$refs.wrapper, this.contentResize)
    addResizeListener(this.$refs.content, this.contentResize)
  },

  beforeDestroy() {
    removeResizeListener(this.$refs.wrapper, this.contentResize)
    removeResizeListener(this.$refs.content, this.contentResize)
  }
}
</script>

<style lang="scss" scoped>
.scrollbar-view-wrapper {
  position: relative;
  height: 100%;
  overflow: hidden;
  &:hover,
  &--always {
    .scrollbar {
      opacity: 1;
    }
  }
}

.scrollbar {
  position: absolute;
  right: 2px;
  bottom: 2px;
  z-index: 99999;
  border-radius: 4px;
  opacity: 0;
  transition: opacity 0.5s ease-out;
  background-color: rgba($color: #ccc, $alpha: 0.4);
  &--horizontal {
    height: 6px;
    left: 2px;
    .scroll-bar__thumb {
      height: 100%;
    }
  }

  &--vertical {
    width: 6px;
    top: 2px;
    .scroll-bar__thumb {
      width: 100%;
    }
  }

  &__thumb {
    position: relative;
    display: block;
    width: 0;
    height: 0;
    cursor: pointer;
    border-radius: inherit;
    background-color: hsla(223, 3%, 50%, 0.3);
    transition: background-color 0.3s;
  }
}
</style>
