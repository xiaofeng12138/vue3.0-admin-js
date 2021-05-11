import axios from 'axios'
import { message } from 'ant-design-vue';
const service = axios.create({
    //baseURL:'/api',
    baseURL:'',
    timeout:500000,
})

//请求拦截
service.interceptors.request.use(function(config){
    return config
},(error)=>{
    return Promise.reject(error)
})


//响应拦截
service.interceptors.response.use(function(response){
    const data = response.data
    if(data.error_code === 0){
        return Promise.resolve(data)
    }else{
        message.error(data.message)
        return Promise.reject(data)
    }
},function(error){
    return Promise.reject(error)
})

export default service