import Axios from 'axios'

// 接口地址
Axios.defaults.baseURL = 'http://localhost:9999/'

// get 方法
function get (url) {
  return body => Axios.get(url, { params: body })
}

// post 方法
function post (url) {
  return body => Axios.post(url, body)
}

// 前台
export const getCountries = get('getcountries')
export const getHot = get('getgoods/hot')
export const getMilkPowders = get('getgoods/milkpowders')

// 注册登录
export const login = post('/users/login')
export const register = post('/users/register')

// 后台
export const verifyToken = post('users/verifytoken')
