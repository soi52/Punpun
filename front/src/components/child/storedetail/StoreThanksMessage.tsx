import styled from 'styled-components';
import ReviewItem from '../../ui/ReviewItem';
import StoreBanner from './Storebanner';
import API from '../../../store/API';
import { useEffect, useState } from 'react';

const Wrapper = styled.div`
  padding: 20px;
`;

const Div = styled.div`
  padding-top: 10px;
`;

type Props = {
  myStoreId: string | undefined;
};

type Review = {
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

const StoreThanksMessage = ({ myStoreId }: Props) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [storeName, setStoreName] = useState();

  useEffect(() => {
    API.get(`reviews/stores/${myStoreId}`)
      .then((response) => {
        setReviews(response.data.content);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);

  useEffect(() => {
    API.get(`stores/${myStoreId}`)
      .then((response) => {
        setStoreName(response.data.storeName);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);

  return (
    <Wrapper>
      <StoreBanner storeName={storeName} />
      <Div>
        <h2>감사메세지</h2>
        <ReviewItem reviews={reviews} />
      </Div>
    </Wrapper>
  );
};

export default StoreThanksMessage;
