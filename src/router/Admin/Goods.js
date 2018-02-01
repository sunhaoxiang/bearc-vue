// Goods模块
const Goods = resolve => require(['@/components/admin/module/Goods/Goods'], resolve)
// 欢迎
const Welcome = resolve => require(['@/components/admin/module/Welcome/Welcome'], resolve)
// 商品列表
const GoodsList = resolve => require(['@/components/admin/module/Goods/GoodsList'], resolve)
// 分类列表
const TypesList = resolve => require(['@/components/admin/module/Goods/TypesList'], resolve)
// 国家列表
const CountriesList = resolve => require(['@/components/admin/module/Goods/CountriesList'], resolve)

export default {
  path: 'goods',
  name: 'goods',
  component: Goods,
  children: [
    {
      path: 'welcome',
      name: 'welcome',
      meta: {
        title: '欢迎'
      },
      component: Welcome
    },
    {
      path: 'goodslist',
      name: 'goodslist',
      meta: {
        title: '商品列表'
      },
      component: GoodsList
    },
    {
      path: 'typeslist',
      name: 'typeslist',
      meta: {
        title: '分类列表'
      },
      component: TypesList
    },
    {
      path: 'countrieslist',
      name: 'countrieslist',
      meta: {
        title: '国家列表'
      },
      component: CountriesList
    }
  ],
  redirect: 'goods/goodslist'
}
