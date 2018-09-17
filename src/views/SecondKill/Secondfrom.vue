<template>
    <!-- 平推表单 -->
    <div class="Firefrom">
      <h2 class="Title">填写秒杀商品信息</h2>
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
          <el-form-item
            v-for="(item, index) in ruleForm.keyword"
            :label="'产品关键词'"
            :key="item.key"
            :prop="'keyword.' + index + '.value'"
            :rules="[{
              required: true, message: '关键词不能为空', trigger: 'blur'
            },

            { min: 2, max: 6, message: '每个关键词2到6个字符', trigger: 'blur' }]"
          >
            <el-input v-model="item.value" class="mini-keyword"></el-input>
            <el-button @click="addKeyword" v-if="index==0" type="primary" icon="el-icon-circle-plus" circle></el-button>

            <el-button @click.prevent="removeKeyword(item)" v-if="index>1"type="primary" icon="el-icon-remove" circle></el-button>
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
          <el-form-item label="券面额" prop="couponmoney">
            <el-input v-model="ruleForm.couponmoney" placeholder="0" class="medium"></el-input>元
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
          <el-form-item label="文案主图" prop="copywritingimage_url">
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
              :before-remove="copyImageRemove"
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
          <el-form-item label="完整秒杀文案" prop="content">
            <el-input type="textarea" v-model="ruleForm.content"></el-input>
          </el-form-item>
          <el-form-item label="朋友圈文案" prop="friends">
            <el-input type="textarea" v-model="ruleForm.friends"></el-input>
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
import {imgBaseUrl} from '@/util/env'
export default {
  data() {
    return {
      ruleForm: {
        goodslink: '',
        goodstitle: '',
        coverimage:'',
        coverimage:'',
        commissiontype:'',
        commissionrate:'',
        copywriting:'',
        copywritingimage:'',
        // copywritingimage_url:'',
        voucherprice:'',
        couponlink:'',
        coupontotal:'',
        begintime:'',
        begintimetype:'',
        coupontype:'',
        activitytype:'',
        startsales:'',
        couponmoney:'',
        keyword:[{key:1,value: ''},{key:2,value: ''}],
        startdate:'',
        startfield:'',
        content:'',
        friends:''
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
        couponmoney:[
          { required: true, message: '请输入券面额', trigger: 'change' },
        ],
        content:[
          { required: true, message: '请输入完整秒杀文案', trigger: 'change' },
        ],
        friends:[
          { required: true, message: '请输入朋友圈文案', trigger: 'change' },
        ],
      },
      uploadUrl:'http://dev.ruomengtv.com/api/image/imageUpload?type=goods',
      uploadHeaders: {Authorization: `Bearer ${localStorage.getItem('token')}`},
      startdate:''
    };
  },

  methods: {
    handlePictureCardPreview(file) {
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(this.ruleForm)
        if (valid) {
          let data=this.ruleForm
          console.log(data)
          // if(data.begintimetype==1){
            // data.begintime = formatDate(new Date(),'yyyy-MM-dd hh:mm:ss')
          // }else{
          // }
          api.saveKillGood(data).then(res =>{
            if(res.code==0){
              this.$message.success('提交成功!')
            }else{
              this.$message.error('提交失败'+res.msg)
            }
          })
        } else {
          return false;
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    addKeyword(){
      if(this.ruleForm.keyword.length<5){
        this.ruleForm.keyword.push({
          value: '',
          key: this.ruleForm.keyword.length+1
        });
      }
      
    },
    removeKeyword(item) {
      var index = this.ruleForm.keyword.indexOf(item)
      if (index !== -1) {
        this.ruleForm.keyword.splice(index, 1)
      }
    },
  },
  created(){
    if(this.getEditId>0){
      api.getKillGoodInfo({id:this.getEditId}).then(res=>{
        if(res.code==0){
          res.data.coverimage = JSON.parse(res.data.coverimage)
          let copywritingimage = JSON.parse(res.data.copywritingimage)
          let copywriting = JSON.parse(res.data.copywriting)
          this.ruleForm = res.data
          this.ruleForm.id = this.getEditId
          this.ruleForm.coverimage = this.ruleForm.coverimage.main
          this.ruleForm.copywritingimage = copywritingimage.first
          this.ruleForm.copywriting = copywriting.first
        }else{
          this.$router.push({
              path: "/killcheckout"
          })
        }
      })
    }//else{
      this.ruleForm.goodsid = this.getGoodsId
      this.ruleForm.goodslink = this.getGoodsLink
      this.ruleForm.startdate = this.getGoodsDate
      this.startdate = this.getGoodsDate
      this.ruleForm.startfield = this.getGoodsTime
      this.ruleForm.coverimage = this.getGoodsCoverimg
      this.ruleForm.startsales = this.getGoodsSalecount
    //}
    
    // console.log(this.getGoodsId,this.getGoodsLink,this.getGoodsDate,this.getGoodsTime)
    console.log(this.ruleForm.goodsid,this.ruleForm.goodslink,this.ruleForm.startdate,this.ruleForm.startfield,this.ruleForm.startsales,this.ruleForm.coverimage)
    if(this.ruleForm.goodsid<1 || this.ruleForm.goodslink=='' || this.ruleForm.startdate=='' || this.ruleForm.startfield==''){
      this.$router.push({
          path: "/killcheckout"
      })
    }
  },
  computed: {
    ...mapGetters([
      'getGoodsLink',
      'getGoodsId',
      'getEditId',
      'getGoodsTime',
      'getGoodsDate',
      'getGoodsSalecount',
      'getGoodsCoverimg'
    ])
  }
};
</script>
<style lang="scss" scoped  type="text/css">
.Firefrom{
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
  .centent {
    background-color: #fff;
    padding: 20px;
  }
  .el-input{
    display: inline-block;
    width: 423px;
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
  .mini{
    width: 80px;
  }
  .mini-keyword{
    width: 140px;
  }
  
}
</style>
             