<template>
    <div class="Authentication right-content">
        <div class="vipimg">
            <img src="../assets/img/vip.png" alt="">
        </div>
        <!-- 未认证 -->
        <div class="centent" v-if="state===1">
            <div class="Title">认证信息</div>
             <div class="xx"><img src="../assets/img/renzhenxiong.png" alt=""></div>
            <h3>当前处于未认证状态</h3>
            <div class="xxx">
              <el-button type="text" class="test" @click="centerDialogVisible = true">去认证</el-button>
            </div> 
        </div>
        <div class="centent" v-if="state===2">
            <h2 class="Title">认证信息</h2>
             <div class="xx"><img src="../assets/img/renzhenxiong.png" alt=""></div>
            <h3>正在全力审核中</h3>
            <div class="xxx">
              <el-button type="text" class="test" @click="centerDialogVisible = true">修改资料</el-button>
            </div> 
        </div>
        <div class="centent" v-if="state===3">
            <h2 class="Title">认证信息</h2>
             <div class="xx"><img src="../assets/img/renzhenxiong.png" alt=""></div>
            <h3>资料被打回</h3>
            <div class="xxx">
              <el-button type="text" class="test" @click="centerDialogVisible = true">修改资料</el-button>
            </div> 
        </div>
        <!-- 认证成功后 -->
        <div class="centent" v-else-if="(state===0) ">
            <h2 class="Title">认证信息</h2>
            <div class="PersonalData">
              <el-row>
                <el-col :span="3"><div class="grid-content bg-purple">真实姓名</div></el-col>
                <el-col :span="14"><div class="grid-content bg-purple-light">{{ruleForm.real_name}}</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="3"><div class="grid-content bg-purple">手机号</div></el-col>
                <el-col :span="14"><div class="grid-content bg-purple-light">{{ruleForm.phone}}</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="3"><div class="grid-content bg-purple">身份证号</div></el-col>
                <el-col :span="14"><div class="grid-content bg-purple-light">{{ruleForm.id_number}}</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="3"><div class="grid-content bg-purple">收入水平</div></el-col>
                <el-col :span="14"><div class="grid-content bg-purple-light">{{user_income_str}}</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="3"><div class="grid-content bg-purple">自有渠道</div></el-col>
                <el-col :span="14"><div class="grid-content bg-purple-light">{{ruleForm.channel_info}}</div></el-col>
              </el-row>
              <el-row>
                <el-button @click="centerDialogVisible = true" type="primary">申请更新</el-button>
              </el-row>             
            </div>
        </div>
        <!-- 弹窗提交申请放单表单 -->
        <el-dialog
          title="上传放单权限资格申请资料"
          :visible.sync="centerDialogVisible" width="700px" center>

          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
          <el-form-item label="真实姓名" prop="real_name">
            <el-input v-model="ruleForm.real_name" placeholder="请填写真实姓名"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="ruleForm.phone" placeholder="请填写手机号"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="id_number">
            <el-input v-model="ruleForm.id_number" placeholder="请填写身份证号码"></el-input>
          </el-form-item>
          <el-form-item label="身份证图片" prop="id_image_just">
            <el-upload
              class="avatar-uploader"
              :headers="uploadHeaders"
              :action="uploadUrl"
              :show-file-list="false"
              :limit="1"
              :before-upload="beforeAvatarUpload"
              :on-preview="handlePictureCardPreview"
              :on-exceed="handleExceed"
              :on-success="idImageFront"
              :before-remove="beforeRemove"
              :on-remove="idImageFrontRemove"
              >
              <img v-if="ruleForm.id_image_just" :src="ruleForm.id_image_just" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <div class="el-upload__tip" slot="tip">上传身份证正面</div>
            </el-upload>
            <el-upload
              class="avatar-uploader"
              :headers="uploadHeaders"
              :action="uploadUrl"
              :show-file-list="false"
              :limit="1"
              :before-upload="beforeAvatarUpload"
              :on-preview="handlePictureCardPreview"
              :on-exceed="handleExceed"
              :on-success="idImageBack"
              :on-remove="idImageBackRemove"
              :before-remove="beforeRemove"
              >
              <img v-if="ruleForm.id_image_back" :src="ruleForm.id_image_back" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <div class="el-upload__tip" slot="tip">上传身份证反面</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="收入水平" prop="user_income">
            <el-select v-model="ruleForm.user_income" placeholder="请选择" @change="handleChange">
              <el-option
                v-for="item in ruleForm.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上传照片" prop="income_prove">
            <el-upload
              class="avatar-uploader"
              :headers="uploadHeaders"
              :action="uploadUrl"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
              :on-preview="handlePictureCardPreview"
              :limit="1"
              :on-exceed="handleExceed"
              :on-success="incomeProve"
              :before-remove="beforeRemove"
              :on-remove="incomeProveRemove"
              >
              <img v-if="ruleForm.income_prove" :src="ruleForm.income_prove" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <!-- <div class="el-upload__tip" slot="tip">上传身份证正面</div> -->
            </el-upload>
          </el-form-item>
          <el-form-item label="自有渠道" prop="channel_info">
            <el-input v-model="ruleForm.channel_info" placeholder="填写自有渠道信息"></el-input>
          </el-form-item>
          <el-form-item label="上传照片" prop="channel_prove">     
            <el-upload
              class="avatar-uploader"
              :headers="uploadHeaders"
              :action="uploadUrl"
              :show-file-list="false"
              :limit="1"
              :before-upload="beforeAvatarUpload"
              :on-preview="handlePictureCardPreview"
              :on-exceed="handleExceed"
              :on-success="channelProve"
              :before-remove="beforeRemove"
              :on-remove="channelProveRemove"
              >
              <img v-if="ruleForm.channel_prove" :src="ruleForm.channel_prove" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <!-- <div class="el-upload__tip" slot="tip">上传身份证正面</div> -->
            </el-upload>
          </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="Submission('ruleForm')" type="primary" :disabled="button_disabled">提交</el-button>
            <el-button @click="centerDialogVisible = false">取消</el-button>
          </span>
        </el-dialog>
    </div>
</template>
<script>
  import api from '@/http/api'
  import {imgBaseUrl} from '@/util/env' 
  import {isPhone,isIDcard} from '@/util/tool' 
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
      var checkIDcard = (rule,value,callback)=>{
        if (value === '') {
          callback(new Error('请输入身份证号'))
        } else {
          if (!isIDcard(value)) {
            callback(new Error('请输入正确的身份证号'))
          }
          callback();
        }
      }
      return {
        dialogImageUrl: '',
        uploadUrl:'http://dev.ruomengtv.com/api/image/imageUpload?type=auth',
        dialogVisible: false,
        centerDialogVisible: false,
        state: -1,
        options: [],
        value: "",
        user_income_str:'',
        button_disabled:false,
        uploadHeaders: {Authorization: `Bearer ${localStorage.getItem('token')}`},
        ruleForm: {
          real_name: '',
          phone: '',
          id_number:'',
          user_income:'',
          income_prove:'',
          options: [],
          id_image_just:'',
          id_image_back:'',
          channel_info:'',
          channel_prove:''
        },
        rules: {
          real_name: [
            { required: true, message: '请输入真实姓名', trigger: 'blur' },
          ],
          phone: [
            { required: true, message: '请输入手机号', trigger: 'change' },
            { validator: checkPhone, trigger: 'change' }
          ],
          id_number: [
            { required: true, message: '请输入身份证号', trigger: 'change' },
            { validator: checkIDcard, trigger: 'change' }
          ],
          user_income: [
            { required: true, message: '请选择收入水平', trigger: 'change' }
          ],
          income_prove: [
            { required: true, message: '请上传收入水平图片', trigger: 'change' }
          ],
          id_image_just: [
            { required: true, message: '请上身份证正面', trigger: 'change' }
          ],
          id_image_back: [
            { required: true, message: '请上传身份证反而', trigger: 'change' }
          ],
          channel_info: [
            { required: true, message: '请输入渠道信息', trigger: 'change' }
          ],
          channel_prove: [
            { required: true, message: '请上传渠道信息图片', trigger: 'change' }
          ],
        },
      }
    },
    inject:['reload'],
    methods: {
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleExceed(files) {
        this.$message.warning('只能上传1个文件');
      },
      beforeAvatarUpload(file) {
        const isJPG = (file.type === 'image/jpeg' || file.type==='image/png');
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      beforeRemove(file, fileList) {
        // 增加一个询问框
        return this.$confirm(`确定移除 ${file.name}？`)
      },
      idImageFront(response,file){
        // this.id_image_just_url = URL.createObjectURL(file.raw)
        this.ruleForm.id_image_just = imgBaseUrl + response.data.url
      },
      idImageFrontRemove(file,idImageList){
        this.ruleForm.id_image_just = ''
      },
      idImageBack(response){
        // this.id_image_back_url = URL.createObjectURL(file.raw)
        this.ruleForm.id_image_back = imgBaseUrl + response.data.url
      },
      idImageBackRemove(){
        this.ruleForm.id_image_back = ''
      },
      incomeProve(response){
        // this.income_prove_url = URL.createObjectURL(file.raw)
        this.ruleForm.income_prove = imgBaseUrl + response.data.url
      },
      incomeProveRemove(){
        this.ruleForm.income_prove = ''
      },
      channelProve(response){
        // this.channel_prove_url = URL.createObjectURL(file.raw)
        this.ruleForm.channel_prove = imgBaseUrl + response.data.url
      },
      channelProveRemove(){
        this.ruleForm.channel_prove = ''
      },
      handleChange(val){
        this.ruleForm.user_income = val
      },

      //提交表单信息
      Submission(formName){
        this.button_disabled = true
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data=this.ruleForm
            api.addUserAuth(data).then(res =>{
              if(res.code==0){
                this.$message.success('提交成功!')
                this.reload()
                this.button_disabled = false
              }else{
                this.$message.error('提交失败'+res.msg)
                this.button_disabled = false
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

    created() {
      api.getUserAuth().then(res =>{
          this.state = res.code //0用户审核通过,1用户暂未提交审核,2用户认证暂未审核,3用户审核被拒
        if(res.code!=1){
          this.ruleForm = res.data.userAuthInfo
          this.ruleForm.options = []
        }
        res.data.userIncomeList.forEach((element,index) => {
          if(element.income_type==this.ruleForm.user_income){
            this.user_income_str = element.income
          }
          this.ruleForm.options.push({label:element.income,value:element.income_type})
        })
        
      })
    }
    
  }
</script>
<style type="text/css" lang="scss" scoped="">

  .centent {
    background-color: #fff;
    display: inline-block;
    width: 100%;
    padding-top: 20px;
  }
  .xx {
    text-align: center;
  }
  .centent h3 {
    color: #a0a0a0;
    font-size: 14px;
    text-align: center;
    margin: 20px 0;
  }
  .xxx {
    text-align: center;
    margin: 0 auto;
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
    width:100% !important;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    // background: #d3dce6;
    color:#989898;
    line-height:36px;
    font-size:16px;
  }
  .bg-purple-light {
    padding-left:12px;
    background: #f0f0f0;
    line-height:36px;
    font-size:14px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .centent {
    background-color: #fff;
    display: inline-block;
    width: 100%;
    padding-top: 20px;
  }
  .PersonalData{
    padding-top:10px;
    padding-left:30px;
    padding-bottom:30px;
  }
  .Title{
    background-color:#fff;
  }
  .avatar-uploader{
    display:inline-block;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 115px;
    height: 115px;
    line-height: 115px;
    text-align: center;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    margin-right: 15px;
  }
  .avatar-uploader-icon:hover{
    border-color: #409EFF;
  }
  .avatar {
    width: 115px;
    height: 115px;
    display: block;
  }
  .el-upload__tip{
    width:100px;
  }
</style>