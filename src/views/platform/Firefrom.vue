<template>
    <!-- 平推表单 -->
    <div class="Firefrom right-content">
      <h2 class="Title">填写商品信息</h2>
      <div class="centent">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
          <el-form-item label="商品链接" prop="goodslink">
            <el-input v-model="ruleForm.goodslink" placeholder="" readonly></el-input>
          </el-form-item>
          <el-form-item label="短标题" prop="goodstitle">
            <el-input v-model="ruleForm.goodstitle" placeholder="将商品短标题输入于此"></el-input>
          </el-form-item>
          <el-form-item label="初始销量" prop="startsales">
            <el-input v-model="ruleForm.startsales" placeholder="0" class="medium" readonly></el-input>
          </el-form-item>
          <el-form-item label="开始时间" prop="begintimetype">
            <el-radio-group v-model="ruleForm.begintimetype">
              <el-radio :label="1">立即开始</el-radio>
              <el-radio :label="2">预约开始</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="时间" v-if="ruleForm.begintimetype==2">
            <el-date-picker
              v-model="ruleForm.begintime"
              type="datetime"
              placeholder="选择日期时间" :picker-options="ruleForm.endDateOpt" class="datetime">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="活动类型" prop="activitytype">
            <el-radio-group v-model="ruleForm.activitytype">
              <el-radio :label="0">无活动</el-radio>
              <el-radio :label="1">淘抢购</el-radio>
              <el-radio :label="2">聚划算</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="封面图" prop="coverimage">
            <el-upload
              class="avatar-uploader"
              :headers="uploadHeaders"
              :action="uploadUrl"
              :show-file-list="false"
              :limit="1"
              :before-upload="beforeAvatarUpload"
              :on-preview="handlePictureCardPreview"
              :on-exceed="handleExceed"
              :on-success="coverImage"
              :before-remove="beforeRemove"
              :on-remove="coverImageRemove"
              >
              <img v-if="ruleForm.coverimage" :src="ruleForm.coverimage" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <div class="el-upload__tip" slot="tip">要求：图片大小400*400px，干净清晰，突显产品,不能出现牛皮癣、大量文字</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="优惠券类型" prop="coupontype">
            <el-radio-group v-model="ruleForm.coupontype">
              <el-radio :label="2">阿里妈妈优惠券</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="券后价" prop="voucherprice">
            <el-input v-model="ruleForm.voucherprice" placeholder="0" class="medium"></el-input>元
          </el-form-item>
          <el-form-item label="优惠券总量" prop="coupontotal">
            <el-input v-model="ruleForm.coupontotal" placeholder="0" class="medium"></el-input>张
          </el-form-item>
          <el-form-item label="优惠券链接" prop="couponlink">
            <el-input v-model="ruleForm.couponlink" placeholder="将优惠券链接输入于此"></el-input>
          </el-form-item>
          <el-form-item label="佣金类型" prop="commissiontype">
            <el-radio-group v-model="ruleForm.commissiontype">
              <el-radio :label="1">通用</el-radio>
              <el-radio :label="2">定向</el-radio>
              <el-radio :label="3">鹊桥</el-radio>
              <el-radio :label="4">营销</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="佣金比率" prop="commissionrate">
            <el-input v-model="ruleForm.commissionrate" placeholder="0" class="medium"></el-input>%
          </el-form-item>
          <el-form-item label="文案主图" prop="copywritingimage">
            <el-upload
              class="avatar-uploader"
              :headers="uploadHeaders"
              :action="uploadUrl"
              :show-file-list="false"
              :limit="1"
              :before-upload="beforeAvatarUpload"
              :on-preview="handlePictureCardPreview"
              :on-exceed="handleExceed"
              :on-success="copyImage"
              :before-remove="beforeRemove"
              :on-remove="coverImageRemove"
              >
              <img v-if="ruleForm.copywritingimage" :src="ruleForm.copywritingimage" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <div class="el-upload__tip" slot="tip">要求：图片大小800*1200px，干净清晰，结构美观，突出产品卖点</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="导购文案" prop="copywriting">
            <el-input type="textarea" v-model="ruleForm.copywriting"></el-input>
          </el-form-item>
          <el-form-item label="二段文案图片" prop="copywritingimage2">
            <el-upload
              class="avatar-uploader"
              :headers="uploadHeaders"
              :action="uploadUrl"
              :show-file-list="false"
              :limit="1"
              :before-upload="beforeAvatarUpload"
              :on-preview="handlePictureCardPreview"
              :on-exceed="handleExceed"
              :on-success="copyWritingImage"
              :before-remove="beforeRemove"
              :on-remove="copyWritingImageRemove"
              >
              <img v-if="ruleForm.copywritingimage2" :src="ruleForm.copywritingimage2" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <div class="el-upload__tip" slot="tip">要求：图片大小800*1200px，干净清晰，结构美观，突出产品卖点</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="二段导购文案" prop="copywriting2">
            <el-input type="textarea" class="textarea-height" v-model="ruleForm.copywriting2"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交审核</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import api from '@/http/api'
import {formatDate,isURL} from '@/util/tool'
import {imgBaseUrl} from '@/util/env'
export default {
  data() {
    return {
      ruleForm: {
        goodslink: '',
        goodstitle: '',
        coverimage:'',
        // coverimage_url:'',
        commissiontype:'',
        commissionrate:'',
        copywriting:'',
        copywritingimage:'',
        // copywritingimage_url:'',
        copywriting2:'',
        copywritingimage2:'',
        // copywritingimage2_url:'',
        voucherprice:'',
        couponlink:'',
        coupontotal:'',
        begintime:'',
        begintimetype:'',
        endDateOpt: {
            disabledDate: (time) => {
              return time.getTime() < Date.now()
            }
        },
        coupontype:'',
        activitytype:'',
        startsales:''
      },
      rules: {
        goodslink: [
          { required: true, message: '请输入商品链接', trigger: 'blur' },
        ],
        begintimetype: [
          { required: true, message: '请选择开始时间', trigger: 'change' },
        ],
        coupontype: [
          { required: true, message: '请选择优惠券类型', trigger: 'change' }
        ],
        activitytype: [
          { required: true, message: '请选择活动类型', trigger: 'change' }
        ],
        coverimage: [
          { required: true, message: '请上传封面图', trigger: 'change' },
        ],
        copywritingimage: [
          { required: true, message: '请上传文案主图', trigger: 'change' },
        ],
        goodstitle: [
          { required: true, message: '请输入短标题', trigger: 'blur' },
        ],
        voucherprice: [
          { required: true, message: '请输入券后价', trigger: 'blur' },
          // { type: 'number', message: '券后价必须为数字值'}
        ],
        couponlink: [
          { required: true, message: '请输入优惠券链接', trigger: 'blur' },
        ],
        coupontotal: [
          { required: true, message: '请输入优惠券总量', trigger: 'blur' },
          // { type: 'number', message: '优惠券总量必须为数字值'}
        ],
        commissionrate: [
          { required: true, message: '请输入佣金比例', trigger: 'blur' },
          // { type: 'number', message: '佣金比例必须为数字值'}
        ],
        commissiontype: [
          { required: true, message: '请输入佣金类型', trigger: 'blur' },
        ],
        copywriting: [
          { required: true, message: '请输入导购文案', trigger: 'blur' },
        ],
        startsales: [
          { required: true, message: '请输入入库初始销量', trigger: 'change' },
        ],
        copywritingimage2: [
          { required: true, message: '请上传二段文案图片', trigger: 'change' },
        ],
        copywriting2: [
          { required: true, message: '请输入二段导购文案', trigger: 'blur' },
        ],
      },
      uploadUrl:'http://dev.ruomengtv.com/api/image/imageUpload?type=goods',
      dialogImageUrl: '',    
      dialogVisible: false,   
      filelist:[],
      uploadHeaders: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    };
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
    coverImage(response,file){
      // this.ruleForm.coverimage_url = URL.createObjectURL(file.raw)
      this.ruleForm.coverimage = imgBaseUrl+response.data.url
    },
    coverImageRemove(){
      this.ruleForm.coverimage =''
    },
    copyImage(response,file){
      // this.ruleForm.copywritingimage_url = URL.createObjectURL(file.raw)
      this.ruleForm.copywritingimage = imgBaseUrl+response.data.url
    },
    copyImageRemove(){
      this.ruleForm.copywritingimage =''
    },
    copyWritingImage(response,file){
      // this.ruleForm.copywritingimage2_url = URL.createObjectURL(file.raw)
      this.ruleForm.copywritingimage2 = imgBaseUrl+response.data.url
    },
    copyWritingImageRemove(){
      this.ruleForm.copywritingimage2 =''
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data=this.ruleForm
          console.log(data)
          if(data.begintimetype==1){
            data.begintime = formatDate(new Date(),'yyyy-MM-dd hh:mm:ss')
          }else{
            data.begintime = formatDate(data.begintime,'yyyy-MM-dd hh:mm:ss')
          }
          api.saveFire(data).then(res =>{
            if(res.code==0){
              this.$message.success('提交成功!')
            }else{
              this.$message.error('提交失败')
            }
          })
        } else {
          return false;
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created(){
    this.ruleForm.goodsid = this.getGoodsId
    this.ruleForm.goodslink = this.getGoodsLink
    // console.log(this.getGoodsId,this.getGoodsLink)
    if(this.getEditId>0){
      api.editView({id:this.getEditId}).then(res=>{
        if(res.code==0){
          res.data.coverimage = JSON.parse(res.data.coverimage)
          let copywritingimage = JSON.parse(res.data.copywritingimage)
          let copywriting = JSON.parse(res.data.copywriting)
          this.ruleForm = res.data
          console.log(this.ruleForm)
          this.ruleForm.id = this.getEditId
          //封面图
          // this.ruleForm.coverimage_url = this.ruleForm.coverimage.img1
          //文案相关
          this.ruleForm.coverimage = this.ruleForm.coverimage.main
          // this.ruleForm.copywritingimage_url = this.ruleForm.copywritingimage.img1
          this.ruleForm.copywritingimage = copywritingimage.first
          this.ruleForm.copywriting = copywriting.first
          //二段文案
          this.ruleForm.copywriting2 = copywriting.second
          this.ruleForm.copywritingimage2 = copywritingimage.second
          // this.ruleForm.copywritingimage2_url = copywritingimage.img2
        }
      })
    }else{
      this.ruleForm.coverimage = this.getGoodsCoverimg
      // this.ruleForm.coverimage_url = this.getGoodsCoverimg
      this.ruleForm.startsales = this.getGoodsSalecount
      this.ruleForm.goodsid = this.getGoodsId
      this.ruleForm.goodslink = this.getGoodsLink
    }
  },
  computed: {
    ...mapGetters([
      'getGoodsLink',
      'getGoodsId',
      'getEditId',
      'getGoodsSalecount',
      'getGoodsCoverimg'
    ]),
  }
};
</script>
<style lang="scss" scoped  type="text/css">
.Firefrom{
  .centent {
    background-color: #fff;
    padding: 20px;
  }

  .medium{
    margin-right: 5px;
    width: 100px;
  }
  .datetime{
    width: 220px;
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

}
</style>
             