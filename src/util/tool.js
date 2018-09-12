import store from '../vuex/store'
// import crypto from "crypto"

/** 
*   Toast公共方法
*/
export function toast(str, icon) {
    store.dispatch('showToast', true)
    if (icon == 'success') {
        store.dispatch('showSuccess', true)
        store.dispatch('showFail', false)
    } else {
         store.dispatch('showSuccess', false)
        store.dispatch('showFail', true)
    }
    store.dispatch('toastMsg',str);
    setTimeout(() => {
        store.dispatch('showToast', false); 
    },1500); 
}

/**
 * dialog公共方法
 */

export function alert(str) {
    store.dispatch('showAlert', true)
    store.dispatch('alertMsg', str)
    setTimeout(() => {
        store.dispatch('showAlert', false); 
    },1500);
}

export function cryptPwd(password) {
    var md5 = crypto.createHash('md5');
    return md5.update(password).digest('hex');
}

export function formatDate (date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};

function padLeftZero (str) {
    return ('00' + str).substr(str.length);
};
