import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "首页",
    meta: { hidden: true, title: "首页" },
    component: () => import("../views/home/Home.vue"),
  },
  {
    path: "/playlist-detail/:id",
    meta: { hidden: true, title: "歌单详情" },
    name: "歌单详情",
    component: () => import("../views/playlist-detail/playlist-detail.vue"),
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

// 路由跳转前调用的钩子
router.beforeEach((to, form, next) => {
  // 路由改变修改title
  document.title = (to.meta.title as string) ?? "音乐网站";
  next(); // 进入目录如果不写就不会进入目录
});
export default router;
