import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './inject'

Vue.config.productionTip = false
// 禁止在定时里跑，当开两个页面的时候，定时任务会影响另一个页面的正常界面状态
Vue.prototype.$setPageTitle = data => {
  store.dispatch('layout/updateTitle', data)
}

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
