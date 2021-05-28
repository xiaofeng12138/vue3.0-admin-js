import service from '@/utils/request.js'


//用户新增
export function CreateUser(data){
   return service.request({
        method:'post',
        url:process.env.VUE_APP_APIURL_USER +'v1/user/create',
        data
    })
}

export function UserList(data){
    return service.request({
         method:'post',
         url:process.env.VUE_APP_APIURL_USER +'v1/user/lists',
         data
     })
 }
