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

router.afterEach((to, from) => {
  let routeName = ''
  try {
    routeName = router.app.$route.name
  } catch (error) {
    console.error(error)
  }
  store.dispatch('layout/syncLayout', routeName)
  store.dispatch('user/syncUser')
})

Store.addPlugin(expirePlugin)
window.Cookies = Cookies
window.Store = Store
