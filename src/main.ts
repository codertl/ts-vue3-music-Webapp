import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import { globalRegister } from "./global";
import "default-passive-events";
import "./assets/js/rem";
import "./assets/css/index.less";
import "./assets/font/iconfont";
import directive from "./directive";
import { setupStore } from "@/store";
const app = createApp(App)
  .use(store)
  .use(router)
  .use(globalRegister)
  .use(directive)
  .mount("#app");

// 数据初始化
setupStore();
