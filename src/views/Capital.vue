<template>
   <!-- 账户资金 -->
  <div class="Capital">
      <div class="navdata">
          <h2 class="Title">我都点券</h2>
          <div class="dataimg">
              <div class="data1"><h1>10000</h1><h4>可以点券</h4></div>
              <div class="data2"><h1>200</h1><h4>今日已使用</h4></div>
              <div class="data3"><h1>3600</h1><h4>单月共用</h4></div>
              <div class="data4"><h1 style="margin-top:28px;">充值</h1></div>
          </div>
      </div>
      <div class="centent">
          <div class="centent-left">
              <h2 class="Title">消费记录</h2>
              <div class="dynamic">
                  <div class="flex left-list">
                      <h1>商品[<span class="blue">【天堂伞】防紫外线折叠晴雨两用伞</span>]发布成功，使用100点券</h1>
                      <div>2018-05-18</div>
                  </div>
                  <div class="flex left-list">
                      <h1>商品[<span class="blue">仙醇兰花香铁观音盒装250g</span>]发布成功，使用100点券</h1>
                      <div>2018-05-18</div>
                  </div>
                  <div class="flex left-list">
                      <h1>商品[<span class="blue">【天堂伞】防紫外线折叠晴雨两用伞</span>]发布成功，使用100点券</h1>
                      <div>2018-05-18</div>
                  </div>
                  <div class="flex left-list">
                      <h1>商品[<span class="blue">仙醇兰花香铁观音盒装250g</span>]发布成功，使用100点券</h1>
                      <div>2018-05-18</div>
                  </div>
                  <div class="flex left-list">
                      <h1>商品[<span class="blue">【天堂伞】防紫外线折叠晴雨两用伞</span>]发布成功，使用100点券</h1>
                      <div>2018-05-18</div>
                  </div>
                  <div class="flex left-list">
                      <h1>商品[<span class="blue">仙醇兰花香铁观音盒装250g</span>]发布成功，使用100点券</h1>
                      <div>2018-05-18</div>
                  </div>
                  <div class="flex left-list">
                      <h1>商品[<span class="blue">【天堂伞】防紫外线折叠晴雨两用伞</span>]发布成功，使用100点券</h1>
                      <div>2018-05-18</div>
                  </div>
                  <div class="flex left-list">
                      <h1>商品[<span class="blue">仙醇兰花香铁观音盒装250g</span>]发布成功，使用100点券</h1>
                      <div>2018-05-18</div>
                  </div>
                  <div class="flex left-list">
                      <h1>商品[<span class="blue">【天堂伞】防紫外线折叠晴雨两用伞</span>]发布成功，使用100点券</h1>
                      <div>2018-05-18</div>
                  </div>
              </div>
          </div>
          <div class="centent-right">
              <h2 class="Title">充值记录</h2>
              <div class="rule">
                  <ul>
                      <li><span>成功充值1000元</span><span class="span">2018-05-18</span></li>
                     <li><span>成功充值1000元</span><span class="span">2018-05-18</span></li>
                     <li><span>成功充值1000元</span><span class="span">2018-05-18</span></li>
                     <li><span>成功充值1000元</span><span class="span">2018-05-18</span></li>
                     <li><span>成功充值1000元</span><span class="span">2018-05-18</span></li>
                     <li><span>成功充值1000元</span><span class="span">2018-05-18</span></li>
                  </ul>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style scoped>
.flex{
    display: flex;
    justify-content: space-between;      
}
.Capital {
}
.navdata {
  background-color: #fff;
  width: 98%;
  padding: 18px 12px;
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
.dataimg {
  margin: 16px 14px;
  display: flex;
}
.dataimg > div {
  width: 223px;
  height: 118px;
  text-align: center;
}
.dataimg > div h1 {
  margin: 24px 0 6px 0;
  font-size: 34px;
  color: #FFF;
  font-family: "微软雅黑";
  font-weight: 400;
}
.dataimg > div h4 {
  font-size: 12px;
  color: #FFF;
  font-weight: 400;
}
.dataimg .data1{
    background: url("../public/img/capital1.png") no-repeat;
    background-size: 100% 100%;
}
.dataimg .data2{
    background: url("../public/img/capital2.png") no-repeat;
    background-size: 100% 100%;
}
.dataimg .data3{
    background: url("../public/img/capital3.png") no-repeat;
    background-size: 100% 100%;
}
.dataimg .data4{
    background: url("../public/img/capital4.png") no-repeat;
    background-size: 100% 100%;
}
.centent{
    display: flex;
    margin: 40px 0 25px 0;
}
.centent-left{
    width: 62%;
    margin-right: 20px;
}
.dynamic{
    display: block;
    padding: 0 21px 0 25px;
    background-color: #fff;
}
.dynamic .flex>h1{
     font-size: 12px;
     line-height: 46px;     
}
.dynamic .flex>div{
     font-size: 12px;
     line-height: 46px;     
}
.flex .blue{
    color: #49a6f7;
    cursor: pointer;
}
.left-list{
     border-bottom: 1px solid #f4f4f4;
}
.centent-right{
    width: 38%;
}
.rule{
    display: block;
    padding: 16px 16px 16px 45px;
    background-color: #fff;
    height: 83%;
}
.rule ul li{
    margin: 20px 0;
    font-size: 12px;
    color: #3c3c3c;
    list-style-type:disc;
}
.rule .span{
    margin-left: 120px;
}
</style>

