import axios from 'axios'

const api = axios.create();
api.defaults.baseURL = 'http://dev.ruomengtv.com/api';
api.defaults.timeout = 5000;
api.defaults.headers.post['Content-Type'] = 'application/json';
api.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'


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
)


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
    Accountfunds(params){
        return fetch('user/getVoucherLogList?page=1')
    }

}