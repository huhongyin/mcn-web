import Feedback from '../views/feedback/Feedback.vue'
import Help from '../views/feedback/Help.vue'

export default
[
  //帮助中心
  {
    path: '/help',
    name: 'help',
    component: Help,
  },
  //反馈建议
  {
    path: 'suggestions',
    name: 'suggestions',
    component: Feedback,
  }
]