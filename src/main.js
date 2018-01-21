//     ┏┓     ┏┓
//    ┏┛┻━━━━━┛┻┓
//    ┃         ┃
//    ┃    ━    ┃
//    ┃  ┳┛ ┗┳  ┃
//    ┃         ┃
//    ┃    ┻    ┃
//    ┃         ┃
//    ┗━┓     ┏━┛
//      ┃     ┃
//      ┃     ┃
//      ┃     ┗━━━━━┓
//      ┃           ┣┓
//      ┃           ┏┛
//      ┗┓┓┏━━━━━┳┓┏┛
//       ┃┫┫     ┃┫┫
//       ┗┻┛     ┗┻┛
//   神兽保佑,永无BUG
//   Code is far away from bug with the animal protecting

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import Utils from './lib/utils'
import '@/registerComponents.js'

Vue.use(VueLazyload, {
  loading: '/static/loading-svg/loading-bars.svg'
})
Vue.use(iView)
Vue.use(Utils)

// vue在启动时是否生成生产提示
Vue.config.productionTip = false
// 是否取消Vue所有的日志与警告
Vue.config.silent = false
// 给 v-on 自定义键位别名
Vue.config.keyCodes = {
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
