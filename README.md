# bearc-vue

> 使用 vue 开发的后台管理系统客户端

> 服务端源码地址: [bearc-node](https://github.com/sunhaoxiang/bearc-node)

## 功能

- 注册、登录以及注销登录
- 修改密码
- 商品、客户以及收入列表的添加、删除和修改
- 导出表格为csv
- 对表格数据进行可视化图表展示

## 目录结构

```

├─ build // 打包设置
├─ config // 发布设置
├─ preview-images // 预览图
├─ src
│  ├─ assets
│  │  ├─ img // 图片
│  │  └─ scss // 样式
│  ├─ axios // 网络请求
│  ├─ components
│  │  ├─ admin // 后台管理模块
│  │  │  ├─ 404
│  │  │  ├─ layout
│  │  │  └─ module
│  │  │     ├─ Customers
│  │  │     ├─ Earnings
│  │  │     ├─ Goods
│  │  │     ├─ Settings
│  │  │     ├─ Statistics
│  │  │     └─ Welcome
│  │  ├─ common // 公用组件
│  │  │  ├─ background
│  │  │  └─ select
│  │  ├─ goods // 前台商品模块
│  │  │  ├─ common
│  │  │  ├─ layout
│  │  │  └─ module
│  │  ├─ login // 登录
│  │  └─ register //注册
│  ├─ lib // 通用工具
│  ├─ mixin // mixin
│  ├─ router // 路由
│  │  ├─ 404
│  │  ├─ Admin
│  │  ├─ Login
│  │  └─ Register
│  ├─ store // Vuex
│  ├─ App.vue
│  ├─ main.js // 入口文件
│  └─ registerComponents.js // 全局注册组件
├─ static
│  └─ loading-svg
├─ .babelrc
├─ .editorconfig
├─ .eslintignore
├─ .eslintrc.js
├─ .gitignore
├─ .postcssrc.js
├─ README.md
├─ index.html
├─ package-lock.json
└─ package.json
```

## 预览

登陆  
![1](https://raw.githubusercontent.com/sunhaoxiang/bearc-vue/master/preview-images/1.gif)

添加和修改商品  
![2](https://raw.githubusercontent.com/sunhaoxiang/bearc-vue/master/preview-images/2.gif)

图表展示  
![3](https://raw.githubusercontent.com/sunhaoxiang/bearc-vue/master/preview-images/3.gif)

修改密码  
![4](https://raw.githubusercontent.com/sunhaoxiang/bearc-vue/master/preview-images/4.gif)

## 技术栈

- vue
- vue-router
- vuex
- i-view
- axios
- g2
