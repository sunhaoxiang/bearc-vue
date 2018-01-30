import axios from 'axios'
import Cookies from 'js-cookie'

// 接口地址
// axios.defaults.baseURL = 'http://localhost:9999/'
axios.defaults.baseURL = '/api'

// get 方法
function get (url) {
  return body => axios.get(url, {
    headers: {
      token: Cookies.get('bearcToken')
    },
    params: body
  })
}

// post 方法
function post (url) {
  return body => axios.post(url, body, {
    headers: {
      token: Cookies.get('bearcToken')
    }
  })
}

// 前台
// export const getCountries = get('getcountries')  // 国家数据
// export const getHot = get('getgoods/hot')  // 热门
// export const getMilkPowders = get('getgoods/milkpowders')  // 奶粉
// export const getBabyFoods = get('getgoods/babyfoods')  // 辅食
// export const getBabyArticles = get('getgoods/babyarticles')  // 宝宝用品
// export const getMasks = get('getgoods/masks')  // 面膜
// export const getCreams = get('getgoods/creams')  // 护肤
// export const getCosmetics = get('getgoods/cosmetics')  // 彩妆
// export const getMildyWashes = get('getgoods/mildywashes')  // 洗护
// export const getHealthProducts = get('getgoods/healthproducts')  // 保健
// export const getAccessories = get('getgoods/accessories')  // 饰品

// 注册登录
export const register = post('/register')  // 注册
export const login = post('/login')  // 登录

// 后台
export const verifyToken = post('/users/verifytoken')  // 验证登录

export const upload = post('/users/upload')  // 上传文件

export const goodsList = get('/users/goods/goodslist')  // 商品列表
export const addGood = post('/users/goods/addgood')  // 添加商品
export const modifyGood = post('/users/goods/modifygood')  // 修改商品
export const removeGood = post('/users/goods/removegood')  // 删除商品

export const typesList = get('/users/types/typeslist')  // 分类列表
export const addType = post('/users/types/addtype')  // 添加分类
export const modifyType = post('/users/types/modifytype')  // 修改分类
export const removeType = post('/users/types/removetype')  // 删除分类

export const countriesList = get('/users/countries/countrieslist')  // 国家列表
export const addCountry = post('/users/countries/addcountry')  // 添加国家
export const modifyCountry = post('/users/countries/modifycountry')  // 修改国家
export const removeCountry = post('/users/countries/removecountry')  // 删除国家

export const earningsList = get('/users/earnings/earningslist')  // 收入列表
export const earningsStatistics = get('/users/earnings/earningslist/statistics')  // 收入统计
export const addEarning = post('/users/earnings/addearning')  // 添加收入
export const modifyEarning = post('/users/earnings/modifyearning')  // 修改收入
export const removeEarning = post('/users/earnings/removeearning')  // 删除收入

export const customersList = get('/users/customers/customerslist')  // 客户列表
export const addCustomer = post('/users/customers/addcustomer')  // 添加客户
export const modifyCustomer = post('/users/customers/modifycustomer')  // 修改客户
export const removeCustomer = post('/users/customers/removecustomer')  // 删除客户

export const modifyPassword = post('/users/modifyPassword') // 修改密码

// 第三方接口
export const todayInHistoryRandom = get('/thirdparty/todayinhistory/random')  // 历史上的今天标题
export const todayInHistoryDetail = get('/thirdparty/todayinhistory/detail')  // 历史上的今天详情

// select
export const goodsListSelect = get('/users/goods/goodslist/select')
export const typesListSelect = get('/users/types/typeslist/select')
export const countriesListSelect = get('/users/countries/countrieslist/select')
export const customersListSelect = get('/users/customers/customerslist/select')
