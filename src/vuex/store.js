import Vue from 'vue'
import Vuex from 'vuex'


import user from './modules/user'
import com from './modules/com'

// 注册vuex
Vue.use(Vuex)

// 导出一个新生成的Store对象
export default new Vuex.Store({
  modules: {
      user,
      com
  },
  state:{
    token:''
  },
  mutations:{
    set_token(state, token) {
      state.token = token
      localStorage.token = token
    },
    del_token(state) {
      state.token = ''
      localStorage.removeItem('token')
    }
  }

})
