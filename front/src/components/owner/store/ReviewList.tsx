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

const Div = styled.div`
  padding-top: 10px;
`;

export type Review = {
  reviewId: number;
  reviewContent: string;
  reviewCreatedTime: string;
  keywords: {
    content: string;
    createdDateTime: string;
    lastModifiedDateTime: string;
    id: number;
  }[];
  childId: number;
  childName: string;
  childProfileUrl: string;
};

function ReviewList() {
  const [owReviews, setOwReviews] = useState<Review[]>([]); // 배열 상태를 명시합니다.
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
      <Div>
        <h2>감사인사 목록</h2>
        <ReviewItem reviews={owReviews} />
      </Div>
    </Wrapper>
  );
}

export default ReviewList;
