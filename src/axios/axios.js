import axios from 'axios'
import Cookies from 'js-cookie'

// 接口地址
// axios.defaults.baseURL = 'http://localhost:9999/'
axios.defaults.baseURL = '/api'

// get 方法
// function get (url) {
//   return body => axios.get(url, {params: body})
// }

function getWithToken (url) {
  return body => axios.get(url, {params: {
    ...body,
    token: Cookies.get('bearcToken')
  }})
}

// post 方法
function post (url) {
  return body => axios.post(url, body)
}

function postWithToken (url) {
  return body => axios.post(url, {
    ...body,
    token: Cookies.get('bearcToken')
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
export const verifyToken = postWithToken('/users/verifytoken')  // 验证登录

export const upload = postWithToken('/users/upload')  // 上传文件

export const goodsList = getWithToken('/users/goods/goodslist')  // 商品列表
export const addGood = postWithToken('/users/goods/addgood')  // 添加商品
export const modifyGood = postWithToken('/users/goods/modifygood')  // 修改商品
export const removeGood = postWithToken('/users/goods/removegood')  // 删除商品

export const typesList = getWithToken('/users/types/typeslist')  // 分类列表
export const addType = postWithToken('/users/types/addtype')  // 添加分类
export const modifyType = postWithToken('/users/types/modifytype')  // 修改分类
export const removeType = postWithToken('/users/types/removetype')  // 删除分类

export const countriesList = getWithToken('/users/countries/countrieslist')  // 国家列表
export const addCountry = postWithToken('/users/countries/addcountry')  // 添加国家
export const modifyCountry = postWithToken('/users/countries/modifycountry')  // 修改国家
export const removeCountry = postWithToken('/users/countries/removecountry')  // 删除国家

export const earningsList = getWithToken('/users/earnings/earningslist')  // 收入列表
export const addEarning = postWithToken('/users/earnings/addearning')  // 添加收入
export const modifyEarning = postWithToken('/users/earnings/modifyearning')  // 修改收入
export const removeEarning = postWithToken('/users/earnings/removeearning')  // 删除收入

export const customersList = getWithToken('/users/customers/customerslist')  // 客户列表
export const addCustomer = postWithToken('/users/customers/addcustomer')  // 添加客户
export const modifyCustomer = postWithToken('/users/customers/modifycustomer')  // 修改客户
export const removeCustomer = postWithToken('/users/customers/removecustomer')  // 删除客户

// 第三方接口
export const todayInHistoryRandom = getWithToken('/thirdparty/todayinhistory/random')  // 历史上的今天标题
export const todayInHistoryDetail = getWithToken('/thirdparty/todayinhistory/detail')  // 历史上的今天详情
