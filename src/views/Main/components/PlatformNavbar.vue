<template>
  <el-menu router
    class="menu"
    :collapse="isCollapsed">
    <div class="menu__collapse el-menu-item"
      @click="isCollapsed = !isCollapsed">
      <i :class="isCollapsed ?
       'el-icon-arrow-right' : 'el-icon-arrow-left'" />
    </div>
    <el-menu-item v-for="item of menuList"
      :key="item.index"
      :index="item.index"
      :route="item.route">
      <i :class="item.icon"></i>
      <span slot="title">{{item.title}}</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      isCollapsed: true,
      activeIndex: 0,
      menuList: []
    }
  },

  methods: {
    reFindMenuList() {
      this.$callApi({ api: 'api/list_all_menu' }).then(data => {
        this.menuList = data
      })
    }
  },

  mounted() {
    this.reFindMenuList()
  }
}
</script>

<style lang="scss" scoped>
.menu {
  height: 100%;
  &:not(.el-menu--collapse) {
    width: 200px;
  }
  &__collapse {
    text-align: center;
  }
}
</style>
