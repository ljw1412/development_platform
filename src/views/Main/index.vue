<template>
  <div class="platform">
    <platform-header></platform-header>
    <section class="platform__container">
      <platform-navbar></platform-navbar>
      <main>
        <page-header></page-header>
        <router-view></router-view>
      </main>
    </section>
  </div>
</template>

<script>
import PlatformHeader from './components/PlatformHeader'
import PlatformNavbar from './components/PlatformNavbar'
import PageHeader from './components/PageHeader'
export default {
  components: {
    PlatformHeader,
    PlatformNavbar,
    PageHeader
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
  overflow: hidden;
  &__container {
    height: calc(100% - 50px);
    display: flex;
    main {
      flex-grow: 1;
    }
  }
  main {
    padding: 20px 20px 0 20px;
  }
}
</style>
