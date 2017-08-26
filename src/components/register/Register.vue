<template>
  <div style="display:flex">
    <canvas-background></canvas-background>
    <div class="register-wrapper">
      <h2 class="register-title text-center">Bearc 管理系统 - 注册</h2>
      <Form :model="formRegister" :rules="ruleRegister">
        <Form-item prop="username">
          <Input class="register-input" type="text" size="large" v-model="formRegister.username">
            <Icon type="ios-person-outline" size="20" slot="prepend"></Icon>
          </Input>
        </Form-item>
        <Form-item prop="password">
          <Input class="register-input" type="password" size="large" v-model="formRegister.password">
            <Icon type="ios-locked-outline" size="20" slot="prepend"></Icon>
          </Input>
        </Form-item>
        <Button class="register-button" type="primary" size="large" @click="register">注 册</Button>
      </Form>
    </div>
  </div>
</template>

<script>
import CanvasBackground from '../common/CanvasBackground'

export default {
  data () {
    return {
      formRegister: {
        username: '',
        password: ''
      },
      ruleRegister: {
        username: [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    register () {}
  },
  components: {
    CanvasBackground
  }
}
</script>

<style scoped lang="scss">
.register-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 300px;
  .register-title {
    margin-bottom: 80px;
  }
  .register-input {
    width: 300px;
    margin-bottom: 10px;
  }
  .register-button {
    width: 300px;
    margin-top: 30px;
  }
}
</style>
