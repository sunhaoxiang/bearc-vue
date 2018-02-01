// Settings模块
const Settings = resolve => require(['@/components/admin/module/Settings/Settings'], resolve)
const ModifyPassword = resolve => require(['@/components/admin/module/Settings/ModifyPassword'], resolve)

export default {
  path: 'settings',
  name: 'settings',
  component: Settings,
  children: [
    {
      path: 'modifypassword',
      name: 'modifypassword',
      meta: {
        title: '修改密码'
      },
      component: ModifyPassword
    }
  ],
  redirect: 'settings/modifypassword'
}
