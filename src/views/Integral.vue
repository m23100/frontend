<template>
   <!-- 积分信息页面 -->
  <div class="Integral">
       <div class="vipimg">
            <img src="../public/img/vip.png" alt="">
        </div>
      <div class="centent">
          <div class="centent-left">
              <h2 class="Title">扣分详情</h2>
              <div class="dynamic">
                  <div>
                      <img class="somllicon" src="../public/img/qier.jpg" alt="">
                      <div class="deduction">
                          <div><span class="large">扣除一分</span><span class="samll">2018-05-28</span></div>
                          <h2>【蚨布斯】新款夏季短袖t恤男士打底衫，因该商品：标题描述与商品实情不符 ，被扣1积分</h2>
                      </div>
                  </div>
                  <div>
                      <img class="somllicon" src="../public/img/qier.jpg" alt="">
                      <div class="deduction">
                          <div><span class="large">扣除一分</span><span class="samll">2018-05-28</span></div>
                          <h2>【蚨布斯】新款夏季短袖t恤男士打底衫，因该商品：标题描述与商品实情不符 ，被扣1积分</h2>
                      </div>
                  </div>
                  <div>
                      <img class="somllicon" src="../public/img/qier.jpg" alt="">
                      <div class="deduction">
                          <div><span class="large">扣除一分</span><span class="samll">2018-05-28</span></div>
                          <h2>【蚨布斯】新款夏季短袖t恤男士打底衫，因该商品：标题描述与商品实情不符 ，被扣1积分</h2>
                      </div>
                  </div>
                  <div>
                      <img class="somllicon" src="../public/img/qier.jpg" alt="">
                      <div class="deduction">
                          <div><span class="large">扣除一分</span><span class="samll">2018-05-28</span></div>
                          <h2>【蚨布斯】新款夏季短袖t恤男士打底衫，因该商品：标题描述与商品实情不符 ，被扣1积分</h2>
                      </div>
                  </div>
              </div>
          </div>
          <div class="centent-right">
              <h2 class="Title">扣分规则</h2>
              <div class="rule">
                  <ul>
                      <li>总分为20分，积分减为0时，将失去提交功能</li>
                      <li>价格、佣金不对 扣3分</li>
                      <li>主图不对  扣1分</li>
                      <li>券名出现敏感词 扣1分</li>
                      <li>标题描述与商品实情不符 扣1分</li>
                      <li>预约时间不符 扣2分</li>
                      <li>优惠券链接与商品不对应 扣3分</li>
                      <li>恶意撬单 扣5分</li>
                      <li>出现商家拉人短信、卡片 扣3分</li>
                      <li>损害平台利益扣 20分</li>
                      <li>其他  酌情扣分</li>
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
.vipimg {
  margin-bottom: 15px;
}

.centent{
    display: flex;
    margin: 40px 0 25px 0;
}
.centent-left{
    width: 64%;
    margin-right: 20px;
}
.dynamic{
    display: block;
}
.dynamic>div{
    background-color: #fff;
    padding: 14px 18px;
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;
}
.somllicon{
    width: 72px;height: 72px;
    background-size: 100%;
}
.deduction>h2{
    font-size: 12px;
    color: #394853;
    margin-top: 10px;
    font-weight: 400;
}
.deduction>div{
    display: flex;
    justify-content: space-between;
}
.large{
    font-size: 14px;
    line-height: 22px;
    color: #394853;
}
.samll{
    font-size: 12px;
    line-height: 22px;
    color: #394853;
}
.centent-right{
    width: 36%;
}
.rule{
    display: block;
    padding: 16px 2px 16px 45px;
    background-color: #fff;
    height: 83%;
}
.rule ul li{
    margin: 20px 0;
    font-size: 12px;
    color: #3c3c3c;
    list-style-type:disc;
}
</style>

