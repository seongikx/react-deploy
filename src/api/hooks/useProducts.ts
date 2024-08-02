import axios from 'axios';

import { useApi } from '@/context/ApiContext'; // 추가

export const useProducts = () => {
  const { apiUrl } = useApi();

  const getCategories = async () => {
    const response = await axios.get(`${apiUrl}/api/categories`);
    return response.data;
  };

  const getProductsByCategory = async (categoryId: number) => {
    const response = await axios.get(`${apiUrl}/api/products/categories`, {
      params: { categoryId },
    });
    return response.data;
  };

  const getProductDetail = async (productId: number) => {
    const response = await axios.get(`${apiUrl}/api/products/${productId}`);
    return response.data;
  };

  return { getCategories, getProductsByCategory, getProductDetail };
};
