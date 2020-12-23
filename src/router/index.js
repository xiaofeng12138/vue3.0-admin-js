import { createRouter, createWebHashHistory  } from "vue-router";
import Login from "../views/account/Login.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: ()=>import('@/views/account/Register')
  },
  {
    path: "/forget",
    name: "Forget",
    component: ()=>import('@/views/account/Forget')
  },
  {
    path: "/index",
    name: "Index",
    component: ()=>import('@/views/layout/index')
  },
  
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
