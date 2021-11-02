
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入全局样式
// import '@/assets/css/index.scss'


// 全局引入按需引入UI库 vant
import '@/plugins/vant'

import vueHashCalendar from 'vue-hash-calendar'
import 'vue-hash-calendar/lib/vue-hash-calendar.css'
Vue.use(vueHashCalendar)
// 引入单个组件样式
import 'vant/lib/index.less';
// 移动端适配
// import 'lib-flexible/flexible.js'

// filters
// import './filters'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * use environment variables to determine is required
 * ajax request matching rurl is intercepted ! ! !
 */

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
