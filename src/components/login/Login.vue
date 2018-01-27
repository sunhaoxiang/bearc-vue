<template>
  <div style="display:flex">
    <canvas-background></canvas-background>
    <div class="login-wrapper">
      <h2 class="login-title text-center">Bearc 管理系统 - 登录</h2>
      <Form ref="formLogin" :model="formLogin" :rules="ruleLogin">
        <Form-item prop="username">
          <Input class="login-input" type="text" size="large" v-model="formLogin.username">
            <Icon type="ios-person-outline" size="20" slot="prepend"></Icon>
          </Input>
        </Form-item>
        <Form-item prop="password">
          <Input class="login-input" type="password" size="large" v-model="formLogin.password" @keyup.enter.native="loginSubmit('formLogin')">
            <Icon type="ios-locked-outline" size="20" slot="prepend"></Icon>
          </Input>
        </Form-item>
        <Button class="login-button" type="primary" size="large" :loading="loginLoading" @click="loginSubmit('formLogin')">{{loginBtnText}}</Button>
      </Form>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import CanvasBackground from '../common/background/CanvasBackground'
import { login } from '@/axios'

export default {
  data () {
    return {
      formLogin: {
        username: '',
        password: ''
      },
      ruleLogin: {
        username: [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      },
      loginLoading: false
    }
  },
  computed: {
    loginBtnText () {
      return this.loginLoading ? '登录中…' : '登 录'
    }
  },
  methods: {
    loginSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.loginAsync()
        } else {
          this.$Message.error('表单验证失败')
        }
      })
    },
    async loginAsync () {
      this.loginLoading = true
      try {
        let res = await login({
          username: this.formLogin.username,
          password: this.formLogin.password
        })
        if (res.data.status === 0) {
          this.$Message.success(res.data.msg)
          Cookies.set('bearcToken', res.data.result.token)
          this.$store.commit('login', res.data.result.username)
          this.$router.push('goods/welcome')
        } else {
          this.$Message.error(res.data.msg)
          this.loginLoading = false
        }
      } catch (err) {
        this.loginLoading = false
        console.log(err)
      }
    }
  },
  components: {
    CanvasBackground
  }
}
</script>

<style lang="scss" scoped>
.login-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 300px;
  .login-title {
    margin-bottom: 60px;
  }
  .login-input {
    width: 300px;
  }
  .login-button {
    width: 300px;
    margin-top: 30px;
  }
}
</style>
