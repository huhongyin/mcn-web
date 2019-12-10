import PersonalSetting from '../views/setting/PersonalSetting.vue'
import AutoSign from '../views/setting/auto_sign.vue'

export default
[
  // 个人设置
  {
    path: '/personalSetting',
    name: 'personalSetting',
    component: PersonalSetting
  },
  //签约录入(兼容手机端)
  {
    path: "/auto/sign",
    name: "/autosign",
    component: AutoSign,
  }
]