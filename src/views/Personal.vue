<template>
  <div class="Personal">
      <div class="archives">
          <h2 class="Title">头像</h2>
          <div class="Photo">
              <div></div>
              <h2>修改</h2>
              <span class="baocun">保存</span>
          </div>
          
      </div>
      <div class="centent">
              <h2 class="Title">认证信息</h2>
            <div class="PersonalData">
                <div class="Personalcol">
                    <div class="Personalspan">昵称</div>
                    <div class="Personalright">
                      <el-input v-model="input" placeholder="请输入内容"></el-input>
                    </div>
                </div>
                 <div class="Personalcol">
                    <div class="Personalspan">签名</div>
                    <div class="Personalright">
                      <el-input v-model="input" placeholder="请输入内容"></el-input>
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
                      ></el-cascader>
                    </div>
                </div>
                <div class="Personalcol">
                    <div class="Personalspan">QQ</div>
                    <div class="Personalright">
                      <el-input v-model="input" placeholder="请输入内容"></el-input>
                    </div>
                </div>                
            </div>
            <div class="update">
                <span>保存</span>
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
        value: '',
        input: '',
        props:{
          value:'id',
          // pid:'id',
          label:'name',
          children:'cities'
        }
      }
    },
     methods: {
      handleItemChange(val) {
        console.log('active item:', val);
        api.getCity({'province_id':val[0]}).then(res =>{
          this.options2.forEach((item,index) => {
            if(item.id==val[0]){
              res.data.forEach(element => {
                this.options2[index].cities.push({label:element.name})
              })
            }
          })
        
        })
      },
      handleChange(val){
        console.log('dsfaddddaaaaaassssssssssssssss',val)
      }
    },
    created() {
        //获取省份信息
        api.getProvince().then(res =>{
            //this.options2= res.data
          res.data.forEach(element => {
            this.options2.push({label:element.name,cities:[],id:element.id})
          })
          console.log(this.options2)
        })
       
    }
  };
</script>
<style>
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
.Photo > div {
  width: 144px;
  height: 144px;
  border-radius: 50%;
  background-color: #ebebeb;
  float: left;
}
.Photo > h2 {
  float: left;
  margin: 57px 0 0 50px;
  color: #43b5f9;
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
</style>