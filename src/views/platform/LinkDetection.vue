<template>
    <div class="LinkDetection">
         <div class="vipimg">
            <img src="../../public/img/vip.png" alt="">
        </div>
        <div class="centent">
            <h2 class="Title">商品链接检测</h2>
            <div class="detection"><input type="text" placeholder="将商品链接粘贴于此"><span class="start">开始测试</span></div>
            <div class="text">
                说明：<br/>
                1.正在显示推广的商品，不能重复提交<br/>
                2.等级低于4皇冠的C店不能提交<br/>
                3.店铺D.S.R店铺三绿,任一分数低于4.6的不能提交<br/>
                4.与描述相符分低于4.7分的商品不能提交
            </div>
            <div class="bottom">
                <span>下一步</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },
 methods:{
      go: function() {
      this.$router.push({
        path: ""
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
</style>
             