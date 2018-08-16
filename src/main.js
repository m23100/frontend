// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
Vue.use(ElementUI);
/* eslint-disable no-new */

// Vue.prototype.codeHttp = 'http://dev.ruomengtv.com/'
// Vue.prototype.HTTP = 'http://dev.ruomengtv.com/'
// axios.defaults.baseURL = 'http://dev.ruomengtv.com/'


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
