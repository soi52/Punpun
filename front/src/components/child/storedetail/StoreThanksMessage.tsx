import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { reviewState } from '../../../store/atoms';
import ReviewItem from '../../ui/ReviewItem';
import StoreBanner from './Storebanner';

const StoreThanksMessage = () => {
  const reviews = useRecoilValue(reviewState);
  return (
    <>
      <StoreBanner />
      <ReviewItem reviews={reviews} />
    </>
  );
};

export default StoreThanksMessage;
