<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>艺人资料录入</span>
        </div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="合同模板">
                <el-select v-model="form.fdd.template_id" style="width: 100%;">
                    <el-option v-for="(item, key) in templates" :key="key" :label="item.template_name" :value="item.template_id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="实名">
                <el-input v-model="form.actor.name"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
                <el-input v-model="form.actor.phone"></el-input>
            </el-form-item>
            <el-form-item label="身份证号码">
                <el-input v-model="form.actor.id_card_no"></el-input>
            </el-form-item>
            <el-form-item label="艺名">
                <el-input v-model="form.actor_plat.nickname"></el-input>
            </el-form-item>
            <el-form-item label="签约人">
                <el-select filterable class="sign-select" v-model="form.actor_plat.sign_user_id" @change="getOperateUsers">
                    <el-option v-for="(item, key) in signUsers" :key="key" :value="item.id" :label="item.rel_name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="运营人">
                <el-select filterable class="sign-select" v-model="form.actor_plat.operate_user_id">
                    <el-option v-for="(item, key) in operateUsers" :key="key" :value="item.id" :label="item.rel_name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所属公会">
                <el-select allow-create filterable class="sign-select" v-model="form.actor_plat.guild_id">
                    <el-option v-for="(item, key) in guilds" :key="key" :value="item.id" :label="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="主播等级">
                <el-select filterable class="sign-select" v-model="form.actor_plat.level_id">
                    <el-option v-for="(item, key) in levels" :key="key" :value="item.id" :label="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="主播来源">
                <el-input v-model="form.actor_plat.source"></el-input>
            </el-form-item>
            <el-form-item label="合约时间">
                <el-select filterable class="sign-select" v-model="form.contract.heyue_time">
                    <el-option label="4个月" value="4个月"></el-option>
                    <el-option label="1年" value="1年"></el-option>
                    <el-option label="1+2年" value="1+2年"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="平台">
                <el-select v-model="form.actor_plat.plat_id" style="width:100%;" @change="changePlat">
                    <el-option v-for="(item, key) in plats" :key="key" :value="item.id" :label="item.name"></el-option>
                </el-select>
            </el-form-item>
            <!-- <el-form-item label="平台">
                <el-checkbox-group @change="changeCheckBox" v-model="selectPlats">
                    <el-checkbox v-for="(item, key) in plats" :key="key" :value="item.id" name="actor[plat_id][]" :label="item.name"></el-checkbox>
                </el-checkbox-group>
            </el-form-item> -->
            <el-form-item style="display:none;" :ref="item.id + '_id'" :label="item.name + 'ID'" v-for="(item, key) in plats" :key="key">
                <el-input v-model="form.actor_plat[item.id + '_id']"></el-input>
            </el-form-item>
            <el-form-item label="公司分成">
                <el-input v-model="form.company_cals.company_cal_type"></el-input>
            </el-form-item>
            <el-form-item style="display:none;" :ref="'1_douyin_fencheng'" label="抖音分成方式">
                <el-input v-model="form.actor_plat.douyin_fencheng"></el-input>
            </el-form-item>
            <el-form-item label="扶持金额">
                <el-input type="number" min="0" @input="changeNumber" v-model="form.actor_plat_signs.support_money"></el-input>
            </el-form-item>
            <el-form-item label="抖加比例">
                <el-input type="number" min="0" @input="changeNumberDoujiaBili" v-model="form.actor_plat_signs.doujiabili"></el-input>
            </el-form-item>
            <el-form-item label="合同更改">
                <el-input v-model="form.company_cals.contract_change"></el-input>
            </el-form-item>
            <el-form-item label="主播分成比">
                <el-input type="number" min="0" @input="changeNumberFencheng" v-model="form.actor_plat.fenchengbi"></el-input>
            </el-form-item>
            <el-form-item label="主播保底">
                <el-input type="number" min="0" @input="changeNumberSalary" v-model="form.actor_plat.salary"></el-input>
            </el-form-item>
            <el-form-item label="付款方式">
                <el-input v-model="form.company_cals.pay_type"></el-input>
            </el-form-item>
            <el-form-item label="银行卡号">
                <el-input v-model="form.actor_plat.bank_no"></el-input>
            </el-form-item>
            <el-form-item label="生日">
                <el-date-picker style="width: 100%;" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="请选择生日" v-model="form.actor.birthday"></el-date-picker>
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
                <el-input type="textarea" v-model="form.actor_plat.remark"></el-input>
            </el-form-item>
            <el-form-item class="button-groups">
                <el-button type="primary" @click="doAutoSign">立即创建</el-button>
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
import levelApi from '@/api/level';
import guildApi from '@/api/guild';
import autoSignApi from '@/api/autosign';

export default {
    data(){
        return {
            form: {
                fdd: {
                    template_id: "",
                },
                actor: {
                    name: "",
                    id_card_no: "",
                    phone: "",
                    birthday: "",
                    address: "",
                },
                contract: {
                    heyue_time: "4个月",
                },
                actor_plat: {
                    sign_user_id: "",
                    operate_user_id: "",
                    nickname: "",
                    plat_id: "",
                    douyin_fencheng: "",
                    fenchengbi: "",
                    salary: "",
                    bank_no: "",
                    bank_id: "",
                    remark: "",
                    level_id: "",
                    source: "",
                    guild_id: "",
                },
                company_cals: {
                    company_cal_type: "",
                    contract_change: "",
                    pay_type: "",
                },
                actor_plat_signs: {
                    support_money: 0,
                    doujiabili: 0,
                },
            },
            signUsers: [],
            plats: [],
            selectPlats: [],
            banks: [],
            settlements: [],
            levels: [],
            guilds: [],
            operateUsers: [],
            templates: [],
        }
    },
    created(){
        this.init()
    },
    methods: {
        init(){
            this.getSignUsers()
            this.getOperateUsers(0)
            this.getPlats()
            this.getBanks()
            this.getSettlements()
            this.getLevels()
            this.getGuilds()
            this.getTemplates()
        },
        getTemplates(){
            get(autoSignApi.fdd_templates).then((res) => {
                this.templates = res.data.list
                this.form.fdd.template_id = this.templates[0].template_id
            })
        },
        getSignUsers(){
            get(departmentApi.userListByType + '/2', { type: "select" }).then((res) => {
                this.signUsers = res.data.list
            })
        },
        getOperateUsers(val){
            get(departmentApi.userListByType + '/1', { type: "select", sign_user_id:  val}).then((res) => {
                this.operateUsers = res.data.list
            })
        },
        getPlats(){
            get(platApi.list).then((res) => {
                this.plats = res.data.list
                //隐藏id输入框
                this.hiddenPlatIdInputs()
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
        getLevels(){
            get(levelApi.list).then((res) => {
                this.levels = res.data.list
                this.form.actor_plat.level_id = this.levels[this.levels.length - 1]['id']
            })
        },
        getGuilds(){
            get(guildApi.list).then((res) => {
                this.guilds = res.data.list
                this.guilds.unshift({ id: "", name: "无" })
            })
        },
        hiddenPlatIdInputs(){
            this.plats.map((plat) => {
                var index = plat.id + '_id'
                if(typeof this.$refs[index] != 'undefined'){
                    console.log(this.$refs[index])
                }
            })
        },
        changePlat(){
            this.plats.map((plat) => {
                if(this.form.actor_plat.plat_id == plat.id){
                    //显示
                    if(plat.id == 1){
                        let index2 = '1_douyin_fencheng'
                        this.$refs[index2].$el.style.display = 'block'
                    }
                    let index = plat.id + '_id'
                    this.$refs[index][0].$el.style.display = 'block'
                }else{
                    //隐藏
                    if(plat.id == 1){
                        let index3 = '1_douyin_fencheng'
                        this.$refs[index3].$el.style.display = 'none'
                    }
                    let index4 = plat.id + '_id'
                    this.$refs[index4][0].$el.style.display = 'none'
                }
            })
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
            this.plats.map((plat) => {
                if(this.form.actor_plat.plat_id.includes(plat.id)){
                    //显示
                    if(plat.id == 1){
                        let index2 = '1_douyin_fencheng'
                        this.$refs[index2].$el.style.display = 'block'
                    }
                    let index = plat.id + '_id'
                    this.$refs[index][0].$el.style.display = 'block'
                }else{
                    //隐藏
                    if(plat.id == 1){
                        let index3 = '1_douyin_fencheng'
                        this.$refs[index3].$el.style.display = 'none'
                    }
                    let index4 = plat.id + '_id'
                    this.$refs[index4][0].$el.style.display = 'none'
                }
            })
        },
        changeNumber(){
            if(this.form.actor_plat_signs.support_money < 0){
                this.form.actor_plat_signs.support_money = 0
            }
        },
        changeNumberDoujiaBili(){
            if(this.form.actor_plat_signs.doujiabili < 0){
                this.form.actor_plat_signs.doujiabili = 0
            }
        },
        changeNumberFencheng(){
            if(this.form.actor_plat.fenchengbi < 0){
                this.form.actor_plat.fenchengbi = 0
            }
        },
        changeNumberSalary(){
            if(this.form.actor_plat.salary < 0){
                this.form.actor_plat.salary = 0
            }
        },
        doAutoSign(){
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            post(autoSignApi.add, this.form).then((res) => {
                loading.close()
                this.$message.success(res.msg)
            }).catch((err) => {
                loading.close()
            })
        },
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