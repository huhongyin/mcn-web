import PersonalSetting from '../views/setting/PersonalSetting.vue'
import AutoSign from '../views/setting/auto_sign.vue'
import FddTemplate from '../views/setting/fdd_template'
import FlowConfig from '../views/setting/FlowConfig'

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
  },
  //法大大合同模板管理
  {
    path: "/template",
    name: "template",
    component: FddTemplate
  },
  //流程管理
  {
    path: "/flowConfig",
    name: "flowConfig",
    component: FlowConfig,
  }
]