import Index from '../views/index/Index.vue'
import Echarts from './echartss'
import Equipment from './equipment'
import Management from './management'
import Graffiti from './graffiti'
import Banner from './banner'
import Finance from './finance'
import Contact from './contact'
import Operation from './operation'
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
      ...Banner,
      ...Finance,
      ...Contact,
      ...Operation

    ]
  },
]