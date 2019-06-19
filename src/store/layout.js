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
    syncLayout({ commit }) {
      const layout = Store.get('layout')
      if (layout) commit('updateLayout', layout)
    }
  }
}
