// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueAxios, axios)
/* eslint-disable no-new */

Vue.prototype.codeHttp = 'http://dev.ruomengtv.com/api'
Vue.prototype.HTTP = 'http://dev.ruomengtv.com/api'
axios.defaults.baseURL = 'http://dev.ruomengtv.com/api'


axios.defaults.timeout=5000;
// Vue.prototype.axios =  axios;
// axios.defaults.headers.post['Authorization'] =  localStorage.getItem('access_token')?localStorage.getItem('access_token'):'';
// axios.defaults.headers.post['Accept'] =  'application/json';

axios.interceptors.request.use(function (config) {
  // Do something before request is sent
 config.headers = {
    "Authorization": localStorage.getItem('access_token'),
    "Accept": localStorage.getItem('token_type')
    // "ng-params-one": '13270068443',
    // "ng-params-two": '343306a20694ef1f5408e858aa0d25bd178683d0'
 };

  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// window.axios.defaults.headers.common = {
//   "Authorization": localStorage.getItem('access_token'),
//      "Accept": localStorage.getItem('token_type')
// };

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
