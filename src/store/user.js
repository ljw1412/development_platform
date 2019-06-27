// 默认 State
const defaultState = () => {
  return {
    id: '',
    username: '',
    nickname: '',
    token: ''
  }
}

export default {
  namespaced: true,
  state: defaultState(),
  getters: {},
  mutations: {
    // 更新用户信息
    updateUser(state, user) {
      Object.assign(state, user)
    },

    //清除用户信息
    clearUser(state) {
      Object.assign(state, defaultState())
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
