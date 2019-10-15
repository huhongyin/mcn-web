import Department from '../views/graffiti/Department.vue'
import User from '../views/graffiti/User.vue'
import Group from '@/views/graffiti/Group.vue'
import Company from '@/views/graffiti/Company.vue'

export default
[
  // 权限
  {
    path: '/department',
    name: 'department',
    component: Department,
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