import service from '@/utils/request.js'


//用户菜单
export function CreateMenu(data){
   return service.request({
        method:'post',
        url:process.env.VUE_APP_APIURL_USER +'v1/menu/create',
        data
    })
}



//用户菜单树形列表
export function MenuListTree(data){
    return service.request({
         method:'post',
         url:process.env.VUE_APP_APIURL_USER +'v1/menu/listsTree ',
         data
     })
 }


 //正常列表 lists 
 export function MenuList(data){
    return service.request({
         method:'post',
         url:process.env.VUE_APP_APIURL_USER +'v1/menu/lists ',
         data
     })
 }


 

 //查看菜单详情
 export function MenuDetailed(data){
    return service.request({
         method:'post',
         url:process.env.VUE_APP_APIURL_USER +'v1/menu/detailed',
         data
     })
 }

  //修改菜单详情
  export function MenuUpdate (data){
    return service.request({
         method:'post',
         url:process.env.VUE_APP_APIURL_USER +'v1/menu/update ',
         data
     })
 }

  //修改菜单删除
  export function MenuRemove (data){
    return service.request({
         method:'post',
         url:process.env.VUE_APP_APIURL_USER +'v1/menu/remove ',
         data
     })
 }
  
