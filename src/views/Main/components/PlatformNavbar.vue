<template>
  <el-menu ref="menu"
    class="menu"
    unique-opened
    :default-active="activeIndex"
    :collapse="isCollapsed">
    <div class="logo-wrapper">
      <div class="logo">
        <i class="el-icon-coffee-cup"></i>
        <span v-show="!isCollapsed">研发管理平台</span>
      </div>
    </div>
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
        this.updateActiveIndex(this.$route.name)
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
@import '@/theme/index.scss';
.logo-wrapper {
  box-sizing: border-box;
  height: 50px;
  overflow-x: hidden;
  text-overflow: clip;
  white-space: nowrap;
  user-select: none;
  border: 1px solid $--border-color-lighter;
}
.logo {
  display: flex;
  height: 100%;
  align-items: center;
  padding: 0 20px;
  i {
    font-size: 24px;
  }
  span {
    margin-left: 5px;
  }
}
.menu {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 80;
  height: 100%;
  &:not(.el-menu--collapse) {
    width: 200px;
  }
  &::after {
    height: 56px;
    width: 100%;
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
