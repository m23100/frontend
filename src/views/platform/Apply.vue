<template>
    <!-- 提交订单审核页 -->
    <div class="Apply">
         <div class="vipimg">
            <img src="../../assets/img/auth.png" alt="">
        </div>
        <!-- 去申请 -->
        <div class="box" v-if="state =='6'">
            <h2 class="Title">放单权限</h2>
            <div class="centent"><img src="../../assets/img/imgone.png" alt=""></div>
            <h3>您的放单权限处于未申请状态</h3>
            <div class="center"><el-button type="text" class="test" @click="centerDialogVisible = true">去申请</el-button></div>            
        </div>
        <!-- 审核中 -->
         <div class="box" v-else-if="state =='1'">
            <h2 class="Title">放单权限</h2>
            <div class="centent"><img src="../../assets/img/imgtwo.png" alt=""></div>
            <h3>放单权限资格正在全力审核中，请耐心等待</h3>
            <div class="center"><el-button type="text" class="test" @click="centerDialogVisible = true">修改资料</el-button></div>            
        </div>
        <!-- 拥有放单权限 -->
        <div class="box" v-else-if="state =='0'">
            <h2 class="Title">放单权限</h2>
            <div class="centent"><img src="../../assets/img/imgthree.png" alt=""></div>
            <h3>上传时请注意仔细阅读积分规则，以免扣分影响正常放单权限~</h3>
            <div class="center"><el-button type="text" class="test" @click="go">去放单</el-button></div>            
        </div>
        <!-- 审核失败 -->
        <div class="box" v-else-if="state =='3'">
            <h2 class="Title">放单权限</h2>
            <div class="centent"><img src="../../assets/img/imgfour.png" alt=""></div>
            <h3>审核未通过！<span class="Tips">被拒原因：{{this.ruleForm.refuse}}</span></h3>
            <div class="center"><el-button type="text" class="test" @click="centerDialogVisible = true">修改资料</el-button></div>            
        </div>
        <!-- 积分被扣完 -->
        <div class="box" v-else-if="state=='4'">
            <h2 class="Title">放单权限</h2>
            <div class="centent"><img src="../../assets/img/fangdan_locked.png" alt=""></div>
            <h3>您的积分被扣完了!<span class="Tips">放单资格将在下月1号恢复</span></h3>
            <div class="center"><el-button type="text" class="test">默默等待</el-button></div>            
        </div>
        <!-- 点券余额不足 -->
        <div class="box" v-else-if="state=='7'">
            <h2 class="Title">放单权限</h2>
            <div class="centent"><img src="../../assets/img/fangdan_locked.png" alt=""></div>
            <h3>您的点券被扣完了!</h3>
            <div class="center"><el-button type="text" class="test">默默等待</el-button></div>            
        </div>
        <!-- 弹窗提交申请放单表单 -->
        <el-dialog
          title="上传放单权限资格申请资料"
          :visible.sync="centerDialogVisible" width="700px" center>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
          <el-form-item label="行业名称" prop="industry">
            <el-input v-model="ruleForm.industry" placeholder="填写行业名称"></el-input>
          </el-form-item>
          <el-form-item label="联系人" prop="linker">
            <el-input v-model="ruleForm.linker" placeholder="填写帐号联系人"></el-input>
          </el-form-item>
          <el-form-item label="联系QQ" prop="qq">
            <el-input v-model="ruleForm.qq" placeholder="请填写联系QQ"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="ruleForm.phone" placeholder="请填写手机号"></el-input>
          </el-form-item>
          <el-form-item label="详细介绍" prop="content">
            <el-input type="textarea" v-model="ruleForm.content" placeholder="详细介绍描述个人/团队情况，所在地、成员人数、收入实力等"></el-input>
          </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="Submission('ruleForm')" type="primary">提交</el-button>
            <el-button @click="centerDialogVisible = false">取消</el-button>
          </span>
        </el-dialog>

    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import api from '@/http/api'
import {isPhone} from '@/util/tool' 
export default {
  data() {

    var checkPhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else {
        if (!isPhone(value)) {
          callback(new Error('请输入正确的手机号'))
        }
        callback();
      }
    }
    return {
      centerDialogVisible: false,
      state:'6',//  1:放单权限审核中,   3放单权限审核被拒 4积分用完停用  6暂未开通放单权限
      ruleForm: {
        industry: '',
        linker: '',
        qq:'',
        phone:'',
        content:'',
      },
      rules: {
        industry: [
          { required: true, message: '请输入行业名称', trigger: 'blur' },
        ],
        linker: [
          { required: true, message: '请输入联系人', trigger: 'change' },
        ],
        qq: [
          { required: true, message: '请输入联系QQ', trigger: 'change' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          { validator: checkPhone, trigger: 'change' }
        ],
        content: [
          { required: true, message: '请输入详细介绍', trigger: 'change' }
        ],
      },
    };
  },
  inject:['reload'],
  methods: {
    go: function() {
      this.$router.push({
        path: "/Submission"
      });
    },

    //用户上传放单权限资格申请资料
    Submission:function(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data=this.ruleForm
          api.applyaudit(data).then(res =>{
            if(res.code==0){
              this.$message.success('提交成功!')
              this.reload()
            }else{
              this.$message.error('提交失败')
            }
          })
          .catch(error => {
            console.log(error)
          })
        } else {
          return false;
        }
      })
    }
  },
  created(){
    //用户获取放单权限资格申请资料审核数据
     api.GetUserIsSend().then(res=>{
      this.state = res.code
      if(res.code==1 || res.code==3){
        this.ruleForm = res.submit_audit
      }
     })
  }
};
</script>
<style scoped>
.vipimg {
  margin-bottom: 15px;
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
.Apply .box {
  padding: 20px;
  background-color: #fff;
  height: 500px;
}
.centent {
  text-align: center;
}
.box h3 {
  color: #a0a0a0;
  font-size: 14px;
  text-align: center;
  margin: 20px 0;
}
.center{
  text-align: center;
  margin: 0 auto;
}
.test {
  width: 80px;
  height: 36px;
  background-color: #49a6f7;
  border-radius: 4px;
  border-radius: 8px;
  font-size: 14px;
  /* line-height: 36px; */
  color: #fff; 
  cursor: pointer;
}
.from {

}
.flex {
  display: flex;
  justify-content: space-between;
  width: 50%;
  margin: 12px 0;
}
.flex > span {
  /* span */
  /* padding: 30px 20px; */
  color: #989898;
  font-size: 14px;
  line-height: 36px;
}
.flex > input {
  width: 300px;
  border-radius: 4px;
  border: solid 1px #d3d3d3;
  padding: 10px;
}
.textarea {
  display: flex;
  justify-content: space-between;
  width: 84%;
}
.textarea > span {
  color: #989898;
  font-size: 14px;
  line-height: 36px;
}
.textarea > textarea {
  width: 84.5%;
  border-radius: 4px;
  border: solid 1px #d3d3d3;
  padding: 10px;
  resize: none;
}
.Tips{
  color: red;
}
</style>
             