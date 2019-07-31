<template>
  <div class="platform">
    <platform-navbar></platform-navbar>
    <platform-header></platform-header>
    <main :class="`sidebar--${isMenuCollapsed?'fold':'unfold'}`">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import PlatformHeader from './components/PlatformHeader'
import PlatformNavbar from './components/PlatformNavbar'
import { mapState } from 'vuex'
export default {
  name: 'Main',

  components: {
    PlatformHeader,
    PlatformNavbar
  },

  computed: {
    ...mapState('layout', ['isMenuCollapsed'])
  },

  data() {
    return {
      isCollapsed: false,
      activeIndex: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.platform {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  main {
    padding-top: 50px;
    transition: padding-left 0.3s ease-in-out;
    &.sidebar {
      &--fold {
        padding-left: 64px;
      }
      &--unfold {
        padding-left: 200px;
      }
    }
  }
}
</style>
