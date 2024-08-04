import type { ReactNode } from 'react';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { initInstance } from '../api/instance';

interface ApiContextType {
  apiUrl: string;
  setApiUrl: (url: string) => void;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 세션 스토리지에서 API URL을 가져오거나 기본 URL로 초기화합니다.
  const initialUrl = sessionStorage.getItem('apiUrl') || 'http://3.34.182.32:8080';
  const [apiUrl, setApiUrlState] = useState(initialUrl);

  useEffect(() => {
    sessionStorage.setItem('apiUrl', apiUrl); // API URL 변경 시 세션 스토리지에 저장
  }, [apiUrl]);

  const setApiUrl = (url: string) => {
    setApiUrlState(url);
    sessionStorage.setItem('apiUrl', url); // API URL 변경 시 세션 스토리지에 저장
  };

  // axios 인스턴스를 URL 변경 시마다 업데이트합니다.
  initInstance({ baseURL: apiUrl });

  return <ApiContext.Provider value={{ apiUrl, setApiUrl }}>{children}</ApiContext.Provider>;
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};
