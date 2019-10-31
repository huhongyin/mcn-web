import Index from '../views/index/Index.vue'
import Echarts from './echartss'
import Equipment from './equipment'
import Management from './management'
import Operate from './operate'
import Graffiti from './graffiti'
import Old from './old'
import Finance from './finance'
import Contact from './contact'
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
      ...Equipment,
      ...Management,
      ...Graffiti,
      ...Old,
      ...Finance,
      ...Contact,
      ...Operation,
      ...Operate,
      ...Msg,
      ...Import,
      ...Team,
    ]
  },
]