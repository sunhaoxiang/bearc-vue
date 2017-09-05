<template>
  <div>
    <admin-header :activeName="routeName"></admin-header>
    <router-view class="body-wrapper body-min-height"></router-view>
    <admin-footer></admin-footer>
  </div>
</template>

<script>
import { verifyToken } from '@/axios/axios.js'
import AdminHeader from './AdminHeader'
import AdminFooter from './AdminFooter'

export default {
  name: 'adminLayout',
  data () {
    return {
      routeName: '',
      logoutModal: false
    }
  },
  methods: {
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.$store.state.login === true) {
        next()
      } else {
        verifyTokenAsync()
      }
      async function verifyTokenAsync () {
        try {
          let res = await verifyToken({
            token: localStorage.getItem('bearcToken')
          })
          switch (res.data.status) {
            // 验证成功
            case 0:
              vm.$store.commit('login', res.data.result.username)
              next()
              break
            // 验证成功，但需要更新token
            case 1:
              vm.$store.commit('login', res.data.result.username)
              localStorage.setItem('bearcToken', res.data.result.newToken)
              next()
              break
            // 验证失败
            default:
              vm.$Message.error(res.data.msg)
              next('/login')
              break
          }
        } catch (err) {
          console.log(err)
        }
      }
    })
  },
  watch: {
    $route (val, oldVal) {
      this.routeName = val.matched[1].name
    }
  },
  created () {
    this.routeName = this.$route.matched[1].name
  },
  components: {
    AdminHeader,
    AdminFooter
  }
}
</script>

<style scoped lang="scss">
</style>
