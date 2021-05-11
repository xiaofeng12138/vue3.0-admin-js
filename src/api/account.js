import service from '@/utils/request.js'


//获取验证码
export function Send(data){
   return service.request({
        method:'post',
        url:process.env.VUE_APP_APIURL +'v1/send',
        data
    })
}

//检测用户名
export function checkUserName(data){
    return service.request({
        method:'post',
        url:process.env.VUE_APP_APIURL +'v1/account/check',
        data
    })
}

//用户注册接口
export function Register(data){
    return service.request({
        method:'post',
        url:process.env.VUE_APP_APIURL +'v1/account/register',
        data
    })
}


//用户登录
export function Login(data){
    return service.request({
        method:'post',
        url:process.env.VUE_APP_APIURL +'v1/account/login',
        data
    })
}

