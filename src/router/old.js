import Old from '../views/old/old.vue'
import OldMonth from '../views/old/oldMonth.vue'

export default
[
  // 导入原数据列表
  {
    path: '/old',
    name: 'old',
    component: Old
  },
  {
    path: '/oldMonth',
    name: 'oldMonth',
    component: OldMonth,
  }
]