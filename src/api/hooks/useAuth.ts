import axios from 'axios';

import { useApi } from '@/context/ApiContext';

export const useAuth = () => {
  const { apiUrl } = useApi();

  const register = async (email: string, password: string) => {
    const response = await axios.post(`${apiUrl}/api/members/register`, {
      email,
      password,
    });
    return response.data;
  };

  const login = async (email: string, password: string) => {
    const response = await axios.post(`${apiUrl}/api/members/login`, {
      email,
      password,
    });
    localStorage.setItem('token', response.data.token); // 토큰 저장
    return response.data;
  };

  return { register, login };
};
