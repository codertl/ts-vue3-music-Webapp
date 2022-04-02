import axios from "axios";
import type { AxiosInstance } from "axios";
import type { tlInterceptors, tlConfig } from "./type";
import type { LoadingInstance } from "element-plus/lib/components/loading/src/loading";
import { ElLoading } from "element-plus";
import store from "@/store";
// 单独引入 loading 样式
import "element-plus/theme-chalk/el-loading.css";

const DEFAULT_LOADING = false;

class TLRequest {
  instance: AxiosInstance;
  interceptors?: tlInterceptors;
  showLoading: boolean;
  loading?: LoadingInstance;
  constructor(config: tlConfig) {
    // 创建axios实例
    this.instance = axios.create(config);

    // 保存基本信息
    this.interceptors = config.interceptors;
    this.showLoading = config.showLoading ?? DEFAULT_LOADING;

    // 1.从config中取出的拦截器是对应实例的拦截器
    // 请求拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    // 响应拦截器
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );

    // 2.添加所有实例的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 显示loading
        store.commit("showLoading");
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: "正在请求数据...",
            background: "rgba(0, 0, 0, 0.5)",
          });
        }
        return config;
      },
      (err) => {
        store.commit("hideLoading");
        return err;
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        // 关闭loading
        store.commit("hideLoading");
        this.loading?.close();
        const data = res.data ?? res;
        if (data.returnCode === "-1001") {
          console.log("请求错误~");
        } else {
          return data;
        }
      },
      (err) => {
        // 关闭loading
        store.commit("hideLoading");
        this.loading?.close();
        // 例子: 判断不同的HttpErrorCode显示不同的错误信息
        if (err.response.status === 404) {
          console.log("404的错误~");
        }
        return err;
      }
    );
  }
  request<T>(config: tlConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1.单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }
      // 判断是否显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading;
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          // 将showLoading设置会true，这样不影响下一个请求
          this.showLoading = DEFAULT_LOADING;

          // 将结果 resolve 返回出去
          resolve(res);
        })
        .catch((err) => {
          // 将showLoading设置会true，这样不影响下一个请求
          // this.showLoading = DEFAULT_LOADING;

          // 将 reject 返回出去
          reject(err);
          return err;
        });
    });
  }
  get<T>(config: tlConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "GET" });
  }
  post<T>(config: tlConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "POST" });
  }
  delete<T>(config: tlConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" });
  }
  patch<T>(config: tlConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PATCH" });
  }
}

export default TLRequest;
