import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLogin: false,
    username: '',
    token: ''
  },
  mutations: {
    login (state, payload) {
      state.isLogin = true
      state.username = payload.username
      state.token = payload.token
    }
  }
})

export default store
