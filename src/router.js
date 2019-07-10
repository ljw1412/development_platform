import Vue from 'vue'
import Router from 'vue-router'
const Login = () => import(/* webpackChunkName: "login" */ './views/Login')
const Main = () => import(/* webpackChunkName: "main" */ './views/Main')
const Personal = () =>
  import(/* webpackChunkName: "main" */ './views/Main/Personal')
const Setting = () =>
  import(/* webpackChunkName: "main" */ './views/Main/Setting')
const MenuEdit = () =>
  import(/* webpackChunkName: "main" */ './views/Main/Setting/MenuEdit')
const UserEdit = () =>
  import(/* webpackChunkName: "main" */ './views/Main/Setting/UserEdit')
const FileBrowser = () =>
  import(/* webpackChunkName: "main" */ './views/Main/FileBrowser')
const ProjectList = () =>
  import(/* webpackChunkName: "main" */ './views/Main/Project/List')
const ProjectCreate = () =>
  import(/* webpackChunkName: "main" */ './views/Main/Project/Create')

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
      component: Login
    },
    {
      path: '/main',
      name: 'main',
      component: Main,
      children: [
        {
          path: 'personal',
          name: 'personal',
          component: Personal
        },
        {
          path: 'setting',
          name: 'setting',
          component: Setting,
          children: [
            {
              path: 'menu',
              name: 'menuEdit',
              component: MenuEdit
            },
            {
              path: 'user',
              name: 'userEdit',
              component: UserEdit
            }
          ]
        },
        {
          path: 'file',
          name: 'fileBrowser',
          component: FileBrowser
        },
        {
          path: 'project',
          name: 'project',
          component: ProjectList
        },
        {
          path: 'project/create',
          name: 'projectCreate',
          component: ProjectCreate
        }
      ]
    }
  ]
})
