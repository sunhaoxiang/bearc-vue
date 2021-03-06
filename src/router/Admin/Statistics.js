// Statistics模块
const Statistics = resolve => require(['@/components/admin/module/Statistics/Statistics'], resolve)
const EarningsStatistics = resolve => require(['@/components/admin/module/Statistics/EarningsStatistics'], resolve)

export default {
  path: 'statistics',
  name: 'statistics',
  component: Statistics,
  children: [
    {
      path: 'earningsstatistics',
      name: 'earningsstatistics',
      meta: {
        title: '收入统计'
      },
      component: EarningsStatistics
    }
  ],
  redirect: 'statistics/earningsstatistics'
}
