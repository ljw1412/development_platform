import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: { name: 'login' }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import(/* webpackChunkName: "main" */ './views/Main'),
      children: [
        {
          path: 'setting',
          name: 'setting',
          component: () =>
            import(/* webpackChunkName: "main" */ './views/Main/Setting'),
          children: [
            {
              path: 'menu',
              name: 'menuEdit',
              component: () =>
                import(
                  /* webpackChunkName: "main" */ './views/Main/Setting/MenuEdit'
                )
            },
            {
              path: 'user',
              name: 'userEdit',
              component: () =>
                import(
                  /* webpackChunkName: "main" */ './views/Main/Setting/UserEdit'
                )
            }
          ]
        },
        {
          path: 'file',
          name: 'fileBrowser',
          component: () =>
            import(/* webpackChunkName: "main" */ './views/Main/FileBrowser')
        }
      ]
    }
  ]
})
