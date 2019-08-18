import Rule from '../views/graffiti/Rule.vue'
import User from '../views/graffiti/User.vue'
import Group from '@/views/graffiti/Group.vue'

export default
[
  // 权限
  {
    path: '/rules',
    name: 'rule',
    component: Rule,
  },
  //用户管理
  {
    path: '/users',
    name: 'user',
    component: User,
  },
  //运营分组
  {
    path: '/groups',
    name: 'group',
    component: Group,
  },
]