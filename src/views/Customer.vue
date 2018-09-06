<template>
    <div class="Customer">
        <div class="call"  v-for="(item,index) in CustomerList" :key="index">
            <div class="Title">{{item.name}}</div>
            <div class="four">
                <div class="kefu" v-for="(list,key) in item.qqList" :key="key">
                    <a v-bind:href="['http://wpa.qq.com/msgrd?v=3&uin='+list.qq+'&site=qq&menu=yes']"  target="_blank" >
                    <img src="../assets/img/qq.png" alt="">{{list.nickName}}</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import api from '../http/api'
    export default{
        data(){
           return{
              CustomerList:[]
           }
        },
        created(){
            api.getCustomerService().then(res =>{
                this.CustomerList=res.data
            })
        }          
        
    }
</script>
<style>
.call{
    display: block;
    border-bottom: 1px solid #eee;
    background-color: #fff;
    padding: 20px 10px;
}
.Title {
  font-size: 18px;
  color: #000;
  border-left: 4px solid #43b5f9;
  line-height: 22px;
  padding-left: 10px;
  font-weight: 400;
}
.four{
    padding: 20px 0 20px 0;
    display: inline-block;
    justify-content: space-between;
    width: 100%;
}
.kefu{
    display: inline-block;
    justify-content: space-between;
    padding-left: 60px;
    width: 150px;
    height: 30px;
}
.kefu>a{
    color: #43b5f9;
    font-size: 14px;
    line-height: 24px;
}
.kefu>a>img{
    margin-right: 5px;
}
</style>
