<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>艺人资料录入</span>
        </div>
        <el-form ref="form" :model="form" label-width="80px">
            <!-- <el-form-item label="合同签订日期">
                <el-date-picker style="width: 100%;" v-model="form.contract.contract_date" class="sign-date" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="合同签订日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="合同编号">
                <el-input v-model="form.contract.contract"></el-input>
            </el-form-item> -->
            <el-form-item label="档案编号">
                <el-input v-model="form.actor_plat.file_number"></el-input>
            </el-form-item>
            <el-form-item label="签约人">
                <el-select filterable class="sign-select" v-model="form.actor_plat.sign_user_id">
                    <el-option v-for="(item, key) in signUsers" :key="key" :value="item.id" :label="item.rel_name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="艺名">
                <el-input v-model="form.actor_plat.nickname"></el-input>
            </el-form-item>
            <el-form-item label="平台">
                <el-checkbox-group @change="changeCheckBox" v-model="selectPlats">
                    <el-checkbox v-for="(item, key) in plats" :key="key" :value="item.id" name="actor[plat_id][]" :label="item.name"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item :label="item.name + 'ID'" v-for="(item, key) in plats" :key="key">
                <el-input v-model="form.actor_plat[item.id + '_id']"></el-input>
            </el-form-item>
            <!-- <el-form-item label="抖音ID">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="火山ID">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="映客ID">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="陌陌ID">
                <el-input v-model="form.name"></el-input>
            </el-form-item> -->
            <el-form-item label="公司分成">
                <el-input v-model="form.company_cals.company_cal_type"></el-input>
            </el-form-item>
            <el-form-item label="抖音分成方式">
                <el-input v-model="form.actor_plat.douyin_fencheng"></el-input>
            </el-form-item>
            <el-form-item label="合同更改">
                <el-input v-model="form.company_cals.contract_change"></el-input>
            </el-form-item>
            <el-form-item label="主播分成比">
                <el-input v-model="form.actor_plat.fenchengbi"></el-input>
            </el-form-item>
            <el-form-item label="主播保底">
                <el-input v-model="form.actor_plat.salary"></el-input>
            </el-form-item>
            <el-form-item label="付款方式">
                <el-input v-model="form.company_cals.pay_type"></el-input>
            </el-form-item>
            <el-form-item label="实名">
                <el-input v-model="form.actor.name"></el-input>
            </el-form-item>
            <el-form-item label="身份证号码">
                <el-input v-model="form.actor.id_card_no"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
                <el-input v-model="form.actor.phone"></el-input>
            </el-form-item>
            <el-form-item label="银行卡号">
                <el-input v-model="form.actor_plat.bank_no"></el-input>
            </el-form-item>
            <el-form-item label="生日">
                <el-input v-model="form.actor.birthday"></el-input>
            </el-form-item>
            <el-form-item label="住址">
                <el-input v-model="form.actor.address"></el-input>
            </el-form-item>
            <el-form-item label="开户行">
                <el-select filterable class="sign-select" v-model="form.actor_plat.bank_id">
                    <el-option v-for="(item, key) in banks" :key="key" :value="item.id" :label="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="form.actor_plat.remark"></el-input>
            </el-form-item>
            <el-form-item class="button-groups">
                <el-button type="primary">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<script>
import { get, post } from '@/api/index';
import departmentApi from '@/api/department';
import platApi from '@/api/plats';
import bankApi from '@/api/bank';

export default {
    data(){
        return {
            form: {
                actor: {
                    name: "",
                    id_card_no: "",
                    phone: "",
                    birthday: "",
                    address: "",
                },
                contract: {
                    // contract_date: "",
                    // contract: "",
                },
                actor_plat: {
                    file_number: "",
                    sign_user_id: "",
                    nickname: "",
                    plat_id: [],
                    douyin_fencheng: "",
                    fenchengbi: "",
                    salary: "",
                    bank_no: "",
                    bank_id: "",
                    remark: "",
                },
                company_cals: {
                    company_cal_type: "",
                    contract_change: "",
                    pay_type: "",
                }
            },
            signUsers: [],
            plats: [],
            selectPlats: [],
            banks: [],
            settlements: [],
        }
    },
    created(){
        this.init()
    },
    methods: {
        init(){
            this.form.contract_date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
            this.getSignUsers()
            this.getPlats()
            this.getBanks()
            this.getSettlements()
        },
        getSignUsers(){
            get(departmentApi.userListByType + '/2', { type: "select" }).then((res) => {
                this.signUsers = res.data.list
            })
        },
        getPlats(){
            get(platApi.list).then((res) => {
                this.plats = res.data.list
            })
        },
        getBanks(){
            get(bankApi.optionList, { type: "select" }).then((res) => {
                this.banks = res.data.list
            })
        },
        getSettlements(){
            this.settlements = [
                {id : 1, name: "对公结算"},
                {id : 2, name: "对私结算"},
            ];
        },
        changeCheckBox(platNames){
            this.form.actor_plat.plat_id = []
            platNames.map((name) => {
                this.plats.map((item) => {
                    if(name == item.name){
                        this.form.actor_plat.plat_id.push(item.id)
                    }
                })
            }) 
        }
    }
}
</script>
<style scoped>
    .sign-date{
        width: 100%;
    }

    .sign-select{
        width: 100%;
    }

    .button-groups{
        text-align: center;
    }
</style>