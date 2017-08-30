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
          <Input class="login-input" type="password" size="large" v-model="formLogin.password">
            <Icon type="ios-locked-outline" size="20" slot="prepend"></Icon>
          </Input>
        </Form-item>
        <Button class="login-button" type="primary" size="large" @click="login('formLogin')">登 录</Button>
      </Form>
    </div>
  </div>
</template>

<script>
import CanvasBackground from '../common/CanvasBackground'

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
      }
    }
  },
  methods: {
    login (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$http.post('/users/login', {
            username: this.formLogin.username,
            password: this.formLogin.password
          })
            .then((res) => {
              if (res.data.status === 0) {
                this.$Message.success(res.data.msg)
                localStorage.setItem('bearcToken', res.data.result.token)
                this.$store.commit('login', res.data.result.username)
                this.$router.push('/admin')
              } else {
                this.$Message.error(res.data.msg)
              }
            })
            .catch((err) => {
              console.log(err)
            })
        } else {
          this.$Message.error('表单验证失败!')
        }
      })
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
