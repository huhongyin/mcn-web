import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui';

// 环境切换
axios.defaults.baseURL = 'http://sk.dev.com/api/v1/'
// if (process.env.NODE_ENV === 'development') {
//   axios.defaults.baseURL = 'https://official.cdhengsu.com'
//   // console.log('开发环境api接口url')
// } else if (process.env.NODE_ENV === 'test') {
//   axios.defaults.baseURL = ''
//   // console.log('测试环境api接口url')
// } else if (process.env.NODE_ENV === 'production') {
//   axios.defaults.baseURL = 'https://official.cdhengsu.com'
//   // console.log('设置生产环境api接口url')
// }

// 请求超时时间
axios.defaults.timeout = 10000

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 请求拦截器
axios.interceptors.request.use((config) => {
  // 获取token
  const token = window.localStorage.getItem('token')
  // 在请求头中携带token
  config.headers.authorization = `Bearer ${token}`
  return config
})

// 封装get方法 和 post方法
export function get (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(res => {
        if(res.data.code != 1){
          Message.error(res.data.msg);
          return false;
        }
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

export function post (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
    // axios.post(url, params)
      .then(res => {
        if(res.data.code != null && typeof(res.data.code) != 'undefined'){
          if(res.data.code != 1){
            Message.error(res.data.msg);
            return false;
          }
        }
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

export function fPost (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(params))
      .then(res => {
        if(res.data.code != null && typeof(res.data.code) != 'undefined'){
          if(res.data.code != 1){
            Message({
              message: res.data.message,
              duration: 1000,
              type: 'error'
            });
            return false;
          }
        }
        resolve(res.data)
      })
      .catch(err => {
        Message({
          message: '服务器繁忙！请稍后重试',
          duration: 1000,
          type: 'error'
        });
        reject(err.data)
      })
  })
}