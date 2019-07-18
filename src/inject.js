import Vue from 'vue'
import VScrollbar from './components/VScrollbar'
import BaseListLayout from '@/components/layout/BaseListLayout'
import ElementUI from 'element-ui'
import '@/theme/element-variables.scss'
import callApi from './utils/api'
import Store from 'store'
import expirePlugin from 'store/plugins/expire'

Vue.prototype.$callApi = callApi

Vue.use(ElementUI, { size: 'small' })

Vue.component('Scrollbar', VScrollbar)
Vue.component('BaseListLayout', BaseListLayout)

Store.addPlugin(expirePlugin)
window.Store = Store
