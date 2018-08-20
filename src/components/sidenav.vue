<template>
  <div class="sidenav">
    <div class="nav">
      <div class="user">
        <dl>
          <dt class="userimg"><img src="../public/img/userimg.png" alt=""></dt>
          <dd class="user-dd1">ABC团队</dd>
          <dd class="user-dd2">业内知名招商大户</dd>
        </dl>
        <div class="deposit">
          <div class="depositdian"><span>点券</span>1000</div>
          <div class="depositfen"><span>积分</span>20</div>
        </div>
      </div>
      <el-row class="tac">
        <el-col :span="24">
          <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
            <el-menu-item index="1" @click="$router.push('Home')">
              <i class="el-icon-search"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-message"></i>
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

            <el-menu-item index="3"  @click="$router.push('Capital')">
              <i class="el-icon-goods"></i>
              <span slot="title">账户资金</span>
            </el-menu-item>
            <!-- disabled==禁用 -->
            <el-menu-item index="4"  @click="$router.push('Integral')">
              <i class="el-icon-star-on"></i>
              <span slot="title">积分信息</span>
            </el-menu-item>

            <el-menu-item index="5">
              <i class="el-icon-view"></i>
              <span slot="title">个人资料</span>
            </el-menu-item>
            <el-menu-item index="6">
              <i class="el-icon-location"></i>
              <span slot="title">认证信息</span>
            </el-menu-item>
            <el-menu-item index="7">
              <i class="el-icon-setting"></i>
              <span slot="title">账户安全</span>
            </el-menu-item>
            <el-menu-item index="8">
              <i class="el-icon-service"></i>
              <span slot="title">客服帮助</span>
            </el-menu-item>
            <el-submenu index="9">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>测试二级目录</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="9-1" @click="$router.push({name:'settlement'})"><i class="iconfont icon-home-k"></i>1</el-menu-item>
              <el-menu-item index="9-2" @click="$router.push({name:'putforward'})"><i class="iconfont icon-home-l"></i>2</el-menu-item>
              <el-menu-item index="9-3" @click="$router.push({name:'receivables'})"><i class="iconfont icon-home-m"></i>3</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
    </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        isCollapse: true
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  };
</script>
<style>
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
</style>
