import styled from 'styled-components';
import MainMessage from '../../ui/MainMessage';
import MainTitle from '../../ui/MainTitle';

const Wrapper = styled.div`
  padding-left: 20px;
`;

function StoreManage() {
  const title = '따뜻한 사랑과 건강한 식사를 나눠주시는';
  const message = '어느새 10번의 식사 나눔을 하셨네요!';
  return (
    <Wrapper>
      <MainTitle title={title} />
      <MainMessage message={message} />
    </Wrapper>
  );
}
export default StoreManage;
