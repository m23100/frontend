<template>
    <div class="Authentication">
        <div class="vipimg">
            <img src="../assets/img/vip.png" alt="">
        </div>
        <!-- 未认证 -->
        <div class="centent" v-if="state===-1">
            <h2 class="Title">认证信息</h2>
             <div class="xx"><img src="../assets/img/renzhenxiong.png" alt=""></div>
            <h3>当前处于未认证状态</h3>
            <div class="xxx"><el-button type="text" class="test" @click="centerDialogVisible = true">去认证</el-button></div> 
        </div>
        <!-- 认证成功后 -->
        <div class="centent" v-else-if="(state===1  || state===0) ">
            <h2 class="Title">认证信息</h2>
            <div class="PersonalData">
                <div class="name">
                    <span>真实姓名</span>
                    <div>{{real_name}}</div>
                </div>
                <div class="name">
                    <span>手机号</span>
                    <div>{{phone}}</div>
                </div>
                 <div class="number" >
                    <span>身份证号</span>
                    <div>{{id_number}}</div>
                </div>
                 <div class="name" >
                    <span>收入水平</span>
                    <div>13037851234</div>
                </div>
                <div class="channel">
                    <span>自有渠道</span>
                    <div>{{channel_info}}</div>
                </div>                
            </div>
            <div class="update">
                <span @click="centerDialogVisible = true">申请更新</span>
            </div>
        </div>
        <!-- 弹窗提交申请放单表单 -->
        <el-dialog
          title="上传放单权限资格申请资料"
          :visible.sync="centerDialogVisible" width="36%" center>
          <div class="from">
            <div class="flex1">
              <div class="flex-left">真实姓名</div> 
              <input type="text" v-model="real_name" placeholder="填写真实姓名">
            </div>
            <div class="flex1">
              <div class="flex-left">手机号</div> 
              <input type="text" v-model="phone" placeholder="填写手机号">
            </div>
            <div class="flex1">
              <div class="flex-left">身份证号</div> 
              <input type="text" v-model="id_number" placeholder="填写身份证号码">
            </div>
            <div class="flex2">
              <div class="flex-left">上传身份证</div>
              <div class="flex-right"> 
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
                  <img v-if="id_image_just_url" :src="id_image_just_url" class="avatar">
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
                  <img v-if="id_image_back_url" :src="id_image_back_url" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  <div class="el-upload__tip" slot="tip">上传身份证反面</div>
                </el-upload>
              </div>
            </div>
            <div class="flex2">
              <div class="flex-left">收入水平</div>
              <div class="flex-right"> 
                <el-select v-model="value" placeholder="请选择" @change="handleChange">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="flex2">
              <div class="flex-left">上传图片</div>
              <div class="flex-right"> 
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
                  <img v-if="income_prove_url" :src="income_prove_url" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  <!-- <div class="el-upload__tip" slot="tip">上传身份证正面</div> -->
                </el-upload>
              </div>
            </div>
            <div class="flex1">
              <div class="flex-left">自有渠道</div> 
              <input type="text" v-model="channel_info" placeholder="填写自有渠道信息">
            </div>
            <div class="flex2">
              <div class="flex-left">上传图片</div>
              <div class="flex-right"> 
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
                  <img v-if="channel_prove_url" :src="channel_prove_url" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  <!-- <div class="el-upload__tip" slot="tip">上传身份证正面</div> -->
                </el-upload>
              </div>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="Submission" type="primary">提交</el-button>
            <el-button @click="centerDialogVisible = false">取消</el-button>
          </span>
        </el-dialog>
    </div>
</template>
<script>
import api from '../http/api'
export default {
  data() {
    return {
      dialogImageUrl: '',
      uploadUrl:'http://dev.ruomengtv.com/api/image/imageUpload?type=auth',
      dialogVisible: false,
      centerDialogVisible: false,
      state: 0,
      options: [],
      value: "",
      uploadHeaders: {Authorization: `Bearer ${localStorage.getItem('token')}`},
      real_name:'',
      phone:'',
      id_number:'',
      id_image_just:'',
      id_image_just_url:'',
      id_image_back:'',
      id_image_back_url:'',
      user_income:'',
      income_prove:'',
      income_prove_url:'',
      channel_info:'',
      channel_prove:'',
      channel_prove_url:''
    }
  },
  
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
      this.id_image_just_url = URL.createObjectURL(file.raw)
      this.id_image_just = response.data.url
    },
    idImageFrontRemove(file,idImageList){
      this.id_image_just = ''
    },
    idImageBack(response){
      this.id_image_back_url = URL.createObjectURL(file.raw)
      this.id_image_back = response.data.url
    },
    idImageBackRemove(){
      this.id_image_back = ''
    },
    incomeProve(response){
      this.income_prove_url = URL.createObjectURL(file.raw)
      this.income_prove = response.data.url
    },
    incomeProveRemove(){
      this.income_prove = ''
    },
    channelProve(response){
      this.channel_prove_url = URL.createObjectURL(file.raw)
      this.channel_prove = response.data.url
    },
    channelProveRemove(){
      this.channel_prove = ''
    },
    handleChange(val){
      this.user_income = val
    },

    //提交表单信息
    Submission(){
      let data={
         real_name:this.real_name,
         phone:this.phone,
         id_number:this.id_number,
         id_image_just:this.id_image_just,
         id_image_back:this.id_image_back,
         user_income:this.user_income,
         income_prove:this.income_prove,
         channel_info:this.channel_info,
         channel_prove:this.channel_prove,
      }
      // console.log(data)
      api.addUserAuth(data).then(res =>{
          console.log(res)
      })
    }
  },

  created() {
    api.getUserAuth().then(res =>{
      this.state = res.data.isAuth
      this.real_name = res.data.userAuthInfo.real_name
      this.id_number = res.data.userAuthInfo.id_number
      this.user_income = res.data.userAuthInfo.user_income
      this.phone = res.data.userAuthInfo.phone
      this.channel_info = res.data.userAuthInfo.channel_info
      res.data.userIncomeList.forEach((element,index) => {
        this.options.push({label:element.income,value:element.income_type})
      })
    })
  }
  
}
</script>
<style  lang="scss" scoped type="text/css">
  .Title {
    font-size: 18px;
    color: #000;
    border-left: 4px solid #43b5f9;
    line-height: 22px;
    padding-left: 10px;
    font-weight: 400;
  }
  .centent {
    background-color: #fff;
    padding: 20px 12px;
    height: 310px;
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
  .PersonalData {
    padding: 5px 25px;
  }
  .PersonalData > div {
    padding: 12px 0;
  }
  .PersonalData > div > div {
    padding-left: 12px;
    color: #394853;
  }
  .PersonalData > div > span {
    font-size: 14px;
    line-height: 36px;
    color: #989898;
  }
  .name,
  .number {
    display: flex;
    justify-content: space-between;
    width: 400px;
  }
  .name > div {
    width: 323px;
    height: 36px;
    line-height: 36px;
    background-color: #f0f0f0;
    border-radius: 4px;
    text-align: left;
  }
  .number > div {
    width: 323px;
    height: 36px;
    line-height: 36px;
    color: #394853;
    background-color: #f0f0f0;
    border-radius: 4px;
    text-align: left;
  }
  .income {
    display: flex;
    justify-content: space-between;
    width: 241px;
  }
  .income > div {
    width: 173px;
    height: 36px;
  }
  .channel {
    display: flex;
    justify-content: space-between;
    width: 660px;
  }
  .channel > div {
    width: 586px;
    height: 36px;
    line-height: 36px;
    color: #394853;
    background-color: #f0f0f0;
    border-radius: 4px;
    text-align: left;
  }
  .update {
    width: 100%;
  }
  .update > span {
    width: 88px;
    height: 36px;
    background-color: #49a6f7;
    border-radius: 8px;
    font-size: 14px;
    line-height: 36px;
    color: #fff;
    cursor: pointer;
    float: right;
    text-align: center;
  }
  /* 弹窗 */
  .flex1 ,.flex2{
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 12px 0;
  }
  .flex-left{
    /* span */
    /* padding: 30px 20px; */
    color: #989898;
    font-size: 14px;
    line-height: 36px;
    width: 90px;
    margin-right: 15px;
  }
  .flex-right{
    display: flex;
    width: 100%;
  }
  .flex1 > input,.flex2 > input {
    width: 100%;
    border-radius: 4px;
    border: solid 1px #d3d3d3;
    padding: 10px;
  }

  /*.flex2 {
    display: flex;
    width: 100%;
    margin: 12px 0;
  }*/
  /*.flex2 > span {
    color: #989898;
    font-size: 14px;
    line-height: 36px;
    margin-right: 35px;
  }*/
  /*.flex2 > input {
    width: 525px;
    border-radius: 4px;
    border: solid 1px #d3d3d3;
    padding: 10px;
  }*/
  .textarea {
    display: flex;
    justify-content: space-between;
    width: 84%;
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
</style>