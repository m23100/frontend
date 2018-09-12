<template>
    <!-- 放单平台商品检测 -->
    <div class="LinkDetection">
         <div class="vipimg">       
            <img src="../../assets/img/vip.png" alt="">
        </div>
        <div class="centent">
            <h2 class="Title">商品链接检测</h2>
            <div class="detection">

              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="商品链接" prop="link">
                  <el-input v-model="ruleForm.link" placeholder="将商品链接粘贴于此"></el-input>
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
              this.setGoodsType(this.getGoodsType)
              this.setGoodsLink({link:this.ruleForm.link,id:res.data.goodsid})
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
        goodsid:0,
      },
      rules: {
        link: [
          { required: true, message: '请输入商品链接', trigger: 'blur' },
          { validator: validateLink, trigger: 'change' }
        ],
      },
    };
  },
  methods:{
    ...mapActions({setGoodsType:'setGoodsType', setGoodsLink: 'setGoodsLink'}),
    checkout:function(){  
      return api.checklink({link:this.ruleForm.link})
    } ,

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.getGoodsType=='normal'){
            this.$router.push({
              path: "/Flatfrom",
            })
          }else if(this.getGoodsType=='fire'){
            this.$router.push({
              path: "/Firefrom",
            })
          }
        } else {
          // console.log('error submit!!');
          return false;
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  computed: {
    ...mapGetters([
      'getGoodsType'
    ])
  },
  created(){
    if(this.getGoodsType==''){
      this.$router.push({
          path: "/Submission"
      })
    }
  },

};
</script>
<style lang="scss" scoped type="text/css">
.LinkDetection{
  .vipimg {
    margin-bottom: 15px;
  }
  .centent {
    padding: 15px 10px;
    background-color: #fff;
    height: auto;
    margin-bottom: 20px;
  }
  .Title {
    font-size: 18px;
    color: #000;
    border-left: 4px solid #43b5f9;
    line-height: 22px;
    padding-left: 10px;
    font-weight: 400;
    margin-bottom: 25px;
  }


  .el-input{
    display: inline-block;
    width: 423px;
  }
  .el-input__inner{
      padding-left: 20px;
      width: 423px;
      border-bottom-left-radius: 20px;
      border-top-left-radius: 20px;
      outline: none;
      background-color: #f4f4f4;
  }
  .text{
      color: #afafaf;
    }
  .text-col{
    padding-bottom: 20px;
    padding-left: 100px;
    font-size: 14px;
  }
}
</style>
             