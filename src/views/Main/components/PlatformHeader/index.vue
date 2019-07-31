<template>
  <header :style="{width:headerWidth}">
    <div class="header-left">
      <div class="menu-trigger"
        @click="onMenuFoldClick">
        <i :class="!isMenuCollapsed ? 'el-icon-s-fold':'el-icon-s-unfold'"></i>
      </div>
      <page-title class="page-title"></page-title>
    </div>
    <div class="header-right">
      <profile-info></profile-info>
    </div>
  </header>
</template>

<script>
import PageTitle from '../PageTitle'
import ProfileInfo from './ProfileInfo'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'PlatformHeader',

  components: {
    PageTitle,
    ProfileInfo
  },

  computed: {
    ...mapState('layout', ['isMenuCollapsed']),

    headerWidth() {
      return `calc(100% - ${this.isMenuCollapsed ? '64px' : '200px'})`
    }
  },

  methods: {
    ...mapActions('layout', ['updateMenuCollapsed']),

    onMenuFoldClick() {
      this.updateMenuCollapsed(!this.isMenuCollapsed)
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 90;
  display: flex;
  height: 50px;
  color: #fff;
  background-color: #545c64;
  align-items: center;
  justify-content: space-between;
  transition: width 0.3s ease-in-out;
}

.header-left {
  display: flex;
  .menu-trigger {
    display: flex;
    position: relative;
    font-size: 22px;
    height: 50px;
    width: 50px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-align: center;
    i {
      margin: auto;
    }
    &:hover {
      background-color: rgba($color: #fff, $alpha: 0.2);
    }
  }
  .page-title {
    margin: auto;
    padding-left: 15px;
  }
}

.header-right {
  margin-right: 10px;
}
</style>
