import Patterns from '../views/feedback/Patterns.vue'
import Datas from '../views/feedback/Datas.vue'
import FinanceDetail from '../views/finance/Detail.vue'
import Maolirun from '../views/finance/Maolirun.vue'
import Fuchijine from '../views/finance/Fuchijine.vue'
import Yifuchijine from '../views/finance/Yifuchijine.vue'
import ShouldPay from '../views/finance/ShouldPay.vue'

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
  },
  //毛利润
  {
    path: '/maolirun',
    name: 'maolirun',
    component: Maolirun,
  },
  //扶持金额
  {
    path: '/fuchijine',
    name: 'fuchijine',
    component: Fuchijine,
  },
  //已扶持金额
  {
    path: '/yifuchijine',
    name: 'yifuchijine',
    component: Yifuchijine,
  },
  //应支付主播收益
  {
    path: '/shouldPay',
    name: 'shouldPay',
    component: ShouldPay,
  },
]