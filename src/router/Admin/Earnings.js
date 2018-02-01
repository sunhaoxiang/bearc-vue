// Earning模块
const Earnings = resolve => require(['@/components/admin/module/Earnings/Earnings'], resolve)
// 收入列表
const EarningsList = resolve => require(['@/components/admin/module/Earnings/EarningsList'], resolve)

export default {
  path: 'earnings',
  name: 'earnings',
  component: Earnings,
  children: [
    {
      path: 'earningslist',
      name: 'earningslist',
      meta: {
        title: '收入列表'
      },
      component: EarningsList
    }
  ],
  redirect: 'earnings/earningslist'
}
