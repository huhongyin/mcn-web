<template>
  <el-card>
      <div slot="header" class="clearfix">
        <span>消息列表</span>
      </div>
      <div>
        <el-table :data="gridData" tooltip-effect="dark" :header-cell-style="{background:'#EFF5F9'}">
            <el-table-column property="title" label="统计标题"></el-table-column>
            <el-table-column property="value" label="统计结果"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                <el-button @click="showDetail(scope.row)" size="mini" type="primary">去看看</el-button>
                </template>
            </el-table-column>
        </el-table>
      </div>
  </el-card>
</template>
<script>
export default {
    data(){
        return {
            gridData: [
                {
                  title: '流水达100万',
                  value: '200人',
                  type: 'money_100',
                }, 
                {
                  title: '流水达500万',
                  value: '10人',
                  type: 'money_500',
                }, 
                {
                  title: '流水达1000万',
                  value: '200人',
                  type: 'money_1000',
                }, 
                {
                  title: '流水增量五百万人数',
                  value: '151人',
                  type: 'more_500',
                }, 
                {
                  title: 'S级主播连续2日未开播',
                  value: '1人',
                  type: 's_actor',
                }, 
                {
                  title: '部门总流水超过700万',
                  value: '2个',
                  type: 'department_700',
                }, 
                {
                  title: '签约人数不达标签约人数量',
                  value: '3人',
                  type: 'signer',
                }, 
                {
                  title: '主播累计2天不满足120分钟',
                  value: '5人',
                  type: 'two_days_120',
                }, 
                {
                  title: '主播累计14天不够120分钟',
                  value: '1人',
                  type: 'fourth_days_120',
                }, 
            ],
        }
    },
    created(){
      localStorage.setItem("is_read", 1)
    },
    methods:{
      showDetail(data){
        this.$router.push({
          path: '/actorList',
          query: {
            title: data.title,
            type: data.type,
          }
        })
      },
    }
}
</script>