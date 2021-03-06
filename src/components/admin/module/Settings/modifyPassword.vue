<template>
  <div>
    <Card shadow class="admin-card center">
      <h2 slot="title">
        <Icon type="ios-gear"></Icon>
        修改密码
      </h2>
      <Form ref="form" :model="form" :rules="rule" inline>
        <FormItem prop="oldPassword">
          <Input type="password" v-model="form.oldPassword" placeholder="旧密码">
            <span slot="prepend">旧密码</span>
          </Input>
        </FormItem>
        <FormItem prop="newPassword">
          <Input type="password" v-model="form.newPassword" placeholder="新密码">
            <span slot="prepend">新密码</span>
          </Input>
        </FormItem>
        <FormItem prop="repeatNewPassword">
          <Input type="password" v-model="form.repeatNewPassword" placeholder="重复新密码">
            <span slot="prepend">重复新密码</span>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="submit('form')">确定</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { modifyPassword } from '@/axios'

export default {
  data () {
    const validateRepeatNewPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('重复新密码不能为空'))
      } else if (value !== this.form.newPassword) {
        callback(new Error('两次密码输入不一致'))
      } else {
        callback()
      }
    }
    return {
      form: {
        oldPassword: '',
        newPassword: '',
        repeatNewPassword: ''
      },
      rule: {
        oldPassword: [{ required: true, message: '旧密码不能为空', trigger: 'blur' }],
        newPassword: [{ required: true, message: '新密码不能为空', trigger: 'blur' }],
        repeatNewPassword: [{ validator: validateRepeatNewPassword, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.modifyAsync({})
        } else {
          this.$Message.error('请先填写表单')
        }
      })
    },
    async modifyAsync () {
      try {
        let res = await modifyPassword({
          oldPassword: this.form.oldPassword,
          newPassword: this.form.newPassword
        })
        this.statusHandler(res)
      } catch (err) {
        console.log(err)
      }
    },
    statusHandler (res) {
      switch (res.data.status) {
        case -1: // 验证成功，但出错
          this.$Message.error(res.data.msg)
          break
        case 0: // 验证成功
          this.form.oldPassword = ''
          this.form.newPassword = ''
          this.form.repeatNewPassword = ''
          this.$Message.success(res.data.msg)
          break
        case 1: // 验证成功，但需要更新token
          this.form.oldPassword = ''
          this.form.newPassword = ''
          this.form.repeatNewPassword = ''
          Cookies.set('bearcToken', res.data.result.newToken)
          this.$Message.success(res.data.msg)
          break
        case 401: // token无效
          this.$router.push('/login')
          this.$Message.error(res.data.msg)
          break
        case 500: // 服务器错误
          this.$Message.error(res.data.msg)
          break
        default: // 未知错误
          this.$router.push('/login')
          this.$Message.error(res.data.msg)
          break
      }
    }
  }
}
</script>
