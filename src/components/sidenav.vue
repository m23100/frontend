<template>
  <div class="sidenav">
    <div class="nav">
      <div class="user">
        <dl>
          <dt class="userimg"><img :src="avatar" alt=""></dt>
          <dd class="user-dd1">{{name}}</dd>
          <dd class="user-dd2">{{signature}}</dd>
        </dl>
        <div class="deposit">
          <div class="depositdian"><span>点券</span>{{voucher_number}}</div>
          <div class="depositfen"><span>积分</span>{{integral_number}}</div>
        </div>
      </div>
      <el-row class="tac">
        <el-col :span="24">
          <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
            <el-menu-item index="1" @click="$router.push('Home')">
              <i class="iconfont icon-homepage_fill"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <i class="iconfont icon-service_fill"></i>
                <span>放单平台</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="2-2" @click="$router.push('Apply')">提交新单</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="2-2">
                <template slot="title" @click="$router.push('Viptesting')">平推单</template>
                <el-menu-item index="2-2-1" @click="$router.push('Viptesting')">审核中</el-menu-item>
                <el-menu-item index="2-2-2" @click="$router.push('Viptestok')">审核通过</el-menu-item>
                <el-menu-item index="2-2-3" @click="$router.push('Viptestno')">审核被拒</el-menu-item>
              </el-submenu>
              <el-submenu index="2-3">
                <template slot="title">爆款单</template>
                <el-menu-item index="2-3-1" @click="$router.push('Sviptesting')">审核中</el-menu-item>
                <el-menu-item index="2-3-2" @click="$router.push('Sviptestok')">审核通过</el-menu-item>
                <el-menu-item index="2-3-3" @click="$router.push('Sviptestno')">审核被拒</el-menu-item>
              </el-submenu>
            </el-submenu>
             <el-submenu index="9" v-if="this.killstatus==1">
              <template slot="title">
                <i class="iconfont icon-clock_fill"></i>
                <span>秒杀平台</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="9-1" @click="$router.push({name:'Seconddata'})"><i class="iconfont icon-home-l"></i>秒杀数据</el-menu-item>
                <el-menu-item index="9-2" @click="$router.push({name:'Killcheckout'})"><i class="iconfont icon-home-k"></i>提交秒杀</el-menu-item>
                <el-menu-item index="9-3" @click="$router.push({name:'Examineing'})"><i class="iconfont icon-home-l"></i>审核中</el-menu-item>
                <el-menu-item index="9-4" @click="$router.push({name:'Examineok'})"><i class="iconfont icon-home-m"></i>审核通过</el-menu-item>
                <el-menu-item index="9-5" @click="$router.push({name:'Examineno'})"><i class="iconfont icon-home-m"></i>审核被拒</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="3"  @click="$router.push('Capital')">
              <i class="iconfont icon-financial_fill"></i>
              <span slot="title">账户资金</span>
            </el-menu-item>
            <!-- disabled==禁用 -->
            <el-menu-item index="4"  @click="$router.push('Integral')">
              <i class="iconfont icon-integral_fill"></i>
              <span slot="title">积分信息</span>
            </el-menu-item>

            <el-menu-item index="5" @click="$router.push('Personal')">
              <i class="iconfont icon-gerenziliao"></i>
              <span slot="title">个人资料</span>
            </el-menu-item>
            <el-menu-item index="6" @click="$router.push('Authentication')">
              <i class="iconfont icon-renzhengshangjia"></i>
              <span slot="title">认证信息</span>
            </el-menu-item>
            <!-- <el-menu-item index="7"  @click="$router.push('demo')">
              <i class="iconfont icon-iconfont5"></i>
              <span slot="title">账户安全</span>
            </el-menu-item> -->
            <el-menu-item index="7" @click="$router.push('Customer')">
              <i class="iconfont icon-customerservice_fill"></i>
              <span slot="title">客服帮助</span>
            </el-menu-item>

          </el-menu>
        </el-col>
      </el-row>
      <el-row class="logout">
        <el-button round @click="Logout" >退出</el-button>
      </el-row>
    </div>

  </div>
</template>
<script>
  import api from '@/http/api';
  import { mapGetters,mapActions } from 'vuex'
import {imgBaseUrl,userAvatar} from '@/util/env'
  export default {
    data() {
      return {
        isCollapse: true,
        avatar:'',
        name:'',
        signature:'',
        integral_number:0,
        voucher_number:0,
        killstatus:0,
      };
    },
    methods: {
      ...mapActions({ setSignOut: 'setSignOut'}),
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      },
      Logout:function(){
        api.Logout().then(res=>{
          if(res.code==0){
            this.setSignOut()
          }else{
            this.setSignOut()
          }
        })
        this.$router.replace('/')
      }
    },
    computed: {
      ...mapGetters([
        'getVoucherNumber',
        'getIntegralNumber'
      ])
    },
    created(){
      api.GetUserInfo().then(res=>{
        if(res.code>0) this.$router.replace('/')
        this.avatar = res.data.avatar ? res.data.avatar : imgBaseUrl+userAvatar
        this.name = res.data.name
        this.signature = res.data.signature
        this.voucher_number = res.data.voucher_number
        this.integral_number = res.data.integral
      }).catch((error)=>{
        this.$router.replace('/')
      })
      api.GetUserKillStatus().then(res=>{
        if(res.code==0){
          this.killstatus = 1
        }
      })
    },
    watch:{
        getVoucherNumber(newVal,oldVal){
          this.voucher_number = newVal
        },
        getIntegralNumber(newVal,oldVal){
          this.integral_number = newVal
        }
    },
  };
</script>
<style  lang="scss" scoped  type="text/css">
  .sidenav {
    width: 241px;
    height: 100%;
    background-color: #fff;
    border: 1px solid #eee;
    border-top-left-radius: 10px;
  }

  .sidenav .nav {
  }
  .user{
        text-align: center;
  }
  .userimg{
    width: 96px;
    height: 96px;
    border-radius: 50%;
    border:2px solid #49a6f7;
    margin: 23px auto;
  }
  .userimg img{
    width: 100%;height: 100%;
    background-size: 100%;
    border-radius:50%;
  }
  .user-dd1{
    font-size: 18px;
    color: #394853;
  }
  .user-dd2{
    font-size: 12px;
    line-height: 52px;
    color: #a8a8a8;
  }
  .user .deposit{
    display: flex;
    justify-content: space-between;
    margin: 0 14px;
    color: #a8a8a8;
    padding-bottom: 21px;
    border-bottom: 1px solid #f4f4f4;
  }
  .user .deposit>div{
    display: flex;
    line-height: 16px;
  }
  .user .depositdian>span{
    width: 36px;height: 16px;
    border-radius: 6px;
    background-color: #49a6f7;
    font-size: 12px;
    color: #fff;
    margin-right: 10px;
  }
   .user .depositfen>span{
     width: 36px;height: 16px;
    border-radius: 6px;
    background-color: #fb5f3c;
    font-size: 12px;
    color: #fff;
    margin-right: 10px;
  }
  .el-button.is-round{
    padding: 10px 30px;
    font-size: 15px;
    border-color: #b3d8ff;
    color: #409EFF;
  }
  .logout{
    margin-top: 10px;
    margin-bottom: 17px;
    text-align: center;
  }
</style>
