<template>
   <!-- 秒杀数据 -->
  <div class="Seconddata">
      <div class="navdata">
          <h2 class="Title">秒杀数据</h2>
          <div class="dataimg">
              <div class="data1"><h1>{{this.Number.killConductNumber}}</h1><h4>正在秒杀中</h4></div>
              <div class="data2"><h1>{{this.Number.killSubmissionNumber}}</h1><h4>已提交</h4></div>
              <div class="data3"><h1>{{this.Number.killRefuseNumber}}</h1><h4>被审拒</h4></div>
              <div class="data4"><h1>{{this.Number.killWaitNumber}}</h1><h4>待审核中</h4></div>
          </div>
      </div>
      <div class="centent">
          <div class="centent-left">
              <h2 class="Title">审核动态</h2>
              <div class="dynamic">
                  <div class="flex left-list" v-for="(item,index) in DataDynamic" :key="index">
                      <h1>商品[<span class="blue">{{item.title}}</span>]{{item.state}}</h1>
                      <div>{{item.created_at}}</div>
                  </div>
              </div>
          </div>
          <div class="centent-right">
              <h2 class="Title">秒杀规则</h2>
              <div class="rule">
                  <ul v-for="(item,index) in Rule" :key="index">
                      <li>{{item.content}}</li>
                  </ul>
              </div>
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
        Number:{},
        Rule:[],
        DataDynamic:[]
      }
    },
    created(){

      //获取秒杀平台的用户数据
        api.GetKillnum().then(res =>{
          this.Number = res.data;
        }),

          //获取秒杀平台的规则
        api.getKillRule().then(res=>{
          this.Rule = res.data.data;
        }),

          //获取秒杀平台的审核动态
          api.getKillDataDynamic().then(res=>{
            this.DataDynamic = res.data.data;
          })
      },
    computed: {
      ...mapGetters([
        'getAccountFunds',
      ]),
    }
  };
</script>
<style scoped>
.flex{
    display: flex;
    justify-content: space-between;
}
.Seconddata {
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
    background: url("../../assets/img/data1.png") no-repeat;
    background-size: 100% 100%;
}
.dataimg .data2{
    background: url("../../assets/img/data2.png") no-repeat;
    background-size: 100% 100%;
}
.dataimg .data3{
    background: url("../../assets/img/data3.png") no-repeat;
    background-size: 100% 100%;
}
.dataimg .data4{
    background: url("../../assets/img/data4.png") no-repeat;
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

