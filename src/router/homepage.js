import Index from '../views/index/Index.vue'
import Echarts from './echartss'
import Setting from './setting'
import Management from './management'
import Operate from './operate'
import Graffiti from './graffiti'
import Old from './old'
import Finance from './finance'
import CompanyData from './company'
import Operation from './operation'
import Msg from './msg'
import Import from './import'
import Team from './team'

export default
[
  //首页
  {
    path: '/',
    name: 'index',
    component: Index,
    children:[
      ...Echarts,
      ...Setting,
      ...Management,
      ...Graffiti,
      ...Old,
      ...Finance,
      ...CompanyData,
      ...Operation,
      ...Operate,
      ...Msg,
      ...Import,
      ...Team,
    ]
  },
]