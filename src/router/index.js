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
    meta:{
      title:'首页',
      icon:'home'
    },
    children:[
      {
        path: "/home",
        name: "Home",
        component: ()=>import('@/views/home/index'),
        meta:{
          title:'首页',
          icon:'home'
        },
      }
    ]
  },
  {
    path: "/adminIndex",
    name: "AdminIndex",
    component: ()=>import('@/views/layout/index'),
    meta:{
      title:'管理总台',
      icon:'console'
    },
    children:[
      {
        path: "/role",
        name: "Role",
        component: ()=>import('@/views/admin/role.vue'),
        meta:{
          title:'角色管理',
          icon:'role'
        },
      },
      {
        path: "/role3",
        name: "Role3",
        component: ()=>import('@/views/admin/role.vue'),
        meta:{
          title:'用户管理',
          icon:'user'
        },
      },
      {
        path: "/role3",
        name: "Role3",
        component: ()=>import('@/views/admin/role.vue'),
        meta:{
          title:'菜单管理',
          icon:'user'
        },
      }
    ]
  },
  {
    path: "/news",
    name: "New",
    component: ()=>import('@/views/layout/index'),
    // hidden:true,
    meta:{
      title:'信息管理',
      icon:'informtion'
    },
    children:[
      {
        path: "/newsList",
        name: "NesList",
        component: ()=>import('@/views/info/index'),
        meta:{
          title:'信息管理',
        },
      }
    ]
  },
  {
    path: "/product",
    name: " Product",
    component: ()=>import('@/views/layout/index'),
    // hidden:true,
    meta:{
      title:'产品管理',
      icon:'product'
    },
    children:[
      {
        path: "/productList",
        name: "ProductList",
        component: ()=>import('@/views/product/index'),
        meta:{
          title:'产品管理',
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
