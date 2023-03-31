import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import API from '../../../store/API';
import { selectedStoreState } from '../../../store/atoms';
import ReviewItem from '../../ui/ReviewItem';
import StoreInfo from '../StoreInfo';

const Wrapper = styled.div`
  padding: 20px;
`;

interface Reviews {
  reviewId: number;
  reviewContent: string;
  keywords: { content: string }[]; // keywords 배열 요소 타입을 정의합니다.
  childId: number;
  childName: string;
  childProfileUrl: string;
}

function ReviewList() {
  const [owReviews, setOwReviews] = useState<Reviews[]>([]); // 배열 상태를 명시합니다.
  const selectedStore = useRecoilValue(selectedStoreState);

  useEffect(() => {
    API.get(`reviews/stores/${selectedStore?.storeId}`)
      .then((response: any) => {
        console.log(response.data.content); // 받아온 데이터를 owReviews에 업데이트합니다.
        setOwReviews(response.data.content); // 받아온 데이터를 owReviews에 업데이트합니다.
      })
      .catch((error: any) => {
        console.error(error);
      });
  }, [selectedStore?.storeId]);

  return (
    <Wrapper>
      <StoreInfo />
      <h2>감사인사 목록</h2>
      <ReviewItem reviews={owReviews} />
    </Wrapper>
  );
}

export default ReviewList;
