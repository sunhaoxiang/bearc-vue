import axios from 'axios'
import Cookies from 'js-cookie'

// 接口地址
axios.defaults.baseURL = 'http://localhost:9999/'
axios.defaults.headers = {token: Cookies.get('bearcToken')}

// get 方法
function get (url) {
  return body => axios.get(url, { params: body })
}

// post 方法
function post (url) {
  return body => axios.post(url, body)
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
export const verifyToken = post('users/verifytoken')  // 验证登录
export const upload = post('users/upload')  // 上传文件
export const goodsList = get('users/goods/goodslist')  // 商品列表
export const addGood = post('users/goods/addgood')  // 添加商品
export const modifyGood = post('users/goods/modifygood')  // 修改商品
export const removeGood = post('users/goods/removegood')  // 删除商品
export const typesList = get('users/types/typeslist')  // 分类列表
export const addType = post('users/types/addtype')  // 添加分类
export const modifyType = post('users/types/modifytype')  // 修改分类
export const removeType = post('users/types/removetype')  // 删除分类
