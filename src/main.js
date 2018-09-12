// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui';
import store from './vuex/store'
import 'element-ui/lib/theme-chalk/index.css'
import './scss/item-content.scss'
Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
