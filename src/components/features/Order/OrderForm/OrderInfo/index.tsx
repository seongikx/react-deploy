import { Box, Divider, Input, Text } from '@chakra-ui/react'; // 필요한 컴포넌트 추가
import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';
import { fetchInstance } from '@/api/instance'; // fetchInstance import
import { Button } from '@/components/common/Button';
import { Spacing } from '@/components/common/layouts/Spacing';
import { useAuth } from '@/provider/Auth'; // useAuth import
import type { OrderHistory } from '@/types';

import { HeadingText } from '../Common/HeadingText';
import { LabelText } from '../Common/LabelText';
import { CashReceiptFields } from '../Fields/CashReceiptFields';

type Props = {
  orderHistory: OrderHistory;
};

export const OrderFormOrderInfo = ({ orderHistory }: Props) => {
  const { id, count } = orderHistory;
  const authInfo = useAuth();
  const [points, setPoints] = useState<number>(0); // 보유 포인트 상태
  const { data: detail } = useGetProductDetail({ productId: id.toString() });
  const { watch, setValue } = useFormContext();
  const pointsUsed = watch('pointsUsed'); // 사용 포인트 값 추적

  const totalPrice = (detail?.data.price ?? 0) * count; // 가격이 로드되지 않은 경우 0으로 처리
  const finalPrice = Math.max(0, totalPrice - pointsUsed); // 포인트 차감 후 최소 0원

  // 포인트 조회
  const fetchPoints = useCallback(async () => {
    try {
      const response = await fetchInstance.get('/api/members/points', {
        headers: {
          Authorization: `Bearer ${authInfo?.token || ''}`,
        },
      });
      setPoints(response.data.data.points);
    } catch (error) {
      console.error('포인트 조회 실패', error);
    }
  }, [authInfo]);

  useEffect(() => {
    fetchPoints();
  }, [fetchPoints]);

  return (
    <Wrapper>
      <Title>
        <HeadingText>결제 정보</HeadingText>
      </Title>
      <Divider color="#ededed" />
      <CashReceiptFields />
      <Divider color="#ededed" />

      {/* 포인트 사용 입력 */}
      <Box mt={4} p={4} borderWidth={1} borderRadius={8}>
        <Text fontSize="lg" fontWeight="bold">
          현재 보유 포인트: {points}점
        </Text>
        <Text fontSize="lg" mt={2}>
          사용할 포인트:
        </Text>
        <Input
          type="number"
          value={pointsUsed}
          onChange={(e) => {
            const value = Number(e.target.value);
            setValue('pointsUsed', Math.min(value, points)); // 사용 가능한 최대 포인트는 보유 포인트
          }}
          max={points}
          min={0}
        />
        <Text fontSize="lg" mt={2} color="teal.500">
          총 결제 금액: {finalPrice.toLocaleString()}원
        </Text>
      </Box>

      <ItemWrapper>
        <LabelText>최종 결제금액</LabelText>
        <HeadingText>{finalPrice}원</HeadingText>
      </ItemWrapper>
      <Divider color="#ededed" />
      <Spacing height={32} />
      <Button type="submit" data-testid="savebutton">
        {finalPrice}원 결제하기
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  border-left: 1px solid #ededed;
  border-right: 1px solid #ededed;
  padding: 16px;
`;

const Title = styled.h6`
  padding: 24px 0 20px;
`;

const ItemWrapper = styled.div`
  padding: 16px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
