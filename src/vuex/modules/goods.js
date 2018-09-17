import api from '../../http/api'
import * as types from '../types'


const state = {
    goodsType: '',
    goodsLink:'',
    goodsId:0,
    editId:0,
    goodsTime:'',
    goodsDate:'',
    goodsCoverimg:'',
    goodsSalecout:''
}

const actions = {
    /**
     * 用户登录
     */
    setGoodsType({ commit }, str) {
        commit(types.SET_GOODS_TYPE, str)
    },
    setGoodsInfo({ commit }, res){
        commit(types.SET_GOODS_LINK, res.link)
        commit(types.SET_GOODS_ID, res.id)
        commit(types.SET_GOODS_EDIT_ID, res.editId)
        commit(types.SET_GOODS_COVERIMG, res.coverimage)
        commit(types.SET_GOODS_SALECOUNT, res.salecount)
    },
    setGoodsKill({ commit }, res) {
        commit(types.SET_GOODS_KILL_TIME, res.goodsTime)
        commit(types.SET_GOODS_KILL_DATE, res.goodsDate)
    },
}

const getters = {
    getGoodsType: state => state.goodsType,
    getGoodsLink: state => state.goodsLink,
    getGoodsId: state => state.goodsId,
    getEditId: state=>state.editId,
    getGoodsTime: state=>state.goodsTime,
    getGoodsDate: state=>state.goodsDate,
    getGoodsSalecount: state=>state.goodsSalecout,
    getGoodsCoverimg: state=>state.goodsCoverimg
}

const mutations = {
    [types.SET_GOODS_TYPE](state, str) {
        state.goodsType = str
    },
    [types.SET_GOODS_LINK](state, str) {
        state.goodsLink = str
    },
    [types.SET_GOODS_ID](state, str) {
        state.goodsId = str
    },
    [types.SET_GOODS_EDIT_ID](state, str) {
        state.editId = str
    },
    [types.SET_GOODS_COVERIMG](state, str) {
        state.goodsCoverimg = str
    },
    [types.SET_GOODS_SALECOUNT](state, str) {
        state.goodsSalecout = str
    },
    [types.SET_GOODS_KILL_TIME](state, str) {
        state.goodsTime = str
    },
    [types.SET_GOODS_KILL_DATE](state, str) {
        state.goodsDate = str
    },

}

export default {
    state,
    actions,
    getters,
    mutations
}
