import axios from 'axios';

import { useApi } from '@/context/ApiContext';

export const useWishlist = () => {
  const { apiUrl } = useApi();

  const getWishlist = async (page: number, size: number, sort: string) => {
    const response = await axios.get(`${apiUrl}/api/wishes`, {
      params: { page, size, sort },
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
  };

  const addToWishlist = async (productId: number) => {
    const response = await axios.post(
      `${apiUrl}/api/wishes`,
      { productId },
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } },
    );
    return response.data;
  };

  const removeFromWishlist = async (wishId: number) => {
    const response = await axios.delete(`${apiUrl}/api/wishes/${wishId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.status === 204;
  };

  return { getWishlist, addToWishlist, removeFromWishlist };
};
