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
    UserInfo() {
        return fetch('/userinfo')
    },
    UserData(params) {
        return fetch('/usercenter/indexdata')
    },
     //客服帮助
     getCustomerService(params){
        return fetch('service/getCustomerService',params)
    },
    // 账户资金
    Accountfunds(params){
        return fetch('user/getVoucherLogList?page=1')
    },
    getUserVoucher(params){
        return fetch('user/getUserVoucher')
    },
    getRechargeLog(params){
        return fetch('user/getRechargeLog?page=1')
    },
    //end
    //积分信息
    getUserIntegralLog(params){
        return fetch('integral/getUserIntegralLog?page=1')
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
        return fetch('usercenter/auditing',params)
    },
    //提交平推单数据
    createnormal(params){
        return fetch('usercenter/createnormal',params)
    },


    /*秒杀平台*/

    //获取秒杀平台的用户数据
    GetKillnum(params){
      return fetch('kill/getKillData')
    },

    //获取秒杀平台的规则
    getKillRule(params){
      return fetch('kill/getKillRule')
    },

    //获取秒杀平台的审核动态
    getKillDataDynamic(params){
      return fetch('kill/getKillDataDynamic')
    },

    //测试商品链接
    Killcheckout(params){
      return fetch('usercenter/checklink')
    },

    //提交秒杀
    saveKillGood(params){
      return fetch('kill/saveKillGood')
    },



    // 提交秒杀审核中
    getExamine(params){
      return fetch('kill/getExamine')
    },

    //获取提交秒杀未通过用户数据
    getKillRefuseGoods(params){
        return fetch('kill/getKillRefuseGoods')
      },

    //获取提交秒杀通过用户数据
    getKillExaminePass(params){
      return fetch('kill/getKillExaminePass')
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
}
