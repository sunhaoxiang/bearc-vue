<template>
  <div style="display:flex">
    <canvas-background></canvas-background>
    <div class="register-wrapper">
      <h2 class="register-title text-center">Bearc 管理系统 - 注册</h2>
      <Form ref="formRegister" :model="formRegister" :rules="ruleRegister">
        <Form-item prop="username">
          <Input class="register-input" type="text" size="large" v-model="formRegister.username">
            <Icon type="ios-person-outline" size="20" slot="prepend"></Icon>
          </Input>
        </Form-item>
        <Form-item prop="password">
          <Input class="register-input" type="password" size="large" v-model="formRegister.password" @keyup.enter.native="registerSubmit('formRegister')">
            <Icon type="ios-locked-outline" size="20" slot="prepend"></Icon>
          </Input>
        </Form-item>
        <Button class="register-button" type="primary" size="large" @click="registerSubmit('formRegister')">注 册</Button>
      </Form>
    </div>
  </div>
</template>

<script>
import CanvasBackground from '../common/background/CanvasBackground'
import { register } from '@/axios'

export default {
  data () {
    return {
      formRegister: {
        username: '',
        password: ''
      },
      ruleRegister: {
        username: [
          { required: true, message: '账号不能为空', trigger: 'blur' },
          { type: 'string', min: 6, message: '账号不能少于6个字符', trigger: 'blur' },
          { type: 'string', max: 32, message: '账号不能多于32个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码不能少于6个字符', trigger: 'blur' },
          { type: 'string', max: 32, message: '密码不能多于32个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    registerSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.registerAsync()
        } else {
          this.$Message.error('表单验证失败')
        }
      })
    },
    async registerAsync () {
      try {
        let res = await register({
          username: this.formRegister.username,
          password: this.formRegister.password
        })
        if (res.data.status === 0) {
          this.$Message.success(res.data.msg)
          this.$router.push('/login')
        } else {
          this.$Message.error(res.data.msg)
        }
      } catch (err) {
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
.register-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 300px;
  .register-title {
    margin-bottom: 60px;
  }
  .register-input {
    width: 300px;
  }
  .register-button {
    width: 300px;
    margin-top: 30px;
  }
}
</style>
