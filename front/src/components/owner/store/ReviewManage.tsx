import styled from 'styled-components';
import MainMessage from '../../ui/MainMessage';
import MainTitle from '../../ui/MainTitle';
import ReviewItem from '../../ui/ReviewItem';
import Storename from '../Storename';

const Wrapper = styled.div`
  padding: 20px;
`;

function ReviewManage() {
  const title = '따뜻한 사랑과 건강한 식사를 나눠주시는';
  const ownername = '박정은 사장님';
  const message = ownername + ', ' + '어느새 10번의 식사 나눔을 하셨네요!';
  const name = '싸피식당';
  return (
    <Wrapper>
      <h2>
        <MainTitle title={title} />
        <Storename name={name} />
      </h2>
      <MainMessage message={message} />
      <h2>감사인사 목록</h2>
      <ReviewItem />
    </Wrapper>
  );
}
export default ReviewManage;
