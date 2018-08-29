<template>
   <!-- 首页 -->
  <div class="Home">
      <div class="navdata">
          <h2 class="Title">实时数据</h2>
          <div class="dataimg">
              <div class="data1"><h1>{{getUserData.realdata.shelfCount}}</h1><h4>当前正常在架</h4></div>
              <div class="data2"><h1>{{getUserData.realdata.todayCreate}}</h1><h4>今日已提交</h4></div>
              <div class="data3"><h1>{{getUserData.realdata.todayRefuse}}</h1><h4>今日被审拒</h4></div>
              <div class="data4"><h1>{{getUserData.realdata.waitAudit}}</h1><h4>等待审核中</h4></div>
          </div>
      </div>
      <div class="centent">
          <div class="centent-left">
              <h2 class="Title">审核动态</h2>
              <div class="dynamic">
                  <div class="flex left-list" v-for="(item,index) in getUserData.auditdata" :key="index">
                      <h1>商品[<span class="blue">{{item.title}}</span>]{{item.state}}</h1>
                      <div>{{item.created_at}}</div>
                  </div>
                  
              </div>
          </div>
          <div class="centent-right">
              <h2 class="Title">公告</h2>
              <div class="rule">
                  <ul>
                      <li v-for="(item,index) in getUserData.advertdata" :key="index">{{item.title}}</li>
                  </ul>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  
  export default {
    data(){
      return {
      }
    },
    created() {
        if (this.getUserData.length == 0) {
            this.$store.dispatch('getUserData')
        }
    },
    computed: {
      ...mapGetters([
        'getUserData'
      ])
    }
  };
</script>
<style scoped>
.flex{
    display: flex;
    justify-content: space-between;      
}
.Home {

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
    background: url("../assets/img/data1.png") no-repeat;
    background-size: 100% 100%;
}
.dataimg .data2{
    background: url("../assets/img/data2.png") no-repeat;
    background-size: 100% 100%;
}
.dataimg .data3{
    background: url("../assets/img/data3.png") no-repeat;
    background-size: 100% 100%;
}
.dataimg .data4{
    background: url("../assets/img/data4.png") no-repeat;
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

