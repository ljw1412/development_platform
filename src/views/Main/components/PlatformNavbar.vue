<template>
  <el-menu ref="menu"
    class="menu"
    unique-opened
    :default-active="activeIndex"
    :collapse="isCollapsed">
    <template v-for="item of menuList">
      <el-submenu v-if="item.children && item.children.length"
        :key="item._id"
        :index="item._id">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.title}}</span>
        </template>
        <el-menu-item v-for="el of item.children"
          :key="el._id"
          :index="el.route.name"
          @click="onMenuItemClick(el,item)">
          <i :class="el.icon"></i>
          <span slot="title">{{el.title}}</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item v-else
        :key="item._id"
        :index="item.route.name"
        @click="onMenuItemClick(item)">
        <i :class="item.icon"></i>
        <span slot="title">{{item.title}}</span>
      </el-menu-item>
    </template>
    <div class="menu__collapse el-menu-item"
      @click="updateMenuCollapsed(!isCollapsed)">
      <i :class="isCollapsed ?
       'el-icon-arrow-right' : 'el-icon-arrow-left'" />
    </div>
  </el-menu>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState({ isCollapsed: state => state.layout.isMenuCollapsed })
  },

  data() {
    return {
      activeIndex: '',
      menuList: []
    }
  },

  methods: {
    ...mapMutations('layout', ['updateMenuCollapsed', 'updatePageTitle']),

    reFindMenuList() {
      this.$callApi({ api: 'api/list_all_menu' }).then(data => {
        this.menuList = data
        Store.set('menu', data)
      })
    },

    onMenuItemClick(item, parent) {
      this.$router.push(item.route)
    }
  },

  mounted() {
    this.activeIndex = this.$route.name
    this.reFindMenuList()
  },

  watch: {
    '$route.name'(name) {
      this.activeIndex = name
    }
  }
}
</script>

<style lang="scss" scoped>
.menu {
  height: 100%;
  &:not(.el-menu--collapse) {
    width: 200px;
  }
  &::after {
    height: 56px;
    width: 100%;
  }
  &__collapse {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center;
  }
}
</style>
