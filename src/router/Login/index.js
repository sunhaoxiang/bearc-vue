const Login = resolve => require(['@/components/login/Login'], resolve)

export default {
  path: '/login',
  name: 'login',
  meta: {
    title: '登录'
  },
  component: Login
}
