import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

// 导入全局样式
import '@/assets/css/global.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

// 静态数据
import constant from '@/common/index.js'
Vue.prototype.constant = constant

import '@/icons' // icon
import '@/permission' // permission control

// 添加时间处理至原型链
import '@/utils/date'

import JsonExcel from 'vue-json-excel'
Vue.component('downloadExcel', JsonExcel)

import '@/utils/datefilter'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
Vue.use(ElementUI, {
  locale
})
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

window.$constant = constant
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this // 安装全局事件总线
  },
  render: h => h(App)
})
