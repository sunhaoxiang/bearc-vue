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
      if (vm.$store.state.login === false) {
        next('/login')
      } else {
        next()
      }
    })
  }
}
</script>

<style>

</style>
