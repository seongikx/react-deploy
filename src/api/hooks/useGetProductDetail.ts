import { useSuspenseQuery } from '@tanstack/react-query';

import type { ProductData } from '@/types';

import { fetchInstance } from '../instance';

export type ProductDetailRequestParams = {
  productId: string;
};

type Props = ProductDetailRequestParams;

export type GoodsDetailResponseData = ProductData;

const getProductDetail = async (params: ProductDetailRequestParams) => {
  const response = await fetchInstance.get<GoodsDetailResponseData>(
    `/api/products/${params.productId}`,
  );
  return response.data;
};

export const useGetProductDetail = ({ productId }: Props) => {
  return useSuspenseQuery({
    queryKey: [`/api/products/${productId}`],
    queryFn: () => getProductDetail({ productId }),
  });
};
