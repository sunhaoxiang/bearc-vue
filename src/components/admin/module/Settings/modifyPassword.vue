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
          <Button type="primary" @click="submitModify('form')">确定</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
// import { typesList, addType, modifyType, removeType } from '@/axios/axios.js'

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
    submitModify (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {

        } else {
          this.$Message.error('请先填写表单')
        }
      })
    }
  }
}
</script>
