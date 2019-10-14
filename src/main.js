import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import '../src/assets/styles/common.less'
import echarts from 'echarts'
import  'echarts/theme/macarons.js'
import '@/assets/styles/index.css'
import Props from '@/utils/Props.js'
import ElementUI from 'element-ui' // 组件文件（js）
import 'element-ui/lib/theme-chalk/index.css' // 样式文件




Vue.use(ElementUI)
Vue.prototype.$selfProps = Props
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
