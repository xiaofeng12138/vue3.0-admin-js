import Router from './index'
import {GetToken} from '@/utils/cookie.js'

Router.beforeEach((to,form,next) => {
  console.log(GetToken())
   if(GetToken()){
     next()
   }else{
     if(to.name == 'Login'){
       next()   //确认进入
     }else{
      next({name:"Login"})   //确认跳转进入
     }
   }
})