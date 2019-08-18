import Index from '../views/management/Management.vue'
import Detail from '../views/management/Detail.vue'
import Total from '../views/management/Total.vue'

export default
[
  // 首页
  {
    path: '/management',
    name: 'management',
    component: Index,
  },
  //明细报表
  {
    path: '/detail',
    name: 'detail',
    component: Detail,
  },
  //汇总报表
  {
    path: '/total',
    name: 'total',
    component: Total,
  },
]