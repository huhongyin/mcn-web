import Patterns from '../views/feedback/Patterns.vue'
import Datas from '../views/feedback/Datas.vue'

export default
[
  //分成模式
  {
    path: '/patterns',
    name: 'Patterns',
    component: Patterns,
  },
  //运营数据
  {
    path: '/datas',
    name: 'Datas',
    component: Datas,
  }
]