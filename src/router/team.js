import DayTeam from '../views/day/Team.vue'
import DayCompany from '../views/day/Company.vue'
import DaySign from '../views/day/Sign.vue'
import DayEnd from '../views/day/End.vue'


export default
[
    //团队日榜
    {
        path: '/day/team',
        name: '/dayteam',
        component: DayTeam,
    },
    //公司榜
    {
        path: '/day/company',
        name: '/company',
        component: DayCompany,
    },
    //签约数据排名
    {
        path: '/day/sign',
        name: '/daysign',
        component: DaySign,
    },
    //结算单
    {
        path: '/day/end',
        name: '/dayEnd',
        component: DayEnd,
    }
]