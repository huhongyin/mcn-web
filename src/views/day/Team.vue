<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <el-row :gutter="10">
                <el-col :span="4">团队日榜</el-col>
            </el-row>
        </div>
        <el-row :gutter="10" style="margin-bottom:1rem;">
            <el-col :span="2">
                <el-select v-model="search.company_id" @change="getDepartments">
                    <el-option v-for="(company,key) in companies" :key="key" :label="company.name" :value="company.id"></el-option>
                </el-select>
            </el-col>
            <el-col :span="2">
                <el-select v-model="search.department_id">
                    <el-option v-for="(plat,key) in departments" :key="key" :label="plat.name" :value="plat.id"></el-option>
                </el-select>
            </el-col>
            <el-col :span="3">
                <el-date-picker format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" style="width: 100%;" placeholder="日期" v-model="search.date"></el-date-picker>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" @click="searchData" style="float:right;">搜索</el-button>
            </el-col>
            <el-col :span="2" :offset="13">
                <el-button @click="exportExcel" style="float:right;">导出</el-button>
            </el-col>
        </el-row>
        <el-table :data="list" border :span-method="objectSpanMethod" id="out-table">
        <!-- <el-table :data="list" border> -->
            <el-table-column label="序号">
                <template slot-scope="scope">
                    <div style="text-align:center;">
                    <template v-if="typeof scope.row.is_zongji == 'undefined'">
                        <span v-if="typeof scope.row.type == 'undefined'">{{ scope.row.id }}</span>
                        <span v-else style="background-color:#bfd7bf;">{{ scope.row.id }}</span>
                    </template>
                    <template v-else>
                        <span style="font-size:20px;color:black;background-color:green;">{{ scope.row.id }}</span>
                    </template>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="负责人" prop="rel_name"></el-table-column>
            <el-table-column label="序号" prop="ids"></el-table-column>
            <el-table-column label="主播昵称" prop="nickname"></el-table-column>
            <el-table-column label="主播ID" prop="plat_actor_id" width="100px;"></el-table-column>
            <el-table-column label="扶持截止日期" prop="support_endtime" width="120px;"></el-table-column>
            <el-table-column label="扶持金额" prop="support_money"></el-table-column>
            <el-table-column label="开播日期" prop="start_time" width="100px;"></el-table-column>
            <el-table-column label="平台" prop="plat_name"></el-table-column>
            <el-table-column label="主播级别" prop="level_name"></el-table-column>
            <el-table-column label="应有时长" prop="should_time"></el-table-column>
            <el-table-column label="应播天数" prop="should_day"></el-table-column>
            <el-table-column label="时长" prop="time"></el-table-column>
            <el-table-column label="有效天数" prop="youxiaotianshu"></el-table-column>
            <el-table-column label="1日收入" prop="one_day_money"></el-table-column>
            <el-table-column :label="month_title" prop="month_money" width="100px;"></el-table-column>
            <el-table-column label="日均收票" prop="day_avg"></el-table-column>
            <el-table-column label="备注" prop="remark"></el-table-column>
        </el-table>
    </el-card>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import { get } from '@/api/index.js';
import teamApi from '@/api/team.js';
import companyApi from '@/api/company.js';
import departmentApi from '@/api/department.js';

export default {
    created(){
        this.search.date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + "-" + new Date().getDate()
        this.getCompanies()
        this.getDepartments()
        this.getData()
    },
    data(){
        return {
            month_title: '',
            list: [],
            count: [],
            companies: [],
            departments: [],
            search: {
                date: "",
                department_id: '',
                company_id: "",
            },
            last_total_row: 0,
        }
    },
    methods:{
        searchData(){
            this.getData()
        },
        getDepartments(){
            this.departments = []
            get(departmentApi.list, { type: "select", check: "operate", company_id: this.search.company_id }).then((res) => {
                this.departments = res.data.list
                if(this.departments.length > 1){
                    this.departments.unshift({id: "", name: "全部门"})
                }
                this.search.department_id = this.departments[0].id
            })
        },
        getCompanies(){
            get(companyApi.list, { type: 'select' }).then((res) => {
                this.companies = res.data.list
                this.companies.unshift({id: '', name: "全部"})
            })
        },
        getData(){
            get(teamApi.dayList, this.search).then((res) => {
                this.list = res.data.list
                this.count = res.data.count
                this.month_title = res.data.month + '月总收入'
            })
        },
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            if(columnIndex === 0 || columnIndex === 1){
                var rowspan = 1
                if(row.type == 'total' && columnIndex === 0){
                    return {
                        rowspan: rowspan,
                        colspan: 11,
                    }
                }else{
                    return {
                        rowspan: rowspan,
                        colspan: 1,
                    }
                }
                // var rowspan = 0
                // var colspan = 0;
                // if(typeof(row.rowspan) != 'undefined'){
                //     rowspan = row.rowspan - 1
                // }
                // if(typeof(row.colspan) != 'undefined'){
                //     colspan = row.colspan
                // }
                // if(row.type == 'total' && columnIndex === 0){
                //     rowspan = 1
                //     return {
                //         rowspan: rowspan,
                //         colspan: colspan,
                //     }
                // }
                // return {
                //     rowspan: rowspan,
                //     colspan: colspan,
                // }
            }else if(columnIndex > 0 && columnIndex < 12){
                if(row.type == 'total'){
                    return {
                        rowspan: 0,
                        colspan: 0,
                    }
                }
            }else{
                return {
                    rowspan: 1,
                    colspan: 1,
                }
            }
        },
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '合计';
                    return;
                }
                if(index === 2){
                    sums[index] = '';
                    return ;
                }
                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                    const value = Number(curr);
                    if (!isNaN(value)) {
                        return prev + curr;
                    } else {
                        return prev;
                    }
                    }, 0);
                    sums[index] += '';
                } else {
                    sums[index] = '';
                }
            });

            return sums;
        },
        exportExcel () {
            var id = "#out-table"
            var title = '团队日榜.xlsx'
            var fix = document.querySelector('.el-table__fixed');
            var wb;
            if (fix) {
                wb = XLSX.utils.table_to_book(document.querySelector(id).removeChild(fix));
                document.querySelector(id).appendChild(fix);
            } else {
                wb = XLSX.utils.table_to_book(document.querySelector(id));
            }
            /* get binary string as output */
            var wbout = XLSX.write(wb, {
                bookType: 'xlsx',
                bookSST: true,
                type: 'array'
            });
            try {
                FileSaver.saveAs(
                new Blob([wbout], {
                    type: 'application/octet-stream'
                }),
                title
                );
            } catch (e) {
                if (typeof console !== 'undefined') console.log(e, wbout);
            }
            return wbout;
        },
    }
}
</script>

<style lang='less' scoped>
    .el-table_2_column_19  {
        text-align: center;
    }
</style>
