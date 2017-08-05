let local = {
  test () {
    console.log('test')
  }
}

export default {
  install (Vue) {
    Vue.prototype.$local = local
  }
}
