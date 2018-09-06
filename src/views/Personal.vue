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
          <img v-if="avatar_url" :src="avatar_url" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>    
    </div>
    <div class="centent">
      <h2 class="Title">基本资料</h2>
      <div class="PersonalData">
        <div class="Personalcol">
          <div class="Personalspan">昵称</div>
          <div class="Personalright">
            <el-input v-model="name" placeholder="请输入昵称"></el-input>
        </div>
        </div>
        <div class="Personalcol">
          <div class="Personalspan">签名</div>
          <div class="Personalright">
            <el-input v-model="signature" placeholder="请输入签名"></el-input>
          </div>
        </div>
        <div class="Personalcol">
          <div class="Personalspan">城市</div>
          <div class="Personalright">
            <el-cascader
              :options="options2"
              @active-item-change="handleItemChange"
              @change="handleChange"
              :props="props"
              :value="value"
              :load-data="loadData"
              v-model="city_name"
            ></el-cascader>
          </div>
        </div>
        <div class="Personalcol">
          <div class="Personalspan">QQ</div>
          <div class="Personalright">
            <el-input v-model="qq" placeholder="输入对外公开的联系QQ"></el-input>
          </div>
        </div>                
      </div>
      <div class="update">
        <span @click="save">保存</span>
      </div>
    </div>
  </div>
</template>
<script>
 import api from '../http/api' 
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
        qq:'',
        name:'',
        signature:'',
        avatar:'',
        avatar_url:'',
        city_name:[],
        uploadHeaders: {Authorization: `Bearer ${localStorage.getItem('token')}`}
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
      save(){
        let data={
          name:this.name,
          signature:this.signature,
          province_id:this.province_id,
          city_id:this.city_id,
          qq:this.qq,
          avatar:this.avatar
        }
        api.userEditInfo(data).then(res =>{
            console.log(res.data)
        })
      },
      handleAvatarSuccess(res, file) {
        this.avatar_url = 'http://image.ruomengtv.com/'+res.data.url
        this.avatar = res.data.url//URL.createObjectURL(file.raw);
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
      loadData(item){
        console.log(item)
        console.log(this.city_id)
      }
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
        this.name = res.data.name
        this.signature = res.data.signature
        this.signature = res.data.signature
        this.province_id = res.data.province_id
        this.city_id = res.data.city_id
        this.qq = res.data.qq
        this.avatar = res.data.avatar
        this.avatar_url = 'http://image.ruomengtv.com/'+res.data.avatar
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
.Capital {
}
.archives {
  padding: 20px 10px;
  background-color: #fff;
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
.Photo {
  margin-left: 60px;
  height: 174px;
  position: relative;
}

.baocun {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 70px;
  height: 36px;
  background-color: #49a6f7;
  border-radius: 4px;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
  text-align: center;
  line-height: 36px;
}
/* lk */
.centent {
  background-color: #fff;
  padding: 20px 12px;
  height: 330px;
  border-top: 1px solid #eee;
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
  /* padding: 12px 0; */
}
.PersonalData > div > div {
  /* padding-left: 12px; */
  /* color: #394853; */
}
.PersonalData > div > span {
  font-size: 14px;
  line-height: 36px;
  color: #989898;
}
.Personalcol{
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  width: 70%;
}
.el-input{
  background-color: #f0f0f0;
  border-radius: 4px;
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

/* .number {
  display: flex;
  justify-content: space-between;
  width: 500px;
} */
/* .name > div {
  width: 163px;
  height: 36px;
  line-height: 36px;
  background-color: #f0f0f0;
  border-radius: 4px;
  text-align: left;
}
.number > div {
  width: 423px;
  height: 36px;
  line-height: 36px;
  color: #394853;
  background-color: #f0f0f0;
  border-radius: 4px;
  text-align: left;
} */
/* .income {
  display: flex;
  justify-content: space-between;
  width: 238px;
} */
/* .income > div {
  width: 173px;
  height: 36px;
} */
/* .channel {
  display: flex;
  justify-content: space-between;
  width: 380px;
} */
/* .channel > div {
  width: 306px;
  height: 36px;
  line-height: 36px;
  color: #394853;
  background-color: #f0f0f0;
  border-radius: 4px;
  text-align: left;
} */
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