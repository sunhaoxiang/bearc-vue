// Customers模块
const Customers = resolve => require(['@/components/admin/module/Customers/Customers'], resolve)
// 客户列表
const CustomersList = resolve => require(['@/components/admin/module/Customers/CustomersList'], resolve)

export default {
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
}
