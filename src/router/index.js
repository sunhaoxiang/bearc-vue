import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import Cookies from 'js-cookie'
import { verifyToken } from '@/axios/axios.js'

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

// 后台内容
const Admin = resolve => require(['@/components/admin/layout/Admin'], resolve)

// 欢迎模块
const Welcome = resolve => require(['@/components/admin/module/Welcome/Welcome'], resolve)

// Goods模块
const Goods = resolve => require(['@/components/admin/module/Goods/Goods'], resolve)
// 商品列表
const GoodsList = resolve => require(['@/components/admin/module/Goods/GoodsList'], resolve)
// 分类列表
const TypesList = resolve => require(['@/components/admin/module/Goods/TypesList'], resolve)
// 国家列表
const CountriesList = resolve => require(['@/components/admin/module/Goods/CountriesList'], resolve)

// Earning模块
const Earnings = resolve => require(['@/components/admin/module/Earnings/Earnings'], resolve)
// 收入列表
const EarningsList = resolve => require(['@/components/admin/module/Earnings/EarningsList'], resolve)

// Customers模块
const Customers = resolve => require(['@/components/admin/module/Customers/Customers'], resolve)
// 客户列表
const CustomersList = resolve => require(['@/components/admin/module/Customers/CustomersList'], resolve)

// Statistics模块
const Statistics = resolve => require(['@/components/admin/module/Statistics/Statistics'], resolve)

// Settings模块
const Settings = resolve => require(['@/components/admin/module/Settings/Settings'], resolve)
const ModifyPassword = resolve => require(['@/components/admin/module/Settings/ModifyPassword'], resolve)

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
      path: '/',
      name: 'admin',
      component: Admin,
      meta: {
        login: true
      },
      children: [
        {
          path: 'goods',
          name: 'goods',
          component: Goods,
          children: [
            {
              path: 'welcome',
              name: 'welcome',
              component: Welcome
            },
            {
              path: 'goodslist',
              name: 'goodslist',
              component: GoodsList
            },
            {
              path: 'typeslist',
              name: 'typeslist',
              component: TypesList
            },
            {
              path: 'countrieslist',
              name: 'countrieslist',
              component: CountriesList
            }
          ],
          redirect: 'goods/goodslist'
        },
        {
          path: 'earnings',
          name: 'earnings',
          component: Earnings,
          children: [
            {
              path: 'earningslist',
              name: 'earningslist',
              component: EarningsList
            }
          ],
          redirect: 'earnings/earningslist'
        },
        {
          path: 'customers',
          name: 'customers',
          component: Customers,
          children: [
            {
              path: 'customerslist',
              name: 'customerslist',
              component: CustomersList
            }
          ],
          redirect: 'customers/customerslist'
        },
        {
          path: 'statistics',
          name: 'statistics',
          component: Statistics
        },
        {
          path: 'settings',
          name: 'settings',
          component: Settings,
          children: [
            {
              path: 'modifypassword',
              name: 'modifypassword',
              component: ModifyPassword
            }
          ],
          redirect: 'settings/modifypassword'
        }
      ],
      redirect: 'goods/welcome'
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
        // 验证成功
        case 0:
          store.commit('login', res.data.result.username)
          next()
          break
        // 验证成功，但需要更新token
        case 1:
          store.commit('login', res.data.result.username)
          Cookies.set('bearcToken', res.data.result.newToken)
          next()
          break
        // 验证失败
        default:
          next('/login')
          break
      }
    } catch (err) {
      console.log(err)
    }
  }
})

export default router
