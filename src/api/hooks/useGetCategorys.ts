import { useQuery } from '@tanstack/react-query';

import type { CategoryData } from '@/types';

import { fetchInstance } from '../instance';

export type CategoryResponseData = CategoryData[];

const getCategories = async () => {
  const response = await fetchInstance.get<CategoryResponseData>('/api/categories');
  return response.data;
};

export const useGetCategories = () =>
  useQuery({
    queryKey: ['/api/categories'],
    queryFn: getCategories,
  });
