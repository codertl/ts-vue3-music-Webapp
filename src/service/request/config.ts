export let BASE_URL = "";
export const TIME_OUT = 1000;
// 根据process.env.NODE_ENV区分
// 开发环境 development
// 生产环境 production
// 测试环境 test
if (import.meta.env.MODE === "development") {
  BASE_URL = "/api";
} else if (import.meta.env.MODE === "production") {
  BASE_URL = "/api";
} else {
  BASE_URL = "/api";
}
