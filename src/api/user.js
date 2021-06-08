import service from '@/utils/request.js'


//用户新增
export function CreateUser(data){
   return service.request({
        method:'post',
        url:process.env.VUE_APP_APIURL_USER +'v1/user/create',
        data
    })
}

//用户列表
export function UserList(data){
    return service.request({
         method:'post',
         url:process.env.VUE_APP_APIURL_USER +'v1/user/lists',
         data
     })
 }

 //用户删除
export function UserRemove(data){
    return service.request({
         method:'post',
         url:process.env.VUE_APP_APIURL_USER +'v1/user/remove',
         data
     })
 }

  //用户状态
export function UserStatus(data){
    return service.request({
         method:'post',
         url:process.env.VUE_APP_APIURL_USER +'v1/user/status',
         data
     })
 }

 
  //用户详情
export function UserInfo(data){
    return service.request({
         method:'post',
         url:process.env.VUE_APP_APIURL_USER +'v1/user/info',
         data
     })
 }

 //用户编辑

 export function UserUpdate(data){
    return service.request({
         method:'post',
         url:process.env.VUE_APP_APIURL_USER +'v1/user/update',
         data
     })
 }
