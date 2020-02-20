import {BASEURL} from './url'

const fetch=({url,method='GET',data={},header={},tips='正在加载中...',isNeedAuth=true})=>{
   return new Promise((resolve,reject)=>{

    if(isNeedAuth){
        const my__token = uni.getStorageSync('my__token')
        if(my__token){
            header.Authorization = my__token
        }
    }

    // 提示
    uni.showLoading({
        title: tips
    });

    // 发起请求
    uni.request({
        url: `${BASEURL}${url}`, //仅为示例，并非真实接口地址。
        data:data,
        header:header,
        method,
        success: (res) => {
            resolve(res)
        },
        //  失败回调的函数
        fail:err=>{
            reject(err)
        },
        // 失败成功都回调的函数
        complete:()=>{
            // 隐藏提示
            uni.hideLoading();
        }
    });
   })
}

export {fetch}