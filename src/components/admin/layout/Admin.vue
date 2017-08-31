<template>
  <div>
    <Menu mode="horizontal" theme="dark" active-name="1" class="pa-l-20 pa-r-20">
      <li class="ivu-menu-item logo">logo</li>
      <MenuItem name="1">
        <Icon type="ios-paper"></Icon>
        商品管理
      </MenuItem>
      <MenuItem name="2">
        <Icon type="ios-people"></Icon>
        客户管理
      </MenuItem>
      <MenuItem name="3">
        <Icon type="stats-bars"></Icon>
        统计分析
      </MenuItem>
      <MenuItem name="4">
        <Icon type="ios-gear"></Icon>
        综合设置
      </MenuItem>
      <li class="ivu-menu-item user" @click="logoutModal = true">
        <Icon type="power"></Icon>
        注销 {{$store.state.username}}
      </li>
    </Menu>
    <Modal v-model="logoutModal" width="360">
      <p slot="header" class="modal text-center">
        <Icon type="information-circled"></Icon>
        <span>退出登录</span>
      </p>
      <div class="text-center">
        <p>确定要退出登录吗？</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long @click="logout">退出</Button>
      </div>
    </Modal>
    <router-view></router-view>
  </div>
</template>

<script>
import { verifyToken } from '@/axios/axios.js'

export default {
  name: 'adminLayout',
  data () {
    return {
      logoutModal: false
    }
  },
  methods: {
    logout () {
      localStorage.setItem('bearcToken', '')
      this.$store.commit('logout')
      this.$router.push('/login')
    }
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
          console.log(res)
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
  }
}
</script>

<style scoped lang="scss">
.logo{
  width: 200px;
}
.user {
  float: right;
}
.modal {
  color:#f60;
}
</style>
