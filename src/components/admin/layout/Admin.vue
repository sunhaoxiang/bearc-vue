<template>
  <div>
    <Menu mode="horizontal" theme="dark" active-name="1">
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
        <MenuItem name="4" class="fr">
          <Icon type="ios-gear"></Icon>
          综合设置
        </MenuItem>
    </Menu>
    <router-view></router-view>
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
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.$store.state.login === true) {
        next()
      } else {
        vm.$http.post('users/verifytoken', {
          token: localStorage.getItem('bearcToken')
        })
          .then((res) => {
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
