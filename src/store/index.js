import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    login: false,
    username: '',
    token: ''
  },
  mutations: {
    login (state) {
      state.login = true
    }
  }
})

export default store
