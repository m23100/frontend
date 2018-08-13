import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home'
import Integral from '@/views/Integral'
Vue.use(Router)

export default new Router({

  routes: [
    // {
    //   path: '',
    //   name: 'views',
    //   component: Home,
    //   redirect:'/home',
    //   children: [
        
    //   ]
    // },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/integral',
      name: 'Integral',
      component: Integral
    },
   
  ]
})