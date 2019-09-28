import Rule from '../views/graffiti/Rule.vue'
import User from '../views/graffiti/User.vue'
import Group from '@/views/graffiti/Group.vue'
import Company from '@/views/graffiti/Company.vue'

export default
[
  // 权限
  {
    path: '/rules',
    name: 'rule',
    component: Rule,
  },
  //公司管理
  {
    path: '/company',
    name: 'company',
    component: Company,
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