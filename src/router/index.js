import Vue from 'vue'
import Router from 'vue-router'

// 前台内容
const Layout = resolve => require(['@/components/goods/layout/Layout'], resolve)
const Hot = resolve => require(['@/components/goods/module/Hot'], resolve)
const MilkPowders = resolve => require(['@/components/goods/module/MilkPowders'], resolve)
const BabyFoods = resolve => require(['@/components/goods/module/BabyFoods'], resolve)
const BabyArticles = resolve => require(['@/components/goods/module/BabyArticles'], resolve)
const Masks = resolve => require(['@/components/goods/module/Masks'], resolve)
const Creams = resolve => require(['@/components/goods/module/Creams'], resolve)
const Cosmetics = resolve => require(['@/components/goods/module/Cosmetics'], resolve)
const MildyWashes = resolve => require(['@/components/goods/module/MildyWashes'], resolve)
const HealthProducts = resolve => require(['@/components/goods/module/HealthProducts'], resolve)
const Accessories = resolve => require(['@/components/goods/module/Accessories'], resolve)
const Detail = resolve => require(['@/components/goods/common/Detail'], resolve)

// 注册登录
const Register = resolve => require(['@/components/register/Register'], resolve)
const Login = resolve => require(['@/components/login/Login'], resolve)

// 后台内容
const Admin = resolve => require(['@/components/admin/layout/Admin'], resolve)
const Goods = resolve => require(['@/components/admin/module/goods'], resolve)

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children: [
        {
          path: 'hot',
          name: 'hot',
          component: Hot
        },
        {
          path: 'milkpowders',
          name: 'milkpowders',
          component: MilkPowders
        },
        {
          path: 'babyfoods',
          name: 'babyfoods',
          component: BabyFoods
        },
        {
          path: 'babyarticles',
          name: 'babyarticles',
          component: BabyArticles
        },
        {
          path: 'masks',
          name: 'masks',
          component: Masks
        },
        {
          path: 'creams',
          name: 'creams',
          component: Creams
        },
        {
          path: 'cosmetics',
          name: 'cosmetics',
          component: Cosmetics
        },
        {
          path: 'mildywashes',
          name: 'mildywashes',
          component: MildyWashes
        },
        {
          path: 'healthproducts',
          name: 'healthproducts',
          component: HealthProducts
        },
        {
          path: 'accessories',
          name: 'accessories',
          component: Accessories
        }
      ],
      redirect: '/hot'
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: Detail
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      children: [
        {
          path: 'goods',
          name: 'goods',
          component: Goods
        }
      ]
    },
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
      path: '*',
      redirect: '/hot'
    }
  ]
})

export default router
