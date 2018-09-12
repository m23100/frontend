<template>
    <!-- 秒杀单检测页 -->
    <div class="Killcheckout">
         <h2 class="Title">商品链接检测</h2>
        <div class="centent">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="商品链接" prop="link">
                <el-input v-model="ruleForm.link" placeholder="将商品链接粘贴于此"></el-input>
              </el-form-item>
              <el-form-item label="活动时间">
                <el-col>
                  <el-form-item prop="startdate">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.startdate" :picker-options="ruleForm.endDateOpt" style="width: 20%;"></el-date-picker>
                     <span class="text">说明:为保证商品及优惠券有效性，只能预约近3天的秒杀</span>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item label="秒杀场次" prop="startfield">
                <el-radio-group v-model="ruleForm.startfield">
                  <el-radio 
                   v-for="(item,index) in startfieldlist"
                  :key="item.time"
                  :label="item.time">{{item.field}}</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-col class="text text-col" :span="24">
                说明：<br/>
                1.正在显示推广的商品，不能重复提交<br/>
                2.等级低于4皇冠的C店不能提交<br/>
                3.店铺D.S.R店铺三绿,任一分数低于4.6的不能提交<br/>
                4.与描述相符分低于4.7分的商品不能提交
              </el-col>

              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import api from '@/http/api'
import { mapActions,mapGetters } from 'vuex'
export default {
  data() {
    var validateLink = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入商品链接'))
      } else {
        let res = false
        this.checkout().then(res=>{
          console.log(res)
            if(res.code==0){
              this.setGoodsType('kill')
              this.setGoodsLink({link:this.ruleForm.link,id:res.data.goodsid})
              this.setGoodsKill({goodsTime:this.ruleForm.startfield,goodsDate:this.ruleForm.startdate})
              callback()
            }else{
              callback(new Error('商品链接检测失败'))
            }
        })
        .catch(function(error) {
          callback(new Error('商品链接检测失败,网络错误！'))
        })
      }
    }
    return {
      ruleForm: {
        link: '',
        startdate:'',
        startfield:'',
        endDateOpt: {
            disabledDate: (time) => {
              return time.getTime() < Date.now() || time.getTime() > Date.now()+8.64e7*3
            }
        },
      },
      rules: {
        link: [
          { required: true, message: '请输入商品链接', trigger: 'change' },
          { validator: validateLink, trigger: 'change' }
        ],
        startdate: [
          { type: 'date',required: true, message: '请选择秒杀日期', trigger: 'blur' },
        ],
        startfield: [
          { required: true, message: '请选择秒杀场次', trigger: 'blur' },
        ],
      },
      startfieldlist: []
    };
  },
  methods:{
    ...mapActions({ setGoodsType:'setGoodsType',setGoodsLink: 'setGoodsLink',setGoodsKill:'setGoodsKill'}),
    //开始检测
    checkout:function(){  
      return api.checklink({link:this.ruleForm.link})
    } ,
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$router.push({
              path: "/Secondfrom"
          })
        } else {
          return false;
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
   },
    created(){
      api.getKillField().then(res=>{
        this.startfieldlist = res.data
      })
    }
  }
</script>
<style lang="scss" scoped type="text/css">
  .Killcheckout{
    padding-bottom: 30px;
    background-color: #fff;
    .Title {
      font-size: 18px;
      color: #000;
      border-left: 4px solid #43b5f9;
      line-height: 22px;
      padding-left: 10px;
      font-weight: 400;
      margin-bottom: 25px;
    }
    .text{
      color: #afafaf;
    }
    .text-col{
      padding-bottom: 20px;
      padding-left: 100px;
      font-size: 14px;
    }
    .el-input{
      width: 80%;
    }
  }
</style>
