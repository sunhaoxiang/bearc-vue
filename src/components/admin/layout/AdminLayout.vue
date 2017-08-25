<template>
  <div>
    <router-view></router-view>
    <Button type="primary" size="large" @click="test">测 试</Button>
  </div>
</template>

<script>
export default {
  name: 'adminLayout',
  data () {
    return {
    }
  },
  methods: {
    test () {
      this.$http.post('users/test', {
        token: this.$store.state.token
      })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.$store.state.login === true) {
        next()
      } else {
        vm.$http.post('users/verifytoken', {
          username: sessionStorage.getItem('bearcUsername'),
          token: sessionStorage.getItem('bearcToken')
        })
          .then((res) => {
            switch (res.data.status) {
              // 验证成功
              case 0:
                vm.$store.commit('login')
                next()
                break
              // 验证成功，但需要更新token
              case 1:
                sessionStorage.setItem('bearcToken', res.data.result.newToken)
                vm.$store.commit('login')
                next()
                break
              // 验证失败
              case 4:
                vm.$Message.error(res.data.msg)
                next('/login')
                break
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    })
  }
}
</script>

<style>

</style>
