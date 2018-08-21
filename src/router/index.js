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
import Firefrom from '@/views/platform/Firefrom'
import Flatfrom from '@/views/platform/Flatfrom'
//平推单
import Viptesting from '@/views/platform/Vip/Viptesting'
import Viptestok from '@/views/platform/Vip/Viptestok'
import Viptestno from '@/views/platform/Vip/Viptestno'

//爆款单
import Sviptesting from '@/views/platform/Svip/Sviptesting'
import Sviptestok from '@/views/platform/Svip/Sviptestok'
import Sviptestno from '@/views/platform/Svip/Sviptestno'
Vue.use(Router)

const router = new Router({
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
          component: Home,
          meta:{
            requireAuth:true
          }
        },
        //积分信息
        {
          path: '/integral',
          name: 'Integral',
          component: Integral,
          meta:{
            requireAuth:true
          }
        },
        //账户资金
        {
          path: '/capital',
          name: 'Capital',
          component: Capital,
          meta:{
            requireAuth:true
          }
        },
        //个人资料
        {
          path: '/personal',
          name: 'Personal',
          component: Personal,
          meta:{
            requireAuth:true
          }
        },

        //提交订单
        {
          path: '/submission',
          name: 'Submission',
          component: Submission,
          meta:{
            requireAuth:true
          }
        },
        //平推单
        {
          path: '/viptesting',
          name: 'Viptesting',
          component: Viptesting,
          meta:{
            requireAuth:true
          }
        },
        {
          path: '/viptestok',
          name: 'Viptestok',
          component: Viptestok,
          meta:{
            requireAuth:true
          }
        },
        {
          path: '/viptestno',
          name: 'Viptestno',
          component: Viptestno,
          meta:{
            requireAuth:true
          }
        },
        //爆款单
        {
          path: '/sviptesting',
          name: 'Sviptesting',
          component: Sviptesting,
          meta:{
            requireAuth:true
          }
        },
        {
          path: '/sviptestok',
          name: 'Sviptestok',
          component: Sviptestok,
          meta:{
            requireAuth:true
          }
        },
        {
          path: '/sviptestno',
          name: 'Sviptestno',
          component: Sviptestno,
          meta:{
            requireAuth:true
          }
        },
        //放单申请
        {
          path:'/apply',
          name:'Apply',
          component:Apply,
          meta:{
            requireAuth:true
          }
        },
        //商品链接检测
        {
          path:'/linkDetection',
          name:'LinkDetection',
          component:LinkDetection,
          meta:{
            requireAuth:true
          }
        },
        {
          path:'/firefrom',
          name:'Firefrom',
          component:Firefrom,
          meta:{
            requireAuth:true
          }
        },
        {
          path:'/flatfrom',
          name:'Flatfrom',
          component:Flatfrom,
          meta:{
            requireAuth:true
          }
        }
      ]
    },


  ]
})

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')
  if(to.meta.requireAuth) {
    if(token) {
      next()
    } else {
      next({
        path: '/'
      })
    }
  } else {
    next()
  }
})

export default router