import Vue from 'vue'
import Vuex from 'vuex'


import user from './modules/user'
import com from './modules/com'
import goods from './modules/goods'

// 注册vuex
Vue.use(Vuex)

// 导出一个新生成的Store对象
export default new Vuex.Store({
  modules: {
      user,
      com,
      goods
  }
})