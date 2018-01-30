let local = {
  // 数组去重
  uniqueArray (array) {
    return Array.from(new Set(array))
  },
  // 深拷贝
  clone (obj) {
    var o
    if (typeof obj === 'object') {
      if (obj === null) {
        o = null
      } else {
        if (obj instanceof Array) {
          o = []
          for (var i = 0, len = obj.length; i < len; i++) {
            o.push(local.clone(obj[i]))
          }
        } else {
          o = {}
          for (var j in obj) {
            o[j] = local.clone(obj[j])
          }
        }
      }
    } else { o = obj }
    return o
  }
}

export default {
  install (Vue) {
    Vue.prototype.$local = local
  }
}
