import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import '@/theme/element-variables.scss'
import callApi from './utils/api'
import Cookies from 'js-cookie'
import Store from 'store'
import expirePlugin from 'store/plugins/expire'

Vue.config.productionTip = false
Vue.prototype.$callApi = callApi

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeResolve((to, from, next) => {
  store.dispatch('updateUser')
  next()
})

Store.addPlugin(expirePlugin)
window.Cookies = Cookies
window.Store = Store
