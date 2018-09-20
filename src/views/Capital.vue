<template>
   <!-- 账户资金 -->
  <div class="Capital">
      <div class="navdata">
          <h2 class="Title">我的点券</h2>
          <div class="dataimg">
              <div class="data1"><h1>{{Voucher.userVoucherNumber}}</h1><h4>可用点券</h4></div>
              <div class="data2"><h1>{{Voucher.dayNumer}}</h1><h4>今日已使用</h4></div>
              <div class="data3"><h1>{{Voucher.mouthNumber}}</h1><h4>当月已使用</h4></div>
              <div class="data4"><h1 style="margin-top:28px;">充值</h1></div>
          </div>
      </div>
      <div class="centent">
          <div class="centent-left">
              <h2 class="Title">充值/消费记录</h2>
              <div class="dynamic">
                <div class="flex left-list" v-for="(item,index) in capital" :key="index">
                    <h1 v-if="item.status==0">商品[<span class="blue">{{item.goodstitle}}</span>]发布成功，使用{{item.number}}点券</h1>
                    <h1 v-if="item.status==1">商品[<span class="blue">{{item.goodstitle}}</span>]审核被拒，退回{{item.number}}点券</h1>
                    <h1 v-if="item.status==2">充值{{item.number}}点券</h1>
                    <h1 v-if="item.status==3">扣除{{item.number}}点券,原因：{{item.content}}</h1>
                    <div>{{item.created_at}}</div>
                </div>
                <div class="pagination">
                  <el-pagination
                    @current-change="handleCurrentChange"
                    :page-size="pageSize"
                    layout="total, prev, pager, next"
                    :total="capital_total">
                  </el-pagination>
                </div>
              </div>
          </div>
          <!-- <div class="centent-right">
              <h2 class="Title">充值记录</h2>
              <div class="rule">
                  <ul v-for="(item,index) in Record" :key="index">
                     <li><span class="color">成功充值{{item.money}}点券</span><span class="span">{{item.created_at}}</span></li>
                  </ul>
              </div>
              <div class="pagination">
                <el-pagination
                  @current-change="CurrentChange"
                  :page-size="2"
                  layout="total, prev, pager, next"
                  :total="record_total">
                </el-pagination>
              </div>
          </div> -->
      </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import api from '../http/api'
  import {pageSize} from '@/util/env' 
  export default {
    data(){
      return {
          capital:[],
          Voucher:{},
          Record:[],
          capital_total:0,
          record_total:0,
          pageSize:pageSize
      }
    },
    methods:{
      handleCurrentChange(val) {
        console.log(val)
        api.Accountfunds({page:val}).then(res =>{
          this.capital = res.data.data
          this.capital_total = res.data.total
        })
      },
      CurrentChange(val){
        api.getRechargeLog({page:val}).then(res =>{
          this.Record = res.data.data
          this.record_total = res.data.total
        })
      }
    },
    created() {
        //获取用户使用点券记录
        api.Accountfunds().then(res =>{
            // console.log(res.data)
          this.capital= res.data.data
          this.capital_total = res.data.total
            // console.log(this.capital)
        })
       
        //获取用户点券信息
        api.getUserVoucher().then(res =>{
            // console.log(res.data)
            this.Voucher=res.data
            // console.log(this.Voucher)
        })
        //获取用户充值记录
        // api.getRechargeLog().then(res =>{
        //     // console.log(res.data)
        //   this.Record=res.data.data
        //   this.record_total = res.data.total
        //     // console.log(this.Record)
        // })
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
    background: url("../assets/img/capital1.png") no-repeat;
    background-size: 100% 100%;
}
.dataimg .data2{
    background: url("../assets/img/capital2.png") no-repeat;
    background-size: 100% 100%;
}
.dataimg .data3{
    background: url("../assets/img/capital3.png") no-repeat;
    background-size: 100% 100%;
}
.dataimg .data4{
    background: url("../assets/img/capital4.png") no-repeat;
    background-size: 100% 100%;
}
.centent{
    display: flex;
    margin: 40px 0 25px 0;
}
.centent-left{
    width: 100%;
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
    padding: 20px 30px;
    background-color: #fff;
    height: 83%;
}
.rule .color{
    color: #49a6f7;
}
.rule ul li{
    margin: 20px 0;
    font-size: 12px;
    color: #3c3c3c;
    list-style-type:disc;
        display: flex;
    justify-content: space-between;
}
.pagination{
  margin-top: 20px;
  text-align: center;
}
</style>

