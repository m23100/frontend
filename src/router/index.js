// import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'

const Login = r => require.ensure([], () => r(require('@/views/Login')));
const container = r => require.ensure([], () => r(require('@/views/container')));
const Home = r => require.ensure([], () => r(require('@/views/Home')));
const Integral = r => require.ensure([], () => r(require('@/views/Integral')));
const Capital = r => require.ensure([], () => r(require('@/views/Capital')));
const Personal = r => require.ensure([], () => r(require('@/views/Personal')));

//放单平台

const Apply = r => require.ensure([], () => r(require('@/views/platform/Apply')));
const Submission = r => require.ensure([], () => r(require('@/views/platform/Submission')));
const LinkDetection = r => require.ensure([], () => r(require('@/views/platform/LinkDetection')));
const Firefrom = r => require.ensure([], () => r(require('@/views/platform/Firefrom')));
const Flatfrom = r => require.ensure([], () => r(require('@/views/platform/Flatfrom')));

//平推单

const Viptesting = r => require.ensure([], () => r(require('@/views/platform/Vip/Viptesting')));
const Viptestok = r => require.ensure([], () => r(require('@/views/platform/Vip/Viptestok')));
const Viptestno = r => require.ensure([], () => r(require('@/views/platform/Vip/Viptestno')));

//爆款单

const Sviptesting = r => require.ensure([], () => r(require('@/views/platform/Svip/Sviptesting')));
const Sviptestok = r => require.ensure([], () => r(require('@/views/platform/Svip/Sviptestok')));
const Sviptestno = r => require.ensure([], () => r(require('@/views/platform/Svip/Sviptestno')));

//放单end

//秒杀平台

const Killcheckout = r => require.ensure([], () => r(require('@/views/SecondKill/Killcheckout')));
const Seconddata = r => require.ensure([], () => r(require('@/views/SecondKill/Seconddata')));
const Secondfrom = r => require.ensure([], () => r(require('@/views/SecondKill/Secondfrom')));
const Examineing = r => require.ensure([], () => r(require('@/views/SecondKill/Examine/Examineing')));
const Examineno = r => require.ensure([], () => r(require('@/views/SecondKill/Examine/Examineno')));
const Examineok = r => require.ensure([], () => r(require('@/views/SecondKill/Examine/Examineok')));



const Userkey = r => require.ensure([], () => r(require('@/views/Userkey')));

//认证信息

const Authentication = r => require.ensure([], () => r(require('@/views/Authentication')));

//客服帮助

const Customer = r => require.ensure([], () => r(require('@/views/Customer')));


Vue.use(Router)

const router =new Router({
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
  if(token_expires){
    token_expires = Date.parse(token_expires.replace(/-/g,"/"))
  }
  let time_diff = token ? new Date(token_expires).getTime()- new Date().getTime() : 0

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
