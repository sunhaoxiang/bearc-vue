import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import Cookies from 'js-cookie'
import { verifyToken } from '@/axios/axios'
import Admin from './Admin'

// 前台内容
// const Layout = resolve => require(['@/components/goods/layout/Layout'], resolve)
// const Hot = resolve => require(['@/components/goods/module/Hot'], resolve)
// const MilkPowders = resolve => require(['@/components/goods/module/MilkPowders'], resolve)
// const BabyFoods = resolve => require(['@/components/goods/module/BabyFoods'], resolve)
// const BabyArticles = resolve => require(['@/components/goods/module/BabyArticles'], resolve)
// const Masks = resolve => require(['@/components/goods/module/Masks'], resolve)
// const Creams = resolve => require(['@/components/goods/module/Creams'], resolve)
// const Cosmetics = resolve => require(['@/components/goods/module/Cosmetics'], resolve)
// const MildyWashes = resolve => require(['@/components/goods/module/MildyWashes'], resolve)
// const HealthProducts = resolve => require(['@/components/goods/module/HealthProducts'], resolve)
// const Accessories = resolve => require(['@/components/goods/module/Accessories'], resolve)
// const Detail = resolve => require(['@/components/goods/common/Detail'], resolve)

// 注册登录模块
const Register = resolve => require(['@/components/register/Register'], resolve)
const Login = resolve => require(['@/components/login/Login'], resolve)

// 404页面
const page404 = resolve => require(['@/components/admin/404/404'], resolve)

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'layout',
    //   component: Layout,
    //   children: [
    //     {
    //       path: 'hot',
    //       name: 'hot',
    //       component: Hot
    //     },
    //     {
    //       path: 'milkpowders',
    //       name: 'milkpowders',
    //       component: MilkPowders
    //     },
    //     {
    //       path: 'babyfoods',
    //       name: 'babyfoods',
    //       component: BabyFoods
    //     },
    //     {
    //       path: 'babyarticles',
    //       name: 'babyarticles',
    //       component: BabyArticles
    //     },
    //     {
    //       path: 'masks',
    //       name: 'masks',
    //       component: Masks
    //     },
    //     {
    //       path: 'creams',
    //       name: 'creams',
    //       component: Creams
    //     },
    //     {
    //       path: 'cosmetics',
    //       name: 'cosmetics',
    //       component: Cosmetics
    //     },
    //     {
    //       path: 'mildywashes',
    //       name: 'mildywashes',
    //       component: MildyWashes
    //     },
    //     {
    //       path: 'healthproducts',
    //       name: 'healthproducts',
    //       component: HealthProducts
    //     },
    //     {
    //       path: 'accessories',
    //       name: 'accessories',
    //       component: Accessories
    //     }
    //   ],
    //   redirect: '/hot'
    // },
    // {
    //   path: '/detail/:id',
    //   name: 'detail',
    //   component: Detail
    // },
    Admin,
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/404',
      name: '404',
      component: page404
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(item => item.meta.login)) {
    verifyTokenAsync()
  } else {
    next()
  }
  async function verifyTokenAsync () {
    try {
      let res = await verifyToken()
      switch (res.data.status) {
        case 0: // 验证成功
          store.commit('login', res.data.result.username)
          next()
          break
        case 1: // 验证成功，但需要更新token
          store.commit('login', res.data.result.username)
          Cookies.set('bearcToken', res.data.result.newToken)
          next()
          break
        default: // token无效
          next('/login')
          break
      }
    } catch (err) {
      console.log(err)
    }
  }
})

export default router
