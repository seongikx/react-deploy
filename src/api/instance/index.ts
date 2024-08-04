import { QueryClient } from '@tanstack/react-query';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';

import { authSessionStorage } from '@/utils/storage';

export const initInstance = (config: AxiosRequestConfig): AxiosInstance => {
  const instance = axios.create({
    timeout: 5000,
    ...config,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...config.headers,
    },
  });
  instance.interceptors.response.use(
    (response) => {
      if (response.data) {
        return response.data;
      }

      return response;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
  instance.interceptors.request.use(
    (conf) => {
      const token = authSessionStorage.get();

      if (token) {
        conf.headers.Authorization = `Bearer ${token}`;
      }
      return conf;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  return instance;
};

// 초기 인스턴스 생성
export const fetchInstance = initInstance({
  baseURL: sessionStorage.getItem('apiUrl') || 'http://3.34.182.32:8080', // 세션 스토리지에서 가져오기
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    },
  },
});
