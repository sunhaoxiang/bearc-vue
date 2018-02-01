const Register = resolve => require(['@/components/register/Register'], resolve)

export default {
  path: '/register',
  name: 'register',
  meta: {
    title: '注册'
  },
  component: Register
}
