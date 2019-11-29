import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui';

// 环境切换
// axios.defaults.baseURL = 'http://admin.mcn.huhongyin.com/api/v1/'
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
axios.defaults.timeout = 80000

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 请求拦截器
axios.interceptors.request.use((config) => {
    // 获取token
    const token_type = window.localStorage.getItem('token_type')
    const access_token = window.localStorage.getItem('access_token')
    // 在请求头中携带token
    config.headers.authorization = `${token_type} ${access_token}`
    return config
})

// 响应拦截器
axios.interceptors.response.use(
    response => {
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据 
        // 否则的话抛出错误
        if (response.status === 200) {
          switch (response.data.code){
            case 0:
                Message({
                  message: response.data.msg,
                  duration: 1000,
                  type: 'error',
                });
                return Promise.reject(response);
              break;
            case 401:
                  Message({
                      message: '登录过期，请重新登录',
                      duration: 1000,
                  });
                  // 清除token
                  localStorage.removeItem('token_type');
                  localStorage.removeItem('access_token');
                  localStorage.removeItem('user');
                  // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面 
                  setTimeout(() => {
                      router.replace(
                        {
                          path: '/login',
                          query: {
                            redirect: router.currentRoute.fullPath
                          }
                        }
                      );
                  }, 1000);
              break;
              case 1:
                  return Promise.resolve(response);
              break;
          }
        } else {
          return Promise.reject(response);
        }
    },
  error => {
      if (typeof(error.response) != 'undefined' && error.response.data.code) {
        switch (error.response.data.code) {
          // 401: 未登录
          // 未登录则跳转登录页面，并携带当前页面的路径
          // 在登录成功后返回当前页面，这一步需要在登录页操作。 
          case 401:
            router.replace({
              path: '/login',
              query: {
              redirect: router.currentRoute.fullPath
              }
            });
          break;
          
          // 403 token过期
          // 登录过期对用户进行提示
          // 清除本地token和清空vuex中token对象
          // 跳转登录页面 
          case 403:
            Message({
              message: '登录过期，请重新登录',
              duration: 1000,
              forbidClick: true
            });
            // 清除token
            localStorage.removeItem('token_type');
            localStorage.removeItem('access_token');
            localStorage.removeItem('user');
            // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面 
            setTimeout(() => {
              router.replace({
                path: '/login',
                query: {
                  redirect: router.currentRoute.fullPath
                }
              });
            }, 1000);
          break;
          
          // 404请求不存在
          case 404:
            Message({
              message: error.response.data.data.message,
              duration: 1500,
              forbidClick: true
            });
          break;
          // 其他错误，直接抛出错误提示
          default:
            Message({
              message: error.response.data.data.message,
              duration: 1500,
              forbidClick: true
            });
        }
        return Promise.reject(error.response);
      }else{
        Message({
          message: '服务器异常，请联系管理员',
          duration: 1500,
          type: 'danger',
          forbidClick: true
        });
      }
  	} 
  );

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

export function fPost (url, params) {
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

export function post (url, params) {
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
            return false
          }
        }
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}