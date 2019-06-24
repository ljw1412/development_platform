// 遍历菜单查找当前路由名称的标题
function findMenu(list, name) {
  for (let i = 0; i < list.length; i++) {
    const menu = list[i]
    let title = menu.title
    console.log(title)

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

export default {
  namespaced: true,
  state: {
    isMenuCollapsed: true,
    isDisplayPageHeader: true,
    title: ''
  },
  getters: {},
  mutations: {
    updatePageTitle(state, title) {
      state.title = title
      Store.set('layout', state)
    },
    updateLayout(state, layout) {
      Object.assign(state, layout)
    },
    // 更新菜单栏折叠状态
    updateMenuCollapsed(state, isCollapsed) {
      state.isMenuCollapsed = isCollapsed
      Store.set('layout', state)
    }
  },
  actions: {
    // 同步界面布局
    syncLayout({ commit }, routeName) {
      const layout = Store.get('layout')
      if (layout) {
        if (routeName) layout.title = getTitleFromStorage(routeName)
        commit('updateLayout', layout)
      }
    }
  }
}
