// import configUrl from "@configs";
// import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
// import ROUTE from "@constants/routes";
// import { notifyFailed } from "@utils/notifyUtils";
// import { getToken, isLoggedIn } from "@utils/loginUtil";

import ROUTE from '@constants/route';
import { getAuthToken } from '@utils/loginUtils';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

function authInterceptor(config: AxiosRequestConfig) {
  const token = getAuthToken();
  if (token && config?.headers) {
    config.headers.Authorization = token
      ? `Bearer ${JSON.parse(token)}`
      : undefined;
  }

  return config;
}

function registerInterceptors(axiosInstance: AxiosInstance) {
  axiosInstance.interceptors.request.use(
    config => {
      return authInterceptor(config);
    },
    error => {
      // Do something with request error
      return Promise.reject(error);
    },
  );

  // Add a response interceptor
  axiosInstance.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      // console.log({ errorAPIClient: error });

      // Do something with error
      switch (error?.response?.status) {
        // case 400:
        //   notifyFailed(
        //     'ไม่สามารถดำเนินการต่อได้ 400',
        //     error?.response?.data?.message
        //   );
        //   break;
        case 401:
          window.location.href = ROUTE.HOME;
          return Promise.reject(error);
        // case 403:
        //   notifyFailed('Permission Denied 403', error?.response?.data?.message);
        //   return Promise.reject(error);
        // case 404:
        //   notifyFailed('ไม่พบข้อมูล 404', error?.response?.data?.message);
        //   return Promise.reject(error);
        // case 500:
        //   notifyFailed('เกิดข้อผิดพลาด 500', error?.response?.data?.message);
        //   return Promise.reject(error);
        // default:
        //   return Promise.reject(error);
      }
      // console.log('api-client.ts', { error, status: error?.response?.status });

      return Promise.reject(error);
    },
  );
}

class ApiClient {
  static getAxioInstance() {
    if (!this.axiosInstance) {
      this.axiosInstance = axios.create();
      registerInterceptors(this.axiosInstance);
    }
    return this.axiosInstance;
  }

  static getAxioExternalInstance() {
    if (!this.axiosExternalInstance) {
      this.axiosExternalInstance = axios.create();
    }
    return this.axiosExternalInstance;
  }
  private static axiosInstance?: AxiosInstance;
  private static axiosExternalInstance?: AxiosInstance;
}

const apiClient = ApiClient.getAxioInstance();
const apiExternal = ApiClient.getAxioExternalInstance();

export { apiClient, apiExternal };
