import api from '../../http/api'
import * as types from '../types'


const state = {
    // 用户登录状态
    loginStatus: JSON.parse(localStorage.getItem('loginStatus')) || false,
    // 用户登录信息
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
    // 用户数据信息
    userData: {
        realdata: {},
        auditdata: {},
        advertdata: {}
    },
    userToken: JSON.parse(localStorage.getItem('userToken')) || {},
    AccountFunds:[],
    voucherNumber:0,
    integralNumber:0,
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
    // 账户资金(点券)
    getAccountFunds({commit}){
        api.Accountfunds()
        .then(res =>{
            commit(types.GET_ACCOUNT_FUNDS, res.data)
        })
    },
    setUserBalane({commit},res){
        commit(types.SET_USERS_BALANCE,res)
    },
}

const getters = {
    getAccountFunds: state => state.accountFunds,
    getUserData: state => state.userData,
    loginStatus: state => state.loginStatus,
    userInfo: state => state.userInfo,
    getVoucherNumber:state=>state.voucherNumber,
    getIntegralNumber:state=>state.integralNumber
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
    },
    [types.SET_USERS_BALANCE](state,res){
        state.voucherNumber =res.voucherNumber
        state.integralNumber = res.integralNumber
    },
    
}

export default {
    state,
    actions,
    getters,
    mutations
}
