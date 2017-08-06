import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import Utils from './lib/utils'

Vue.use(VueAxios, Axios)
Vue.use(iView)
Vue.use(Utils)

Vue.config.productionTip = false
// 接口地址
Axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5986c047a1d30433d8566e7e/bearc-vue/'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
