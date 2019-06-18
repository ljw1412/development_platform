import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: '',
      username: '',
      nickname: '',
      token: ''
    }
  },
  getters: {},
  mutations: {
    updateUser(state, user) {
      Object.assign(state.user, user)
    },
    clearUser({ user }) {
      Object.keys(user).forEach(key => {
        user[key] = ''
      })
    }
  },
  actions: {
    updateUser({ commit }) {
      const user = Store.get('user')
      if (user) {
        commit('updateUser', user)
      } else {
        commit('clearUser')
      }
    }
  }
})
