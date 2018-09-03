<template>
    <!-- 放单平台商品检测 -->
    <div class="LinkDetection">
         <div class="vipimg">
            <img src="../../assets/img/vip.png" alt="">
        </div>
        <div class="centent">
            <h2 class="Title">填写商品信息</h2>
            <div class="detection"><input type="text" v-model="link" placeholder="将商品链接粘贴于此"><span class="start" @click="Starttesting">开始测试</span></div>
            <div class="text">
                说明：<br/>
                1.正在显示推广的商品，不能重复提交<br/>
                2.等级低于4皇冠的C店不能提交<br/>
                3.店铺D.S.R店铺三绿,任一分数低于4.6的不能提交<br/>
                4.与描述相符分低于4.7分的商品不能提交
            </div>
            <div class="bottom">
                <span @click="go">下一步</span>
                <button @click="Backoff">取消</button>
            </div>
        </div>
    </div>
</template>
<script>
import api from '../../http/api'
export default {
  data() {
    return {
        link:'',
        query:{} 
    };
  },
 methods:{
      go: function() {
        this.$router.push({
            path: "/Flatfrom",           
            query:{link:this.link}
        });
         console.log(this.link)
         
      },
      Backoff: function() {
        this.$router.push({
            path: "/Submission",
            
        });
      },
      Starttesting:function(){
         let link=this.link;
         api.checklink({link}).then(res=>{
             console.log(res)
         })
      }
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
  height: 528px;
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
    cursor: pointer;
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
             