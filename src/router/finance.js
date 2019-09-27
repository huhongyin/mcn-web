import Patterns from '../views/feedback/Patterns.vue'
import Datas from '../views/feedback/Datas.vue'
import FinanceDetail from '../views/finance/Detail.vue'

export default
[
  //分成模式
  {
    path: 'patterns',
    name: 'Patterns',
    component: Patterns,
  },
  //运营数据
  {
    path: 'datas',
    name: 'Datas',
    component: Datas,
  },
  //财务概况
  {
    path: 'financeDetail',
    name: 'FinanceDetail',
    component: FinanceDetail
  }
]