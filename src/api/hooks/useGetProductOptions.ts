import { useQuery } from '@tanstack/react-query';

import type { ProductOptionsData } from '@/types';

import { fetchInstance } from '../instance';

type ProductDetailRequestParams = {
  productId: string;
};

const getProductOptionsPath = (productId: string) => `/api/products/${productId}/options`;

const getProductOptions = async ({ productId }: ProductDetailRequestParams) => {
  const response = await fetchInstance.get<ProductOptionsData[]>(getProductOptionsPath(productId));
  return response.data;
};

export const useGetProductOptions = ({ productId }: ProductDetailRequestParams) => {
  return useQuery({
    queryKey: ['productOptions', productId],
    queryFn: () => getProductOptions({ productId }),
  });
};
