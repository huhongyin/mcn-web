import DayTeam from '../views/day/Team.vue'
import DayCompany from '../views/day/Company.vue'


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
]