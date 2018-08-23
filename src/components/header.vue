<template>
   <div class="head">
       <div class="header">
           <ul class="fl" @click="$router.push('Home')">若梦TV首页</ul>
           <ul class="fr">
               <!-- <li> <a href="">开发API</a> </li> -->
               <li>开发API</li>
               <li class="spacer"></li>
               <li>商品库</li>
               <li class="spacer"></li>
               <li>积分规则</li>
               <li class="spacer"></li>
               <li>客服帮助</li>
           </ul>
       </div>
   </div>
</template>
<style>
.head {
  width: 100%;
  height: 40px;
  background-color: #484848;
}

.header {
  width: 1200px;
  height: 40px;
  color: #fff;
  margin: 0 auto;
}
.fl {
  display: block;
  float: left;
  width: 75px;
  font-family: FZLTKHK--GBK1-0;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 38px;
  letter-spacing: 0px;
  color: #ffffff;
  cursor: pointer;
}
.fl:hover{
  color: #49a6f7;
}

.fr {
  float: right;
}
.fr .spacer {
  line-height: 0;
  overflow: hidden;
  margin: 11px 10px 0;
  width: 1px;
  height: 21px;
  background-color: #edeff1;
}
.fr li {
  float: left;
  font-family: FZLTKHK--GBK1-0;
  font-size: 14px;
  line-height: 40px;
  color: #fff;
  cursor: pointer;
}
.fr li:hover{
  color: #49a6f7
}
</style>

