import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "index",
    meta: { title: "首页" },
    component: () => import("../views/home/Home.vue"),
  },
  {
    path: "/playlist-detail/:id",
    meta: { title: "歌单详情" },
    name: "playlist-detail",
    component: () => import("../views/playlist-detail/playlist-detail.vue"),
  },
  {
    path: "/search",
    meta: { title: "搜索" },
    name: "search",
    component: () => import("../views/search/search.vue"),
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
