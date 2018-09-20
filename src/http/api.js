import axios from 'axios'

const api = axios.create();
api.defaults.baseURL = 'http://dev.ruomengtv.com/api';
api.defaults.timeout = 5000;
api.defaults.headers.post['Content-Type'] = 'application/json';
api.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';


//POST传参序列化
api.interceptors.request.use(
  config => {
    if (localStorage.getItem('token')) {
      config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  },
);


//返回状态判断
api.interceptors.response.use((res) =>{
    if(!res.data){
        // _.toast(res.data.msg);
        return Promise.reject(res);
    }
    return res;
}, (error) => {
    // _.toast("网络异常", 'fail');
    return Promise.reject(error);
});


export function fetch(url, params) {
    return new Promise((resolve, reject) => {
        api.post(url, params)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
               reject(error)
            })
    })
}

export default {
    /**
     * 用户登录
     */
    Login(params) {
        return fetch('/login', params)
    },
    LoginByCode(params) {
        return fetch('/loginbycode', params)
    },
    Logout(params){
        return fetch('/logout', params)
    },
    UserInfo() {
        return fetch('/userinfo')
    },
    UserData(params) {
        return fetch('/usercenter/indexdata')
    },
    GetUserInfo(params){
        return fetch('user/getUserInfo')
    },
    GetSmsCode(params){
        return fetch('/getsmscode',params)
    },
    GetUserKillStatus(params){
        return fetch('user/getUserKillStatus')
    },
    GetUserIsSend(params){
        return fetch('user/getUserIsSend')
    },
     //客服帮助
    getCustomerService(params){
        return fetch('service/getCustomerService',params)
    },
    // 账户资金
    Accountfunds(params){
        return fetch('user/getVoucherLogList',params)
    },
    getUserVoucher(params){
        return fetch('user/getUserVoucher')
    },
    getRechargeLog(params){
        return fetch('user/getRechargeLog',params)
    },
    //end
    //积分信息
    getUserIntegralLog(params){
        return fetch('integral/getUserIntegralLog',params)
    },
    getIntegralRule(params){
        return fetch('integral/getIntegralRule')
    },
    //end
    //放单平台
    applyaudit(params){
        return fetch('usercenter/applyaudit',params)
    },
    lastapply(params){
        return fetch('usercenter/lastapply') 
    },
    checklink(params){
        return fetch('usercenter/checklink',params)
    },
    tbinfo(params){
        return fetch('usercenter/tbinfo',params)
    },
    //查看审核中的商品数据（平推
    auditing(params){
        return fetch('usercenter/goodslist',params)
    },
    //提交平推单数据
    createnormal(params){
        return fetch('usercenter/savenormal',params)
    },
    //提交爆款单数据
    saveFire(params){
        return fetch('usercenter/savefire',params)
    },
    //获取要修改的商品数据信息 
    editView(params){
        return fetch('usercenter/editview',params)
    },
    //预览文案
    viewCopy(params){
        return fetch('usercenter/viewcopy',params)
    },
    //撤销提交商品
    deleteGoods(params){
        return fetch('usercenter/delete',params)
    },
    //审核通过商品 updatenormal
    auditedGoods(params){
        return fetch('usercenter/audited',params)
    },
    //下架商品
    offGoods(params){
        return fetch('usercenter/off',params)
    },
    /*秒杀平台*/

    //获取秒杀平台的用户数据
    GetKillnum(params){
      return fetch('kill/getKillData',params)
    },

    //获取秒杀平台的规则
    getKillRule(params){
      return fetch('kill/getKillRule')
    },

    //获取秒杀平台的审核动态
    getKillDataDynamic(params){
      return fetch('kill/getKillDataDynamic',params)
    },
    getIntegralTrajectory(params){
        return fetch('integral/getIntegralTrajectory',params)
    },

    //测试商品链接
    // Killcheckout(params){
    //   return fetch('usercenter/checklink')
    // },

    //提交秒杀
    saveKillGood(params){
      return fetch('kill/saveKillGood',params)
    },
    //秒杀商品信息
    getKillGoodInfo(params){
      return fetch('kill/getKillGoodInfo',params)
    },

    //秒杀场次
    getKillField(){
      return fetch('kill/getKillField')
    },

    // 提交秒杀审核中
    getUserKillList(params){
      return fetch('kill/getUserKillList',params)
    },
    //撤销/下架秒杀商品
    lowerFrameGood(params){
        return fetch('kill/LowerFrameGood',params)
    },
    getProvince(params){
        return fetch('region/getProvinceInfo')
    },
    getCity(params){
        return fetch('region/getCity',params)
    },
    userEditInfo(params){
        return fetch('user/userEditInfo',params)
    },
    getUserInfo(params){
        return fetch('user/getUserInfo',params)
    },
    getUserAuth(params){
        return fetch('user/getUserAuth')
    },
    addUserAuth(params){
        return fetch('user/addUserAuth',params)
    },
}
