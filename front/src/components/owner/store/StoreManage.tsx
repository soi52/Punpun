import styled from 'styled-components';
import MainMessage from '../../ui/MainMessage';
import MainTitle from '../../ui/MainTitle';

const Wrapper = styled.div`
  padding: 20px;
`;

function StoreManage() {
  const storeInfo = {
    title: '따뜻한 사랑과 건강한 식사를 나눠주시는',
    ownerName: '김싸피 사장님',
    message: '어느새 10번의 식사 나눔을 하셨네요!',
    name: '싸피식당',
  };
  return (
    <Wrapper>
      <h2>
        <MainTitle title={`${storeInfo.title} ${storeInfo.name}`} />
      </h2>
      <MainMessage message={`${storeInfo.ownerName}, ${storeInfo.message}`} />
      <h2>가게 정보</h2>
      <button>수정하기</button>
    </Wrapper>
  );
}
export default StoreManage;
