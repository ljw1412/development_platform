// 遍历菜单查找当前路由名称的标题
function findMenu(list, name) {
  for (let i = 0; i < list.length; i++) {
    const menu = list[i]
    let title = menu.title
    if (menu.route.name === name) return title
    if (menu.children && menu.children.length) {
      let subTitle = findMenu(menu.children, name)
      if (subTitle) return title + ' / ' + subTitle
    }
  }
  return ''
}

const getTitleFromStorage = routeName => {
  const menu = Store.get('menu')
  if (!menu) return ''
  return findMenu(menu, routeName)
}

const defaultState = () => {
  return {
    isMenuCollapsed: true,
    /* 用于 PageHeader */
    // 控制是否为返回模式，如果为 false 者返回首页
    isBack: false,
    title: ''
  }
}

export default {
  namespaced: true,
  state: defaultState(),
  getters: {},
  mutations: {
    clearLayout(state) {
      Object.assign(state, defaultState())
    },
    updateLayout(state, layout) {
      Object.assign(state, layout)
      Store.set('layout', state)
    }
  },
  actions: {
    // 同步界面布局
    syncLayout({ commit }, routeName) {
      let layout = Store.get('layout')
      if (layout) {
        if (routeName) layout.title = getTitleFromStorage(routeName)
        Object.assign(layout, {
          isBack: false
        })
        commit('updateLayout', layout)
      } else {
        commit('clearLayout')
      }
    },
    // 根据路由同步界面标题
    syncTitle({ commit }, routeName) {
      commit('updateLayout', { title: getTitleFromStorage(routeName) })
    },
    // 修改标题
    updateTitle({ commit }, data) {
      commit('updateLayout', typeof data === 'string' ? { title: data } : data)
    },
    // 更新菜单栏折叠状态
    updateMenuCollapsed({ commit }, isCollapsed) {
      commit('updateLayout', { isMenuCollapsed: isCollapsed })
    }
  }
}
