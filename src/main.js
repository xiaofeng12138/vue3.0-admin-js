import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import './js/svg'
import Axios from 'axios'
import Svgicon from './components/svgicon/index.vue' //引入全局组件

import i18n from './language/index'

//引入导航守卫
import './router/permit'
//V3 全局注入


const app = createApp(App)

app.config.globalProperties.$axios = Axios


app
  .use(store)
  .use(router)
  .use(Antd)
  .use(i18n)
  .component('svg-icon',Svgicon)
  .mount("#app");
