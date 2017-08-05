import Vue from 'vue'
import Router from 'vue-router'

// 前台内容
const Layout = resolve => require(['@/components/goods/Layout'], resolve)
const HotDiscount = resolve => require(['@/components/goods/HotDiscount'], resolve)
const MilkPowders = resolve => require(['@/components/goods/MilkPowders'], resolve)
const BabyFoods = resolve => require(['@/components/goods/BabyFoods'], resolve)
const BabyArticles = resolve => require(['@/components/goods/BabyArticles'], resolve)
const Masks = resolve => require(['@/components/goods/Masks'], resolve)
const Creams = resolve => require(['@/components/goods/Creams'], resolve)
const Cosmetics = resolve => require(['@/components/goods/Cosmetics'], resolve)
const MildyWashes = resolve => require(['@/components/goods/MildyWashes'], resolve)
const Accessories = resolve => require(['@/components/goods/Accessories'], resolve)

// 后台内容
const AdminLayout = resolve => require(['@/components/admin/AdminLayout'], resolve)

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
      path: '/admin',
      name: 'AdminHomepage',
      component: AdminLayout
    },
    {
      path: '*',
      redirect: '/hotdiscount'
    }
  ]
})
