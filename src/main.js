import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import '@/theme/element-variables.scss'
import callApi from './utils/api'

Vue.config.productionTip = false

Vue.prototype.$callApi = callApi

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
