import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { reviewState } from '../../../store/atoms';
import ReviewItem from '../../ui/ReviewItem';
import StoreBanner from './Storebanner';
import API from '../../../store/API';
import { useEffect, useState } from 'react';

type Props = {
  myStoreId: string | undefined;
};

const StoreThanksMessage = ({ myStoreId }: Props) => {
  const [reviews, setReviews] = useRecoilState(reviewState);
  const [storeName, setStoreName] = useState();

  useEffect(() => {
    API.get(`reviews/stores/${myStoreId}`)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  useEffect(() => {
    API.get(`stores/${myStoreId}`)
      .then((response) => {
        setStoreName(response.data.storeName);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <>
      <StoreBanner storeName={storeName} />
      {/* <ReviewItem reviews={reviews} /> */}
    </>
  );
};

export default StoreThanksMessage;
