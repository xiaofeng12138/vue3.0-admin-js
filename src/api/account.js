import service from '@/utils/request.js'


export function GetCode(data){
    service.request({
        method:'post',
        url:'/getCode/',
        data
    })
}