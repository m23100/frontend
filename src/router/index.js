import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'
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
Vue.use(Router)

const router =new Router({
  // mode:'history',
 routes: [
    {
      path:"/",
      component:Login,
      meta:{
        auth:false
      }
    },
    {
      path:"/login",
      component:Login,
      meta:{
        auth:false
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: container,
      redirect: '/profile/home',
      children: [
        //首页
        {
          path: '/home',
          name: 'Home',
          component: Home,
        },
        //积分信息
        {
          path: '/integral',
          name: 'Integral',
          component: Integral,
        },
        //账户资金
        {
          path: '/capital',
          name: 'Capital',
          component: Capital,
        },
        //个人资料
        {
          path: '/personal',
          name: 'Personal',
          component: Personal,
        },
        //放单平台
        //提交订单
        {
          path: '/submission',
          name: 'Submission',
          component: Submission,
        },
        //平推单审核
        {
          path: '/viptesting',
          name: 'Viptesting',
          component: Viptesting,
        },
        {
          path: '/viptestok',
          name: 'Viptestok',
          component: Viptestok,
        },
        {
          path: '/viptestno',
          name: 'Viptestno',
          component: Viptestno,
        },
        //爆款单审核
        {
          path: '/sviptesting',
          name: 'Sviptesting',
          component: Sviptesting,
        },
        {
          path: '/sviptestok',
          name: 'Sviptestok',
          component: Sviptestok,
        },
        {
          path: '/sviptestno',
          name: 'Sviptestno',
          component: Sviptestno,
        },
        //放单申请
        {
          path:'/apply',
          name:'Apply',
          component:Apply,
        },
        //商品链接检测
        {
          path:'/linkDetection',
          name:'LinkDetection',
          component:LinkDetection,
        },
        //爆款表单
        {
          path:'/firefrom',
          name:'Firefrom',
          component:Firefrom,
        },
        //平推表单
        {
          path:'/flatfrom',
          name:'Flatfrom',
          component:Flatfrom,
        },
        //放单平台end


        //秒杀平台

        //秒杀单链接检测
        {
          path:'/killcheckout',
          name:'Killcheckout',
          component:Killcheckout,
        },

        //秒杀数据视图
        {
          path:'/seconddata',
          name:'Seconddata',
          component:Seconddata,
        },
        //秒杀审核
        {
          path:'/examineing',
          name:'Examineing',
          component:Examineing,
        },
        {
          path:'/examineno',
          name:'Examineno',
          component:Examineno,
        },
        {
          path:'/examineok',
          name:'Examineok',
          component:Examineok,
        },
        //秒杀表单
        {
          path:'/secondfrom',
          name:'Secondfrom',
          component:Secondfrom,
        },
        //认证信息
        {
          path:'/authentication',
          name:'Authentication',
          component:Authentication,
        },
        //客服帮助
        {
          path:'/customer',
          name:'Customer',
          component:Customer,
        },
        //密钥管理
        {
          path:'/userkey',
          name:'Userkey',
          component:Userkey,
        },
      ]
    },
  ]
})
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')
  let token_expires = localStorage.getItem('token_expires')
  let time_diff = token ? new Date(token_expires).getTime()- new Date().getTime() : 0

  // console.log("before each - ", to,to.meta.auth,time_diff,to.path,token)
  if(to.meta && to.meta.auth==false){
    next()
  }else{
    if(token && time_diff>0){
      next()
    }else{
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  }
})

router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
})

export default router;
