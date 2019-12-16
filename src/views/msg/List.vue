<template>
  <el-card>
      <div slot="header" class="clearfix">
        <span>消息列表</span>
      </div>
      <div>
        <el-table :data="gridData" tooltip-effect="dark" :header-cell-style="{background:'#EFF5F9'}">
            <el-table-column property="title" label="统计标题"></el-table-column>
            <el-table-column property="count" label="统计结果"></el-table-column>
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
import { get } from '@/api/index'
import msgApi from '@/api/msg'

export default {
    data(){
        return {
            gridData: [],
        }
    },
    created(){
      this.getData()
    },
    methods:{
      getData(){
        get(msgApi.list).then((res) => {
          this.gridData = res.data.list
          localStorage.setItem("is_read", 1)
        })
      },
      showDetail(data){
        this.$router.push({
          path: data.type,
          query: {
            title: data.title,
            type: 2,
            money: data.money,
          }
        })
      },
    }
}
</script>