<template>
   <!-- 积分信息页面 -->
  <div class="Integral">
       <div class="vipimg">
            <img src="../assets/img/vip.png" alt="">
        </div>
      <div class="centent">
          <div class="centent-left">
              <h2 class="Title">扣分详情</h2>
              <div class="dynamic">
                  <div v-for="(item,index) in integral" :key="index">
                      <img class="somllicon" :src="item.coverimage.img1" alt="">
                      <div class="deduction">
                          <div><span class="large">扣除{{item.number}}积分</span><span class="samll">{{item.created_at}}</span></div>
                          <h2>{{item.content}}，被扣1积分</h2>
                      </div>
                  </div>
              </div>
          </div>
          <div class="centent-right">
              <h2 class="Title">扣分规则</h2>
              <div class="rule">
                  <ul v-for="(item,index) in rule" :key="index">
                      <li>{{item.content}}</li>
                  </ul>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import api from '../http/api'
console.log('积分')
export default {
  data() {
    return {
        integral:[],
        rule:[]
    };
  },
  methods:{

  },
  created(){
      //获取用户的积分扣分详情
      api.getUserIntegralLog().then(res =>{

          this.integral=res.data.data
        //   console.log(this.integral)
        //   console.log(this.integral.coverimage)
        //   this.integral.forEach(function(value, index, array){
        //              this.integral[index]=value*2;
        //              console.log(value)
        //     },this)
        //   var obj = JSON.parse(this.integral.coverimage);
        //   console.log(obj)
      })
      //获取用户的积分规则
      api.getIntegralRule().then(res =>{
          console.log(res.data)
          this.rule=res.data
          console.log(this.rule)
      })
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
.deduction{
    width: 486px;
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

