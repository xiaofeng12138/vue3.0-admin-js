import service from '@/utils/request.js'


//用户菜单
export function CreateMenu(data){
   return service.request({
        method:'post',
        url:process.env.VUE_APP_APIURL_USER +'v1/menu/create',
        data
    })
}
