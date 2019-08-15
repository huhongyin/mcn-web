import Index from '../views/management/Management.vue'
import Admin from '../views/management/Admin.vue'
import Role from '../views/management/Role.vue'
import Password from '../views/management/Password.vue'

export default
[
  // 用户管理
  {
    path: '/management',
    name: 'management',
    component: Index,
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
  },
  {
    path: '/role',
    name: 'role',
    component: Role,
  },
  {
    path: '/password',
    name: 'password',
    component: Password,
  },
]