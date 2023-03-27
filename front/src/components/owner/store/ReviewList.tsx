import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { reviewState } from '../../../store/atoms';
import ReviewItem from '../../ui/ReviewItem';
import StoreInfo from '../StoreInfo';

const Wrapper = styled.div`
  padding: 20px;
`;

function ReviewList() {
  const reviews = useRecoilValue(reviewState);

  return (
    <Wrapper>
      <StoreInfo />
      <h2>감사인사 목록</h2>
      <ReviewItem reviews={reviews} />
    </Wrapper>
  );
}

export default ReviewList;
