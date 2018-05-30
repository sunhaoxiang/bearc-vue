const local = {
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
  },
  // log
  log (arg1 = 'log', ...logs) {
    if (logs.length === 0) {
      console.log(arg1)
    } else {
      console.group(arg1)
      logs.forEach(e => {
        console.log(e)
      })
      console.groupEnd()
    }
  }
}

export default {
  install (Vue) {
    Vue.prototype.$local = local
  }
}
