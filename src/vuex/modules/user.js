import api from '../../http/api'
import * as types from '../types'


const state = {
    // 用户登录状态
    loginStatus: JSON.parse(localStorage.getItem('loginStatus')) || false,
    // 用户登录信息
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
    // 用户数据信息
    userData: [],
    userToken: JSON.parse(localStorage.getItem('userToken')) || {},
    AccountFunds:[]

}

const actions = {
    /**
     * 用户登录
     */
    setUserToken({ commit }, res) {
        localStorage.setItem('token', res.access_token)
    }, 

    /**
     * 用户登录
     */
    setUserInfo({ commit }, res) {
        localStorage.setItem('userInfo', JSON.stringify(res))
        localStorage.setItem('loginStatus', true)
        commit(types.SET_USER_INFO, res)
        commit(types.SET_LOGIN_STATUS, res)
    },

    /**
     * 退出登录
     */
    setSignOut({ commit }) {
        localStorage.removeItem('loginStatus')
        localStorage.removeItem('userInfo')
        localStorage.removeItem('token')
        commit(types.SET_LOGIN_STATUS, false)
        commit(types.SET_USER_INFO, {})
    },

    /**
     * 请求用户信息
     */
    getUserData({ commit }, id) {
        api.UserData()
        .then(res => {
            commit(types.GET_USER_DATA, res.data)
        })
    },
    // 账户资金
    getAccountFunds({commit}){
        api.Accountfunds()
        .then(res =>{
            commit(types.GET_ACCOUNT_FUNDS, res.data)
        })
    }
}

const getters = {
    getAccountFunds: state => state.accountFunds,
    getUserData: state => state.userData,
    loginStatus: state => state.loginStatus,
    userInfo: state => state.userInfo
}

const mutations = {
    [types.SET_USER_INFO](state, res) {
        state.userInfo = res
    },

    [types.SET_LOGIN_STATUS](state, status) {
        state.loginStatus = status
    },

    [types.GET_USER_DATA](state, res) {
        state.userData = res
    },
    [types.GET_ACCOUNT_FUNDS](state,res){
        state.accountFunds = res
    }
    
}

export default {
    state,
    actions,
    getters,
    mutations
}
