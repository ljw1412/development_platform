export default {
  namespaced: true,
  state: {
    id: '',
    username: '',
    nickname: '',
    token: ''
  },
  getters: {},
  mutations: {
    // 更新用户信息
    updateUser(state, user) {
      Object.assign(state, user)
    },

    //清除用户信息
    clearUser(state) {
      Object.keys(state).forEach(key => {
        state[key] = ''
      })
    }
  },
  actions: {
    // 同步用户信息
    syncUser({ commit }) {
      const user = Store.get('user')
      if (user) {
        commit('updateUser', user)
      } else {
        commit('clearUser')
      }
    }
  }
}
