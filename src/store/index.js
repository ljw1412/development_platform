import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import layout from './layout'

Vue.use(Vuex)

const defaultStore = {}

defaultStore.modules = {
  user,
  layout
}

export default new Vuex.Store(defaultStore)
