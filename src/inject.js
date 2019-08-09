import Vue from 'vue'
import VScrollbar from '@/components/VScrollbar'
import BaseListLayout from '@/components/layout/BaseListLayout'
import ECharts from '@/components/ECharts'
import Result from '@/components/Result'
import ElementUI from 'element-ui'
import '@/theme/element-variables.scss'
import callApi from './utils/api'
import Store from 'store'
import expirePlugin from 'store/plugins/expire'

Vue.prototype.$callApi = callApi

Vue.use(ElementUI, { size: 'small' })

Vue.component('Scrollbar', VScrollbar)
Vue.component('BaseListLayout', BaseListLayout)
Vue.component('ECharts', ECharts)
Vue.component(Result.name, Result)

Store.addPlugin(expirePlugin)
window.Store = Store
