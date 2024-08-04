import { fetchInstance } from '../instance';

// Wish 타입 정의 및 내보내기
export type Wish = {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  };
};

export const addWish = async (productId: number, token: string): Promise<void> => {
  try {
    await fetchInstance.post(
      '/api/wishes',
      { productId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (error) {
    console.error('Failed to add wish', error);
    throw error;
  }
};

export const removeWish = async (wishId: number, token: string): Promise<void> => {
  try {
    await fetchInstance.delete(`/api/wishes/${wishId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Failed to remove wish', error);
    throw error;
  }
};

export const getWishes = async (
  token: string,
  page: number = 0,
  size: number = 10,
  sort: string = 'createdDate,desc',
): Promise<{ data: { content: Wish[]; totalPages: number; totalElements: number } }> => {
  try {
    const response = await fetchInstance.get('/api/wishes', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        size,
        sort,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch wishes', error);
    throw error;
  }
};
