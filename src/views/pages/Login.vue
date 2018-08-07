<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card-group mb-0">
            <div class="card p-4">
              <div class="login-form">
            <form action="#">
                <div class="user-name common-div">
                    <span class="eamil-icon common-icon">
                        <i class="icon">&#xe601;</i>
                    </span>
                    <input type="text" name="phone" v-model="phone" placeholder="手机号" />        
                </div>
                <div class="user-pasw common-div">
                    <span class="pasw-icon common-icon">
                        <i class="icon">&#xe687;</i>
                    </span>
                    <input type="password" name="password" v-model="password" placeholder="密码" />        
                </div>
                <div class="login-btn" @click="_login">登录</div>
            </form>
        </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import api from '../../http/api'
import * as _ from '../../util/tool'


export default {
  // name: 'Login',
  data() {
      return {
          phone: '',
          password: ''
      }
  },

  methods: {
    ...mapActions({ setUserInfo: 'setUserInfo' }),
    // 用户登录
    _login() {
        if (!this.phone || !this.password) {
            _.alert('请填写完整')
            return
        }


        let data = {
            phone: this.phone,
            password: _.cryptPwd(_.cryptPwd("q05RbDInqSNNhMWuLE"+this.password))
        }
        console.log(data);
        this.$store.dispatch('setLoadingState', true)
        api.Login(data)
            .then(res => {
                console.log(res)
                if(res.success) {
                    this.$store.dispatch('setLoadingState', false)
                    this.setUserInfo(res.data)
                    this.$router.replace('/home')
                }
            })
            .catch(error => {
                console.log(error)
            })
      }
   }



}
</script>