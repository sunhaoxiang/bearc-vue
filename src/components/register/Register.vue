<template>
  <div style="display:flex">
    <canvas-background></canvas-background>
    <div class="login-wrapper">
      <h2 class="login-title text-center">Bearc 管理系统 - 注册</h2>
      <Input class="login-input" type="text" size="large" v-model="username">
          <span slot="prepend">账 号</span>
      </Input>
      <Input class="login-input" type="password" size="large" v-model="password">
          <span slot="prepend">密 码</span>
      </Input>
      <Button class="login-button" type="primary" size="large">注 册</Button>
    </div>
  </div>
</template>

<script>
import CanvasBackground from '../common/CanvasBackground'

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  components: {
    CanvasBackground
  }
}
</script>

<style scoped lang="scss">
.login-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
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
