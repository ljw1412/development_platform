<template>
  <div class="platform">
    <platform-header></platform-header>
    <section class="platform__container">
      <platform-navbar></platform-navbar>
      <main>
        <router-view></router-view>
      </main>
    </section>
  </div>
</template>

<script>
import PlatformHeader from './components/PlatformHeader'
import PlatformNavbar from './components/PlatformNavbar'
export default {
  components: {
    PlatformHeader,
    PlatformNavbar
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
  &__container {
    height: calc(100% - 50px);
    display: flex;
    main {
      flex-grow: 1;
    }
  }
}
</style>
