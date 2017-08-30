import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    login: false,
    username: ''
  },
  mutations: {
    login (state, username) {
      state.username = username
      state.login = true
    }
  }
})

export default store
