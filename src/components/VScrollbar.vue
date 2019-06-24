<template>
  <div ref="wrapper"
    class="scrollbar-view-wrapper">
    <div ref="content"
      class="scrollbar-view"
      :style="viewStyles">
      <slot></slot>
    </div>
    <div ref="barY"
      class="scrollbar scrollbar--vertical">
      <div ref="thumbY"
        class="scrollbar__thumb"></div>
    </div>
    <div ref="barX"
      class="scrollbar scrollbar--horizontal">
      <div ref="thumbX"
        class="scrollbar__thumb"></div>
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

  computed: {
    viewStyles() {
      return {
        transform: `translate(${this.scrollTop}px, ${this.scrollLeft}px)`
      }
    }
  },

  data() {
    return {
      scrollTop: 0,
      scrollLeft: 0,

      wrapper: { width: 0, height: 0 },
      content: { width: 0, height: 0 }
    }
  },

  methods: {
    contentResize(e) {
      this.content.width = this.$refs.content.scrollWidth
      this.content.height = this.$refs.content.scrollHeight
      this.wrapper.width = this.$refs.wrapper.clientWidth
      this.wrapper.height = this.$refs.wrapper.clientHeight
    }
  },

  mounted() {
    addResizeListener(this.$refs.content, this.contentResize)
  },

  beforeDestroy() {
    removeResizeListener(this.$refs.content, this.contentResize)
  }
}
</script>

<style lang="scss" scoped>
.scrollbar-view-wrapper {
  height: 100%;
  overflow: hidden;
}

.scrollbar {
  position: absolute;
  right: 2px;
  bottom: 2px;
  z-index: 99999;
  border-radius: 4px;
  opacity: 0.4;
  transition: opacity 0.12s ease-out;
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
