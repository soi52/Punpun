import styled from 'styled-components';

import MainTitle from '../../ui/MainTitle';
import MainMessage from '../../ui/MainMessage';

const ComponentStyle = styled.div`
  padding: 20px;
`;

const BookingList = () => {
  const storeInfo = {
    title: '',
    ownerName: '정은 학생',
    message: '오늘도 맛있는 밥 먹어요~!',
    name: '박정은 학생',
  };

  return (
    <ComponentStyle>
      <h2>
        <MainTitle title={`${storeInfo.name} ${storeInfo.title}`} />
      </h2>
      <MainMessage message={`${storeInfo.ownerName}, ${storeInfo.message}`} />
      <h2>이전 예약 내역</h2>
    </ComponentStyle>
  );
};

export default BookingList;
