<template>
  <div>
    <login-canvas></login-canvas>
    <div class="login-wrapper">
      <h2 class="login-title text-center">Bearc 管理系统</h2>
      <Input class="login-input" type="text" size="large" v-model="userId">
          <span slot="prepend">账 号</span>
      </Input>
      <Input class="login-input" type="password" size="large" v-model="userPw">
          <span slot="prepend">密 码</span>
      </Input>
      <Button class="login-button" type="primary" size="large">登 录</Button>
    </div>


  </div>
</template>

<script>
import LoginCanvas from './LoginCanvas'

export default {
  data () {
    return {
      userId: '',
      userPw: ''
    }
  },
  components: {
    LoginCanvas
  }
}
</script>

<style scoped lang="scss">
.login-wrapper {
  margin: 250px auto 0;
  width: 300px;
  .login-title {
    margin-bottom: 80px;
  }
  .login-input {
    width: 300px;
    margin-bottom: 10px;
  }
  .login-button {
    width: 300px;
    margin-top: 30px;
  }
}
</style>
