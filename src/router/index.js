import Vue from 'vue'
import Router from 'vue-router'

// 前台内容
const Layout = resolve => require(['@/components/goods/layout/Layout'], resolve)
const HotDiscount = resolve => require(['@/components/goods/module/HotDiscount'], resolve)
const MilkPowders = resolve => require(['@/components/goods/module/MilkPowders'], resolve)
const BabyFoods = resolve => require(['@/components/goods/module/BabyFoods'], resolve)
const BabyArticles = resolve => require(['@/components/goods/module/BabyArticles'], resolve)
const Masks = resolve => require(['@/components/goods/module/Masks'], resolve)
const Creams = resolve => require(['@/components/goods/module/Creams'], resolve)
const Cosmetics = resolve => require(['@/components/goods/module/Cosmetics'], resolve)
const MildyWashes = resolve => require(['@/components/goods/module/MildyWashes'], resolve)
const Accessories = resolve => require(['@/components/goods/module/Accessories'], resolve)
const Detail = resolve => require(['@/components/goods/common/Detail'], resolve)

// 后台内容
const AdminLayout = resolve => require(['@/components/admin/layout/AdminLayout'], resolve)
const Login = resolve => require(['@/components/admin/login/Login'], resolve)

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: 'hotdiscount',
          name: 'HotDiscount',
          component: HotDiscount
        },
        {
          path: 'milkpowder',
          name: 'MilkPowder',
          component: MilkPowders
        },
        {
          path: 'babyfoods',
          name: 'BabyFoods',
          component: BabyFoods
        },
        {
          path: 'babyarticles',
          name: 'BabyArticles',
          component: BabyArticles
        },
        {
          path: 'masks',
          name: 'Masks',
          component: Masks
        },
        {
          path: 'creams',
          name: 'Creams',
          component: Creams
        },
        {
          path: 'cosmetics',
          name: 'Cosmetics',
          component: Cosmetics
        },
        {
          path: 'mildywashes',
          name: 'MildyWashes',
          component: MildyWashes
        },
        {
          path: 'accessories',
          name: 'Accessories',
          component: Accessories
        }
      ],
      redirect: '/hotdiscount'
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/admin',
      name: 'AdminLayout',
      component: AdminLayout,
      children: [
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '*',
      redirect: '/hotdiscount'
    }
  ]
})
