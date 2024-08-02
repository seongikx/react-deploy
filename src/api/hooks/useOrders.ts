import axios from 'axios';

import { useApi } from '@/context/ApiContext';

export const useOrders = () => {
  const { apiUrl } = useApi();

  const placeOrder = async (optionId: number, quantity: number, message: string, point: number) => {
    const response = await axios.post(
      `${apiUrl}/api/orders`,
      { optionId, quantity, message, point },
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } },
    );
    return response.data;
  };

  const getOrderList = async (page: number, size: number, sort: string) => {
    const response = await axios.get(`${apiUrl}/api/orders`, {
      params: { page, size, sort },
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
  };

  return { placeOrder, getOrderList };
};
