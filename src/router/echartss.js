import Echarts from '../views/echarts/Echarts.vue'
import SignTotalMoney from '../views/echarts/SignTotalMoney.vue'
import SignActorCount from '../views/echarts/SignActorCount.vue'
import EffectiveActorCount from '../views/echarts/EffectiveActorCount.vue'
import OnLineList from '../views/echarts/OnLineList.vue'
import YestodayMoney from '../views/echarts/YestodayMoney.vue'
import YestodayEffectiveActor from '../views/echarts/YestodayEffectiveActor.vue'
import YestodayNewActor from '../views/echarts/YestodayNewActor.vue'
import YestodayOnLineList from '../views/echarts/YestodayOnLineList.vue'

import OperateSignTotalMoney from '../views/operate/list/SignTotalMoney.vue'
import OperateSignActorCount from '../views/operate/list/SignActorCount.vue'
import OperateEffectiveActorCount from '../views/operate/list/EffectiveActorCount.vue'
import OperateOnLineList from '../views/operate/list/OnLineList.vue'

export default
[
  // 首页echarts
  {
    path: '/',
    name: 'echarts',
    component: Echarts
  },
  //签约人总流水记录列表
  {
    path: '/signTotalMoney',
    name: 'signTotalMoney',
    component: SignTotalMoney,
  },
  //签约主播数量
  {
    path: '/signActorCount',
    name: 'signActorCount',
    component: SignActorCount,
  },
  //有效主播数量
  {
    path: '/effectiveActorCount',
    name: 'effectiveActorCount',
    component: EffectiveActorCount,
  },
  //在线总时长列表
  {
    path: '/onLineList',
    name: 'onLineList',
    component: OnLineList,
  },

  //运营总流水记录列表
  {
    path: '/operatesignTotalMoney',
    name: 'operatesignTotalMoney',
    component: OperateSignTotalMoney,
  },
  //运营签约主播数量
  {
    path: '/operatesignActorCount',
    name: 'operatesignActorCount',
    component: OperateSignActorCount,
  },
  //运营新增开播数
  {
    path: '/operateeffectiveActorCount',
    name: 'operateeffectiveActorCount',
    component: OperateEffectiveActorCount,
  },
  //运营在线总时长列表
  {
    path: '/operateonLineList',
    name: 'operateonLineList',
    component: OperateOnLineList,
  },

  //昨日流水
  {
    path: '/yestodayMoney',
    name: 'yestodayMoney',
    component: YestodayMoney,
  },
  //昨日有效主播数量
  {
    path: '/yestodayEffectiveActor',
    name: 'yestodayEffectiveActor',
    component: YestodayEffectiveActor,
  },
  //昨日新晋主播数量
  {
    path: '/yestodayNewActor',
    name: 'yestodayNewActor',
    component: YestodayNewActor,
  },
  //昨日总时长
  {
    path: '/yestodayOnLineList',
    name: 'yestodayOnLineList',
    component: YestodayOnLineList,
  },
]