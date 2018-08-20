import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import container from '@/views/container'
import Home from '@/views/Home'
import Integral from '@/views/Integral'
import Capital from '@/views/Capital'
import Personal from '@/views/Personal'
//放单平台
import Apply from '@/views/platform/Apply'
import Submission from '@/views/platform/Submission'
import LinkDetection from '@/views/platform/LinkDetection'
//平推单
import Viptesting from '@/views/platform/Vip/Viptesting'
import Viptestok from '@/views/platform/Vip/Viptestok'
import Viptestno from '@/views/platform/Vip/Viptestno'

//爆款单
import Sviptesting from '@/views/platform/Svip/Sviptesting'
import Sviptestok from '@/views/platform/Svip/Sviptestok'
import Sviptestno from '@/views/platform/Svip/Sviptestno'
Vue.use(Router)

export default new Router({

  routes: [
    //登录
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      //容器
      path: '/container',
      name: 'container',
      component: container,
      redirect: '/container/home',
      children: [
        //首页
        {
          path: '/home',
          name: 'Home',
          component: Home
        },
        //积分信息
        {
          path: '/integral',
          name: 'Integral',
          component: Integral
        },
        //账户资金
        {
          path: '/capital',
          name: 'Capital',
          component: Capital
        },
        //个人资料
        {
          path: '/personal',
          name: 'Personal',
          component: Personal
        },

        //提交订单
        {
          path: '/submission',
          name: 'Submission',
          component: Submission
        },
        //平推单
        {
          path: '/viptesting',
          name: 'Viptesting',
          component: Viptesting
        },
        {
          path: '/viptestok',
          name: 'Viptestok',
          component: Viptestok
        },
        {
          path: '/viptestno',
          name: 'Viptestno',
          component: Viptestno
        },
        //爆款单
        {
          path: '/sviptesting',
          name: 'Sviptesting',
          component: Sviptesting
        },
        {
          path: '/sviptestok',
          name: 'Sviptestok',
          component: Sviptestok
        },
        {
          path: '/sviptestno',
          name: 'Sviptestno',
          component: Sviptestno
        },
        //放单申请
        {
          path:'/apply',
          name:'Apply',
          component:Apply
        },
        //商品链接检测
        {
          path:'/linkDetection',
          name:'LinkDetection',
          component:LinkDetection
        }
      ]
    },


  ]
})