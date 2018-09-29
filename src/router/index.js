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
//放单end

//秒杀平台
import Killcheckout from '@/views/SecondKill/Killcheckout'
import Seconddata from '@/views/SecondKill/Seconddata'
import Secondfrom from '@/views/SecondKill/Secondfrom'
import Examineing from '@/views/SecondKill/Examine/Examineing'
import Examineno from '@/views/SecondKill/Examine/Examineno'
import Examineok from '@/views/SecondKill/Examine/Examineok'

import Userkey from '@/views/Userkey'

//认证信息
import Authentication from '@/views/Authentication'
//客服帮助
import Customer from '@/views/Customer'
// import demo from '@/views/demo'
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
        //放单平台
        //提交订单
        {
          path: '/submission',
          name: 'Submission',
          component: Submission,
          meta:{
            requireAuth:true
          }
        },
        //平推单审核
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
        //爆款单审核
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
        //爆款表单
        {
          path:'/firefrom',
          name:'Firefrom',
          component:Firefrom,
          meta:{
            requireAuth:true
          }
        },
        //平推表单
        {
          path:'/flatfrom',
          name:'Flatfrom',
          component:Flatfrom,
          meta:{
            requireAuth:true
          }
        },
        //放单平台end


        //秒杀平台

        //秒杀单链接检测
        {
          path:'/killcheckout',
          name:'Killcheckout',
          component:Killcheckout,
          meta:{
            requireAuth:true
          }
        },

    //秒杀数据视图
        {
          path:'/seconddata',
          name:'Seconddata',
          component:Seconddata,
          meta:{
            requireAuth:true
          }
        },
        //秒杀审核
        {
          path:'/examineing',
          name:'Examineing',
          component:Examineing,
          meta:{
            requireAuth:true
          }
        },
        {
          path:'/examineno',
          name:'Examineno',
          component:Examineno,
          meta:{
            requireAuth:true
          }
        },
        {
          path:'/examineok',
          name:'Examineok',
          component:Examineok,
          meta:{
            requireAuth:true
          }
        },
        //秒杀表单
        {
          path:'/secondfrom',
          name:'Secondfrom',
          component:Secondfrom,
          meta:{
            requireAuth:true
          }
        },
        //认证信息
        {
          path:'/authentication',
          name:'Authentication',
          component:Authentication,
          meta:{
            requireAuth:true
          }
        },
        //客服帮助
        {
          path:'/customer',
          name:'Customer',
          component:Customer,
          meta:{
            requireAuth:true
          }
        },
        //客服帮助
        {
          path:'/userkey',
          name:'Userkey',
          component:Userkey,
          meta:{
            requireAuth:true
          }
        },
        //测试
        // {
        //   path:'/demo',
        //   name:'demo',
        //   component:demo,
        //   meta:{
        //     requireAuth:true
        //   }
        // },


      ]

    },


  ]
})

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')
  let token_expires = localStorage.getItem('token_expires')
  if(to.meta.requireAuth) {
    let time_diff = new Date(token_expires).getTime()- new Date().getTime()
    console.log(time_diff)
    if(token && time_diff>0) {
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

router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
})


export default router;
