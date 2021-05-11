import Cookie from 'js-cookie'

const token = 'adminToken'
const username = 'adminusername'

//设置token
export function SetToken(params){Cookie.set(token,params.token)}
export function GetToken(){return Cookie.get(token)}
export function RemoveToken(){Cookie.remove(token)}

//设置username
export function SetUsername(params){Cookie.set(username,params.username)}
export function GetUsername(){return Cookie.get(username)}
export function RemoveUsername(){Cookie.remove(username)}


