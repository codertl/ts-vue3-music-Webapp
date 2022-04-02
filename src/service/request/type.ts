import type { AxiosRequestConfig, AxiosResponse } from "axios";
interface tlInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (err: any) => any;
  responseInterceptor?: (res: T) => T;
  responseInterceptorCatch?: (err: any) => any;
}
interface tlConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: tlInterceptors<T>;
  showLoading?: boolean;
}

export { tlInterceptors, tlConfig };
