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
import plTable from 'pl-table'
import 'pl-table/themes/index.css' // 引入样式（必须引入)，请查看webpack是否配置了url-loader对woff，ttf文件的引用,不配置会报错哦
import 'pl-table/themes/plTableStyle.css' // 默认表格样式很丑 引入这个样式就可以好看啦





Vue.use(ElementUI)
Vue.use(plTable);
Vue.prototype.$selfProps = Props
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
