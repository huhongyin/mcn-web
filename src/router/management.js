import Index from '../views/management/Management.vue'
import Detail from '../views/management/Detail.vue'
import Total from '../views/management/Total.vue'
import ActorList from '../views/index/ActorList.vue'

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
  //流水达多少主播列表
  {
    path: '/actorList',
    name: 'actorList',
    component: ActorList,
  }
]