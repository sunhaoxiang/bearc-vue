<template>
  <div>
    <Menu class="pa-l-20 pa-r-20" mode="horizontal" theme="dark" :active-name="activeName" @on-select="selectMenu">
      <li class="ivu-menu-item logo">logo</li>
      <MenuItem name="goods">
        <Icon type="ios-paper"></Icon>
        商品管理
      </MenuItem>
      <MenuItem name="customers">
        <Icon type="ios-people"></Icon>
        客户管理
      </MenuItem>
      <MenuItem name="statistics">
        <Icon type="ios-pulse-strong"></Icon>
        统计分析
      </MenuItem>
      <MenuItem name="settings">
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
        <span>注销</span>
      </p>
      <div class="text-center">
        <p>确定要注销吗？</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long @click="logout">确 定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  props: {
    activeName: {
      type: String
    }
  },
  data () {
    return {
      logoutModal: false
    }
  },
  methods: {
    selectMenu (name) {
      this.$router.push(`/${name}`)
    },
    logout () {
      Cookies.remove('bearcToken')
      this.$store.commit('logout')
      this.$router.push('/login')
    }
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
