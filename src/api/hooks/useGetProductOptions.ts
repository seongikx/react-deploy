import { useSuspenseQuery } from '@tanstack/react-query';

import type { ProductOptionsData } from '@/types';

import { fetchInstance } from '../instance';
import type { ProductDetailRequestParams } from './useGetProductDetail';

type Props = ProductDetailRequestParams;

export type ProductOptionsResponseData = ProductOptionsData[];

const getProductOptions = async (params: ProductDetailRequestParams) => {
  const response = await fetchInstance.get<ProductOptionsResponseData>(
    `/api/products/${params.productId}/options`,
  );
  return response.data;
};

export const useGetProductOptions = ({ productId }: Props) => {
  return useSuspenseQuery({
    queryKey: [`/api/products/${productId}/options`],
    queryFn: () => getProductOptions({ productId }),
  });
};
