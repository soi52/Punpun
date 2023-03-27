import { useRecoilValue } from 'recoil';
import { reviewState } from '../../store/atoms';
import ReviewItem from '../ui/ReviewItem';

const MessageForSupport = () => {
  const reviews = useRecoilValue(reviewState);
  return <ReviewItem reviews={reviews} />;
};

export default MessageForSupport;
