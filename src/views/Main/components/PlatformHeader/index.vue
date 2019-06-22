<template>
  <header>
    <div class="header-left">
      <div class="header-left__logo"
        :style="{'background-image':`url(${require('@/assets/logo.svg')})`}">
      </div>
    </div>
    <div class="header-right">
      <profile-info></profile-info>
    </div>
  </header>
</template>

<script>
import ProfileInfo from './ProfileInfo'
export default {
  name: 'PlatformHeader',

  components: {
    ProfileInfo
  }
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  height: 50px;
  width: 100%;
  color: #fff;
  background-color: #545c64;
  align-items: center;
  justify-content: space-between;
  .header-left {
    margin-left: 10px;
    &__logo {
      width: 200px;
      height: 36px;
      background-size: 100%;
      background-repeat: no-repeat;
      background-position: center;
    }
  }
  .header-right {
    margin-right: 10px;
  }
}
</style>
