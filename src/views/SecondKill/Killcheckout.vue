<template>
    <!-- 秒杀单检测页 -->
    <div class="Killcheckout">
         <h2 class="Title">商品链接测试</h2>
        <div class="centent">
            <div class="detection"><input type="text" placeholder="将商品链接粘贴于此"><span class="start" @click="checkout">开始测试</span></div>
            <div class="text">
                说明：<br/>
                1.正在显示推广的商品，不能重复提交<br/>
                2.等级低于4皇冠的C店不能提交<br/>
                3.店铺D.S.R店铺三绿,任一分数低于4.6的不能提交<br/>
                4.与描述相符分低于4.7分的商品不能提交
            </div>
            <div class="date">
                <div class="flex">
                     <h2 class="title">秒杀日期</h2>
                     <span>说明:为保证商品及优惠券有效性，只能预约近3天的秒杀</span>
                </div>

                <el-date-picker
                v-model="value1"
                type="date"
                placeholder="选择日期">
                </el-date-picker>
            </div>
            <div class="Second">
                <h2 class="title">秒杀场次</h2>
                <div class="site">
                    <el-radio v-model="radio" label="1">9点场</el-radio>
                    <el-radio v-model="radio" label="2">10点场</el-radio>
                    <el-radio v-model="radio" label="3">11点场</el-radio>
                    <el-radio v-model="radio" label="4">12点场</el-radio>
                    <el-radio v-model="radio" label="5">14点场</el-radio>
                    <el-radio v-model="radio" label="6">19点场</el-radio>
                    <el-radio v-model="radio" label="7">20点场</el-radio>
                    <el-radio v-model="radio" label="8">21点场</el-radio>
                </div>
            </div>
            <div class="bottom">
                <span @click="go">下一步</span>
                <button @click="cancel">取消</button>
            </div>
        </div>
    </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  import api from '../../http/api';
export default {
  data() {
    return {
        value1:'',
        radio:'1',
    };
  },
 methods:{
   //开始检测
   checkout:function(){
     api.Killcheckout().then((res) =>{
       console.log(res)


       /* if(res.code == 0){
          alert("检测成功，可以添加")
        }else{
          alert("检测失败，您可能已经添加或者放单资格达不到")
        }*/
     })
   } ,
     //下一步
      go: function() {
        this.$router.push({
            path: "/Secondfrom"
        });
      },
      //取消
      cancel: function() {
          console.log('取消')
          this.$router.push({
            path: "/Seconddata"
        });
      },
 }
};
</script>
<style scoped>
.vipimg {
  margin-bottom: 15px;
}
.centent {
  padding: 15px 10px;
  background-color: #fff;
  /* height: 528px; */
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
.centent .start{
    display: block;
    width: 110px;
    line-height: 38px;
    background-color: red;
    text-align: center;
    color: #fff;
    border-bottom-right-radius: 20px;
    border-top-right-radius: 20px;
}
.detection{
    display: flex;
    margin: 25px auto;
    width: 60%;
    justify-content: space-between;
}
.detection>input{
    width: 423px;
    height: 35px;
    border-bottom-left-radius: 20px;
    border-top-left-radius: 20px;
    border: 1px solid #eee;
    background-color: #f4f4f4;
    padding-left: 30px;
    outline: none;
}
.text{
    width: 60%;
    margin: 0 auto;
    font-size: 14px;
    color: #afafaf;
    line-height: 24px;
}
.date{
    width: 60%;
    margin: 10px auto;
}
.flex{
    display: flex;
    justify-content: space-between;
}
.title{
    color: #2d203c;
    font-size: 14px;
    margin: 20px 0;
}
.flex>span{
    color: #d0d0d0;
    font-size: 14px;
    margin: 20px 0;
}
.Second{
    margin-left: 20%;
}
.site{
    display: flex;
}
.bottom{
    margin-top: 110px;
    padding-top: 25px;
    border-top:1px solid #eee;
    position: relative;
}
.bottom>span{
    display: block;
    width: 110px;
    line-height: 38px;
    background-color: red;
    text-align: center;
    color: #fff;
    margin: 0 auto;
    border-radius: 6px;
    cursor: pointer;
}
.bottom>button{
    position: absolute;
    right: 40px;
    bottom: 6px;
    width: 68px;
    height: 28px;
    border-radius: 4px;
    background-color: #fff;
    border: solid 1px #a4a4a4;
    text-align: center;
    cursor: pointer;
}

</style>
