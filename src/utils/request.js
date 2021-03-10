import axios from 'axios'

const service = axios.create({
    baseURL:'/api',
    timeout:500000,
})

console.log(process.env.VUE_APP_FLAG)


service.interceptors.request.use(function(config){
    return config
},(error)=>{
    return Promise.reject(error)
})



service.interceptors.response.use(function(response){
   return response
},(error)=>{

    return Promise.reject(error)
})

export default service