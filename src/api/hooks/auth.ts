import { fetchInstance } from '../instance';

interface AuthResponse {
  data: {
    email: string;
    token: string;
  };
}

export const register = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await fetchInstance.post<AuthResponse>('/api/members/register', {
    email,
    password,
  });
  return response.data;
};

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await fetchInstance.post<AuthResponse>('/api/members/login', {
    email,
    password,
  });
  return response.data;
};
