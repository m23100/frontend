<template>
  <div class="Personal">
    <div class="archives">
      <h2 class="Title">头像</h2>
      <div class="Photo">
        <el-upload
          class="avatar-uploader"
          :headers="uploadHeaders"
          action="http://dev.ruomengtv.com/api/image/imageUpload?type=user"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="avatar" :src="avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>    
    </div>
    <div class="centent">
      <h2 class="Title">基本资料</h2>
      <div class="PersonalData">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
          <el-form-item label="昵称" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入昵称"></el-input>
          </el-form-item>
          <el-form-item label="签名" prop="signature">
            <el-input v-model="ruleForm.signature" placeholder="请输入签名"></el-input>
          </el-form-item>
          <el-form-item label="城市" prop="options2" class="is-required">
            <el-cascader
              :options="options2"
              @active-item-change="handleItemChange"
              @change="handleChange"
              :props="props"
              :value="value"
              v-model="city_name"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="QQ" prop="qq">
            <el-input v-model="ruleForm.qq" placeholder="请输入对外公开的联系QQ"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>              
      </div>
    </div>
  </div>
</template>
<script>
 import api from '@/http/api' 
import {imgBaseUrl} from '@/util/env'
 export default {
    data() {
      return {
        options2: [],
        value: [],
        input: '',
        props:{
          value:'label',
          children:'cities'
        },
        province_id:0,
        city_id: 0,
        avatar:'',
        avatar_url:'',
        city_name:[],
        uploadHeaders: {Authorization: `Bearer ${localStorage.getItem('token')}`},
        ruleForm:{
          name: '',
          signature:'',
          qq:'',
          city:[]
        },
        rules:{
          name: [
            { required: true, message: '请输入昵称', trigger: 'blur' },
          ],
          signature: [
            { required: true, message: '请输入签名', trigger: 'blur' },
          ],
          qq: [
            { required: true, message: '请输入QQ', trigger: 'blur' },
          ],
        }
      }
    },
    methods: {
      handleItemChange(val) {
        this.options2.forEach((item,index) => {
          if(item.label==val[0]){
            api.getCity({'province_id':item.value}).then(res =>{
              res.data.forEach(element => {
                this.options2[index].cities.push({label:element.name,value:element.id})
              })
            })
          }
        })
      },
      handleChange(val,selectedData){
        console.log(selectedData)
        this.options2.forEach((item,index) => {
          if(item.label==val[0]){
            this.province_id = item.value
            item.cities.forEach((citem,cindex)=>{
              if(citem.label==val[1]){
                this.city_id = citem.value
              }
            })
          }
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if(this.city_id<1|| this.province_id<1){
            this.$refs.ruleForm.fields[2].error="请选择城市"
            return false
          }
          if (valid) {
            if(this.city_id<1|| this.province_id<1){
              this.$refs.ruleForm.fields[2].error="请选择城市"
              return false
            }
            let data={
              name:this.ruleForm.name,
              signature:this.ruleForm.signature,
              province_id:this.province_id,
              city_id:this.city_id,
              qq:this.ruleForm.qq,
              avatar:this.avatar
            }
            api.userEditInfo(data).then(res =>{
              if(res.code==0){
                this.$message.success('提交成功!')
                this.$router.go(0)
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
      },
      handleAvatarSuccess(res, file) {
        // this.avatar_url = 'http://image.ruomengtv.com/'+res.data.url
        this.avatar = imgBaseUrl + res.data.url//URL.createObjectURL(file.raw);
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
    },
    created() {
      //获取省份信息
      api.getProvince().then(res =>{
        res.data.forEach(element => {
          this.options2.push({label:element.name,cities:[],value:element.id})
        })
      })

      //获取用户信息
      api.getUserInfo().then(res=>{
        this.ruleForm.name = res.data.name
        this.ruleForm.signature = res.data.signature
        this.province_id = res.data.province_id
        this.city_id = res.data.city_id
        this.ruleForm.qq = res.data.qq
        this.avatar = res.data.avatar
        this.avatar_url = imgBaseUrl+res.data.avatar
        this.city_name = [res.data.province.name,res.data.city.name]
        if(this.city_id > 0){
          this.options2.forEach((item,index) => {
            if(item.value==this.province_id){
              api.getCity({'province_id':item.value}).then(res =>{
                res.data.forEach(element => {
                  this.options2[index].cities.push({label:element.name,value:element.id})
                })
              })
            }
          })
        }
      })

      if(this.city_id > 0){
        this.options2.forEach((item,index) => {
          if(item.value==this.province_id){
            api.getCity({'province_id':item.value}).then(res =>{
              res.data.forEach(element => {
                this.options2[index].cities.push({label:element.name,value:element.id})
              })
            })
          }
        })
      }
    },
  };
</script>
<style scoped>

.Title {
  font-size: 18px;
  color: #000;
  border-left: 4px solid #43b5f9;
  line-height: 22px;
  padding-left: 10px;
  font-weight: 400;
  margin-bottom: 25px;
}
.Photo {
  margin-left: 60px;
  height: 174px;
  position: relative;
}

/* lk */
.centent {
  background-color: #fff;
  padding: 20px 12px;
  height: 330px;
  border-top: 1px solid #eee;
}
.el-input{
  background-color: #f0f0f0;
  border-radius: 4px;
}
.archives{
  background-color: #fff;
}
.Personalspan{
  width:50px;
  font-size: 14px;
  line-height: 36px;
  color: #989898;
}
.Personalright{
  width:  100%
}
.el-input__inner{
  height: 35px;
  line-height: 35px;
  background-color: #f0f0f0;
  border-radius: 4px;
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>