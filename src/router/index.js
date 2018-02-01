import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import Cookies from 'js-cookie'
import Register from './Register'
import Login from './Login'
import Admin from './Admin'
import Page404 from './404'
import { verifyToken } from '@/axios'

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
    Register,
    Login,
    Admin,
    Page404,
    {
      path: '*',
      redirect: '/404'
    }
  ]
})

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title
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

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})

export default router
