import { createRouter, createWebHashHistory  } from "vue-router";
import Login from "../views/account/Login.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    hidden:true,
    meta:{
      title:'登录'
    }
  },
  {
    path: "/register",
    name: "Register",
    component: ()=>import('@/views/account/Register'),
    hidden:true,
    meta:{
      title:'注册'
    }
  },
  {
    path: "/forget",
    name: "Forget",
    component: ()=>import('@/views/account/Forget'),
    hidden:true,
    meta:{
      title:'忘记密码'
    }
  },
  {
    path: "/index",
    name: "Index",
    component: ()=>import('@/views/layout/index'),
    // hidden:true,
    meta:{
      title:'首页'
    }
  },
  {
    path: "/adminIndex",
    name: "AdminIndex",
    component: ()=>import('@/views/layout/index'),
    meta:{
      title:'管理系统'
    },
    children:[
      {
        path: "/role",
        name: "Role",
        component: ()=>import('@/views/admin/role.vue'),
        meta:{
          title:'角色管理'
        },
      }
    ]
  },
  
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
