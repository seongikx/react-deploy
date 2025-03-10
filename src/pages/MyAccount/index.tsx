import { Box, Button as ChakraButton, Grid, GridItem, Image, Stack, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import type { Wish } from '@/api/hooks/wishes';
import { getWishes, removeWish } from '@/api/hooks/wishes';
import { fetchInstance } from '@/api/instance';
import { Button } from '@/components/common/Button';
import { Spacing } from '@/components/common/layouts/Spacing';
import { RouterPath } from '@/routes/path';
import { authSessionStorage } from '@/utils/storage';

export const MyAccountPage = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [points, setPoints] = useState<number>(0);

  const fetchWishes = async () => {
    try {
      const data = await getWishes(0, 10, 'createdDate,desc');
      setWishes(data.content);
    } catch (error) {
      console.error('Failed to fetch wishes', error);
    }
  };

  const fetchPoints = async () => {
    try {
      const response = await fetchInstance.get('/api/members/points');
      setPoints(response.data.points);
    } catch (error) {
      console.error('Failed to fetch points', error);
    }
  };

  const handleRemoveWish = async (wishId: number) => {
    try {
      await removeWish(wishId);
      fetchWishes();
    } catch (error) {
      console.error('Failed to remove wish', error);
    }
  };

  useEffect(() => {
    fetchWishes();
    fetchPoints();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    authSessionStorage.set(undefined);

    const redirectURL = `${process.env.PUBLIC_URL}${RouterPath.home}`;
    window.location.replace(redirectURL);
  };

  return (
    <Wrapper>
      <Text fontSize="2xl" fontWeight="bold">
        사용자님 안녕하세요!
      </Text>
      <Text fontSize="xl" fontWeight="bold" color="teal.500">
        현재 보유 포인트: {points}점
      </Text>
      <Spacing height={64} />
      <Button
        size="small"
        theme="darkGray"
        onClick={handleLogout}
        style={{
          maxWidth: '200px',
        }}
      >
        로그아웃
      </Button>
      <Spacing height={32} />
      <Grid templateColumns="repeat(auto-fill, minmax(240px, 1fr))" gap={6}>
        {wishes?.map((wish) => (
          <GridItem key={wish.id}>
            <Box
              p={4}
              borderWidth={1}
              borderRadius={8}
              boxShadow="lg"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="space-between"
              height="100%"
            >
              <Image
                src={wish.product.imageUrl}
                alt={wish.product.name}
                borderRadius={8}
                boxSize="150px"
                objectFit="cover"
              />
              <Stack spacing={3} mt={4} textAlign="center">
                <Text fontSize="lg" fontWeight="bold">
                  {wish.product.name}
                </Text>
                <Text>{wish.product.price.toLocaleString()}원</Text>
              </Stack>
              <ChakraButton
                colorScheme="red"
                onClick={() => handleRemoveWish(wish.id)}
                mt={4}
                width="full"
              >
                관심 삭제
              </ChakraButton>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 80px 20px 120px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 36px;
`;
