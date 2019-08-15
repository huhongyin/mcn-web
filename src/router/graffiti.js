import Index from '../views/graffiti/Graffiti.vue'
import Models from '../views/graffiti/Models.vue'
import AddModel from '@/views/graffiti/AddModel.vue'

export default
[
  // 涂鸦分类
  {
    path: '/graffiti',
    name: 'graffiti',
    component: Index,
  },
  //涂鸦模板
  {
    path: '/models',
    name: 'models',
    component: Models,
  },
  //添加涂鸦模板
  {
    path: '/addModel',
    name: 'addModel',
    component: AddModel,
  },
]