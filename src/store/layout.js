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
    isDisplayPageHeader: true,
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
        commit('updateLayout', layout)
      } else {
        commit('clearLayout')
      }
    },
    // 更新界面标题
    updateTitle({ commit }, routeName) {
      commit('updateLayout', { title: getTitleFromStorage(routeName) })
    },
    // 更新菜单栏折叠状态
    updateMenuCollapsed({ commit }, isCollapsed) {
      commit('updateLayout', { isMenuCollapsed: isCollapsed })
    }
  }
}
