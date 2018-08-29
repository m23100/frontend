<template>
    <div class="login">
      <!-- 登录头部 -->
      <div class="login-head">
        <img src="../assets/img/loginlogo.png" alt="">
        <div class="icon">
          <dl>
            <dt>
              <img src="../assets/img/icon1.png" alt="">
            </dt>
            <dd>爆款秒杀</dd>
          </dl>
          <dl>
            <dt>
              <img src="../assets/img/icon2.png" alt="">
            </dt>
            <dd>人工审核</dd>
          </dl>
          <dl>
            <dt>
              <img src="../assets/img/icon3.png" alt="">
            </dt>
            <dd>卓越优质</dd>
          </dl>
          <dl>
            <dt>
              <img src="../assets/img/icon4.png" alt="">
            </dt>
            <dd>实况数据</dd>
          </dl>
        </div>
      </div>
      <!-- end -->
      <!-- 内容 -->
      <div class="door">
        <div class="door-center">
          <div class="login-box">
            <ul class="login-nav">
              <li>账号登录</li>
              <span class="spacer1"></span>
              <li>验证码登录</li>
            </ul>
            <div class="form-box">
              <div class="login-from" id="tab1">
                <input v-model="phone" type="text" placeholder="手机号">
                <input v-model="password" type="password" placeholder="密码">
                <div id="check-code" class="code-box" style='margin-bottom:0;'>
                  <input type="text" id="reg-code" maxlength="5" placeholder="验证码">
                  <div class="code" id="data_code" data-value="A4agC" style="color: rgb(94, 68, 68);
                                    text-align: center;line-height: 49px;background-color: #eee;font-size: 20px;cursor:pointer;">A4agC</div>
                </div>

                <div class="choice">
                  <img src="../assets/img/choiceno.png" class='changeimg' alt="">
                  <span>记住登录状态</span>
                </div>
                <button class="login-button" @click="save1">登录</button>
              </div>
              <div class="login-from item" id="tab2">
                <input type="text" class="phonelogin" placeholder="手机号">
                <div class="code-box">
                  <input type="text" placeholder="手机短信验证码">
                  <span class="spacer2"></span>
                  <button class="code">获取验证码</button>
                </div>
                <button class="login-button" @click="save">登录</button>
              </div>
            </div>
      
            <div class="other">
              <a href="">注册</a>
              <a href="">忘记密码？</a>
            </div>
          </div>
        </div>
      </div>
      <!-- end -->
      <!-- 登录尾部 -->
      <div class="footer">
        <div class="f-center">
          <div class="three">
            <a href="">关于我们</a>
            <a href="">若梦金冠联盟</a>
            <a href="">联系我们</a>
          </div>
          <div class="line"></div>
          <p>@2017-2018 ruomengtv.com 若梦TV · 浙ICP备 17035713号-2 杭州若盟网络科技有限公司</p>
        </div>
      </div>
    </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios';

import { mapActions } from 'vuex'
import api from '../http/api'

  export default {
    data() {
      return {
        phone: "",
        password: "",
      };
    },
    methods: {
        ...mapActions({ setUserInfo: 'setUserInfo', setUserToken:'setUserToken'}),
     
     save1:function(){
        let data = {
            phone: this.phone,
            password: this.password
        }
        api.Login(data)
            .then(res => {
                if(res.code == 0) {
                  this.setUserToken(res.data)
                  api.UserInfo().then(
                    res => {
                      this.setUserInfo(res.data)
                      this.$router.replace('/home')
                    }
                  )

                }
            })
            .catch(error => {
                console.log(error)
            })



     },
     
    //登录并检查输入信息
    save:function(){
        // let that=this;
          // console.log(this.phone)

        // that.axios.post('http://dev.ruomengtv.com/api/login?phone=18658831530&password=123456',{
        //   phone: that.phone,
        //   password: that.password,
        //   })
        //   .then(function (response) {
        //       console.log(1)
        //       console.log(response);
        //   })
        //   .catch(function (error) {
        //       console.log(error);
        //   })
    },
    // save: function () {
    //   console.log(this.phone)
    //   console.log(this.password)
        // let that=this;
        // that.axios.post('/login', {
        // phone: that.phone,
        // password: that.password,
    //   }).then(res => {
    //     console.log(res)
        // if (res.data.code == 200) {
        //   if (that.phone == res.data.data.name && that.password == res.data.data.password) {
        //     localStorage.userInfo = JSON.stringify(res.data.data);
        //     that.$message({
        //       showClose: false,
        //       message: '登录成功',
        //       type: 'success',
        //       center: false
        //     })
        //     that.$router.push({
        //       path: '/home'
        //     })
        //   } else {
        //     that.$message({
        //       showClose: true,
        //       message: '账号密码不匹配',
        //       type: 'error',
        //       center: true
        //     });
        //   }
        // }else{
        //     that.$message({
        //         showClose: true,
        //         message: '网络异常或账号密码不匹配',
        //         type: 'error',
        //         center: true
        //       });
        // }

    //   })
    // },
    

    goregistered: function () {
      this.$router.push({
        path: 'home'
      })
    }
  },

  };
</script>
<style scoped>
  .login {
    width: 100%;
    height: 100%;
  }

  .login-head {
    width: 1200px;
    height: 62px;
    padding: 25px 0 17px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }

  .login-head>img {
    height: 45px;
  }

  .icon dt {
    text-align: center;
  }

  .icon dl {
    float: left;
    width: 48px;
    margin: 0 20px;
  }

  .icon dl dd {
    font-size: 12px;
    line-height: 36px;
    color: #aaa;
  }

  .door {
    width: 100%;
    height: 606px;
    background: url("../assets/img/logobg.jpg") no-repeat;
    background-size: 100% 100%;
  }

  .door-center {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
  }

  .login-box {
    float: right;
    width: 370px;
    height: 506px;
    background-color: #fff;
    margin: 40px 0 60px;
  }

  .login-nav {
    margin: 72px 67px;
    display: flex;
    justify-content: space-between;
    font-size: 18px;
  }

  .login-nav li {
    cursor: pointer;
  }

  /* 重置密码样式 */

  .forgot-nav {
    display: block !important;
    margin: 28px 20px;
    text-align: center;
    font-size: 18px;
    color: #f5475c;
  }

  .code-box {
    height: 49px;
    width: 333px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 58px;
  }

  .login-from .code-box input {
    height: 47px;
    padding-left: 12px;
    border-radius: 2px;
    border: solid 1px #dadada;
    width: 175px;
    margin: 0 0 0 36px !important;
    border-right: 0px !important;
  }

  .code {
    font-size: 14px;
    color: #49a6f7;
    border: 1px solid #dadada;
    background-color: #fff;
    width: 108px;
    border-left: 0px !important;
  }

  .spacer2 {
    line-height: 0;
    overflow: hidden;
    margin: 18px 0 0;
    width: 1px;
    height: 15px;
    background-color: #edeff1;
  }

  .current {
    color: red;
  }

  .item {
    display: none;
  }

  .show {
    display: block;
  }

  /* 重置密码样式end  */

  .spacer1 {
    line-height: 0;
    overflow: hidden;
    margin: 5px 8px 0;
    width: 1px;
    height: 15px;
    background-color: #b3abab;
  }

  .login-from {}

  .login-from input {
    margin: 0 36px;
    height: 47px;
    width: 283px;
    margin-bottom: 19px;
    padding-left: 12px;
    border-radius: 2px;
    border: solid 1px #dadada;
  }

  .login-button {
    width: 298px;
    height: 45px;
    background-color: #f5475c;
    border-radius: 2px;
    border: solid 1px #dadada;
    margin: 0 36px;
    outline: none;
    color: #fff;
  }

  .login-button:hover {
    background-color: #e23348;
  }

  .other>a {
    color: #7f7f7f;
  }

  .other>a:hover {
    color: #e23348;
  }

  .login-button a {
    color: #fff;
  }

  /* .img-verification{
    width: 298px;
	height: 45px;
	background-color: #f4f4f4;
	border-radius: 2px;
    border: solid 1px #dadada;
    margin: 0 36px;
    outline:none ;
} */

  .choice {
    width: 298px;
    margin: 16px 36px 20px;
  }

  .choice>span {
    margin-left: 6px;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 32px;
    letter-spacing: 0px;
    color: #7f7f7f;
  }

  .other {
    width: 298px;
    margin: 0 36px;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    line-height: 42px;
  }
  .home{
    width: 100%;
    height: 279px;
    background: linear-gradient(to right, #fc623c , #e80736);
}
.head{
    width: 1200px;
    margin: 0 auto;
}
.nav{
   display: flex;
   justify-content: space-between;
   margin-bottom: 60px;
}
.nav .fl{
    display: block;
}
.nav .fr{
    display: block;   
}
.nav ul>li{
    color: #FFF;
    float: left;
    margin: 0 18px;
    line-height: 44px;
    font-size: 14px;
    cursor: pointer;
}
.nav ul>li a{
    color: #FFF;
}

.circle{
    display: block;
    margin: 7px 0; line-height: 28px;
    width: 70px;height: 28px;
    border-radius: 10px;
    border:1px solid #FFF;
    text-align: center;
    color: #fff;
}
.circle:hover{
    background-color: #FFF;
    color: #e80736;
}
.search-nav{
    overflow: hidden;
}
.search-nav img{
    float: left;
    background-size: 100%;
}
.search-box{
    float: left;
    margin-left: 66px;
    margin-top: 20px;
    height: 40px;
    display: flex;
    justify-content: space-between;
}

.partial{
    margin-left: 30px;
}
.search-box>button>img{
    margin-left: 20px;
}
.key-word{
    width: 500px;
    margin: 0 auto;
}
.key-word>ul>li{
    float: left;
    
}
.key-word a{
    color: #FFF;
    text-decoration:none; 
}
.spacer{
    line-height: 0;
    overflow: hidden;
    margin: 5px 8px 0;
    width: 1px;
    height: 15px;
    background-color: #edeff1;
}



/* 尾部样式 */
.footer{
    width: 100%;
    height: 274px;
    background-color: #34383b;
    
 }
 .f-center{
    width: 1200px;
    margin: 0 auto;
    color: #ffffff; 
}
.three{
    width: 380px;
    padding: 59px 0 19px;
    margin: 0 auto;  
    display: flex;
    justify-content: space-between; 
              
}
.three a{
    text-decoration:none; 
    color: #fff;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    margin: 0px 22px;
} 
.line{
    width: 580px;
    height: 1px;
    background-color: #494c4f;
    margin: 0 auto;
}
p{
    width: 608px;
    font-size: 14px;
    line-height: 36px;
    margin: 0 auto;
    color: #9A9B9C;
    text-align: center;
}
</style>
