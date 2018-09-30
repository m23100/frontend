
import Vue from 'vue'
import App from './App'

import router from './router'
import ElementUI from 'element-ui'
import store from './vuex/store'
import 'element-ui/lib/theme-chalk/index.css'
import './scss/index.scss'


Vue.config.productionTip = false

Vue.use(ElementUI)


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  render: h => h(App)
})
