import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './inject'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeResolve((to, from, next) => {
  store.dispatch('user/syncUser')
  store.dispatch('layout/syncLayout', to.name)
  next()
})

router.afterEach((to, from) => {
  if (!Cookies.get('token')) router.replace({ name: 'login' })
})
