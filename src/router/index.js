import { createRouter, createWebHashHistory  } from "vue-router";
import Login from "../views/account/Login.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
