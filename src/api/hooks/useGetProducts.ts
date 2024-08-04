import {
  type InfiniteData,
  useInfiniteQuery,
  type UseInfiniteQueryResult,
} from '@tanstack/react-query';

import type { ProductData } from '@/types';

import { fetchInstance } from '../instance';

type RequestParams = {
  categoryId: string;
  pageToken?: string;
  maxResults?: number;
};

type ProductsResponseData = {
  content: ProductData[];
  nextPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
};

type ProductsResponseRawData = {
  content: ProductData[]; // 변경된 부분: raw 데이터 구조를 API 명세에 맞게 수정
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  last: boolean;
};

const getProducts = async (params: RequestParams): Promise<ProductsResponseData> => {
  const queryParams = new URLSearchParams({
    categoryId: params.categoryId,
    sort: 'price,asc', // 정렬 기준을 명세에 맞춰 수정
    page: params.pageToken || '0',
    size: (params.maxResults || 20).toString(),
  });

  const response = await fetchInstance.get<ProductsResponseRawData>(
    `/api/products/categories/${params.categoryId}?${queryParams.toString()}`,
  );

  const data = response.data;

  return {
    content: data.content, // 변경된 부분: products는 data.data로
    nextPageToken: data.last === false ? (data.number + 1).toString() : undefined,
    pageInfo: {
      totalResults: data.totalElements,
      resultsPerPage: data.size,
    },
  };
};

type Params = Pick<RequestParams, 'maxResults' | 'categoryId'> & { initPageToken?: string };
export const useGetProducts = ({
  categoryId,
  maxResults = 20,
  initPageToken,
}: Params): UseInfiniteQueryResult<InfiniteData<ProductsResponseData>> => {
  return useInfiniteQuery({
    queryKey: ['products', categoryId, maxResults, initPageToken],
    queryFn: async ({ pageParam = initPageToken }) => {
      return getProducts({ categoryId, pageToken: pageParam, maxResults });
    },
    initialPageParam: initPageToken,
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
  });
};
