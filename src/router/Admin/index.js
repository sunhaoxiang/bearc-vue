import Goods from './Goods'
import Customers from './Customers'
import Earnings from './Earnings'
import Statistics from './Statistics'
import Settings from './Settings'

const Admin = resolve => require(['@/components/admin/layout/Admin'], resolve)

export default {
  path: '/',
  name: 'admin',
  component: Admin,
  meta: {
    login: true
  },
  children: [
    Goods,
    Customers,
    Earnings,
    Statistics,
    Settings
  ],
  redirect: 'goods/welcome'
}
