<template>
  <el-menu ref="menu"
    class="menu"
    unique-opened
    :default-active="activeIndex"
    :collapse="isCollapsed">
    <template v-for="item of menuList">
      <el-submenu v-if="item.children && item.children.length"
        :key="item.id"
        :index="item.id">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.title}}</span>
        </template>
        <el-menu-item v-for="el of item.children"
          :key="el.id"
          :index="el.route.name"
          @click="onMenuItemClick(el,item)">
          <i :class="el.icon"></i>
          <span slot="title">{{el.title}}</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item v-else
        :key="item.id"
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
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: 'PlatformNavbar',

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
    ...mapActions('layout', ['updateMenuCollapsed', 'syncTitle']),

    reFindMenuList() {
      this.$callApi({ api: 'api/list_all_menu' }).then(data => {
        this.menuList = data
        Store.set('menu', data)
      })
    },

    onMenuItemClick(item, parent) {
      this.$router.push(item.route)
    },

    updateActiveIndex(name) {
      this.activeIndex = name
      this.$nextTick(() => {
        if (!this.$refs.menu.activeIndex) {
          const menu = this.menuList.find(
            item => !name.indexOf(item.route.name)
          )
          if (menu) this.activeIndex = menu.route.name
        }
      })
    }
  },

  mounted() {
    this.updateActiveIndex(this.$route.name)
    this.reFindMenuList()
  },

  watch: {
    '$route.name'(name) {
      this.updateActiveIndex(name)
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

  @mixin active-left-line {
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 3px;
      height: 100%;
      background-color: #409eff;
    }
  }

  .is-active {
    &.el-menu-item {
      @include active-left-line;
    }

    &.el-submenu {
      position: relative;
      /deep/ .el-submenu__title {
        @include active-left-line;
        * {
          color: #409eff;
        }
      }
    }
  }
}
</style>
