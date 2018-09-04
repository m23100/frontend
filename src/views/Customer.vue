<template>
    <div class="Customer">
        <div class="call">
            <h2 class="Title">运营客服</h2>
            <div class="four">
                <div class="kefu" v-for="(item,index) in Operate" :key="index">
                    <img src="../assets/img/qq.png" alt="">
                    <span>{{item.qq}}</span>
                </div>
            </div>
        </div>
         <div class="call">
            <h2 class="Title">商务合作客服</h2>
            <div class="four">
                <div class="kefu" v-for="(item,index) in Business" :key="index">
                    <img src="../assets/img/qq.png" alt="">
                    <span>{{item.qq}}</span>
                </div>
            </div>
        </div>
         <div class="call">
            <h2 class="Title">技术客服</h2>
            <div class="four">
                <div class="kefu" v-for="(item,index) in technology" :key="index">
                    <img src="../assets/img/qq.png" alt="">
                    <span>{{item.qq}}</span>
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
              Operate:[],
              Business:[],
              technology:[]
           }
        },
        created(){
            api.getCustomerService().then(res =>{
                console.log(res.data)
                this.Operate=res.data.CustomerService[1]
                this.Business=res.data.CustomerService[2]
                this.technology=res.data.CustomerService[3]
            })
        }          
        
    }
</script>
<style>
.call{
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
    padding: 20px 100px 20px 60px;
    display: flex;
    justify-content: space-between;
    width: 60%;
}
kefu{
    display: flex;
    justify-content: space-between;
}
.kefu>span{
    color: #43b5f9;
    font-size: 14px;
    line-height: 24px;
}
</style>
