import Vue from 'vue'
import Router from 'vue-router'

import Login from '../views/pages/Login'
import Home from '../views/pages/Home'
Vue.use(Router)

export default new Router({

  routes: [
    {
      path: '',
      redirect: '/home',
      name: 'Pages',
      component: Home,
      children: [
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'home',
          name: 'Home',
          component: Home
        },
      ]
    }
  ]
})