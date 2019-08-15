import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './homepage'
import Login from './login'

Vue.use(Router)

const router = new Router({
    // 路由模式
    mode: 'hash',
    routes:[
      ...Login,
      ...HomePage
    ]
  })
  export default router