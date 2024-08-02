import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

import { fetchInstance } from '@/api/instance';

interface ApiContextProps {
  apiUrl: string;
  setApiUrl: (url: string) => void;
}

const ApiContext = createContext<ApiContextProps | undefined>(undefined);

export const ApiProvider = ({ children }: { children: ReactNode }) => {
  const [apiUrl, setApiUrl] = useState('http://3.17.81.229:8080'); // 기본 URL 설정

  useEffect(() => {
    // apiUrl이 변경될 때마다 axios 인스턴스의 baseURL을 업데이트
    fetchInstance.defaults.baseURL = apiUrl;
  }, [apiUrl]);

  return <ApiContext.Provider value={{ apiUrl, setApiUrl }}>{children}</ApiContext.Provider>;
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};
