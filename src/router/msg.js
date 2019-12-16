import Msg from '../views/msg/List.vue'
import MoneyFlush from '../views/msg/MoneyFlush.vue'

export default
[
  // 消息列表
  {
    path: '/msg',
    name: 'msg',
    component: Msg
  },
  //流水达标统计列表
  {
    path: '/moneyFlush',
    name: 'moneyFlush',
    component: MoneyFlush,
  }
]