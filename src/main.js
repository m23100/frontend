
import App from './App'

import router from './router'
import store from './vuex/store'
import './scss/index.scss'


Vue.config.productionTip = false


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  render: h => h(App)
})
