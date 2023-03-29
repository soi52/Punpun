import styled from 'styled-components';

import ChMainMessage from '../ChMainMessage';
import PrevBookings from './PrevBookings';

const ComponentStyle = styled.div`
  padding: 20px;
`;

const BookingList = () => {

  return (
    <ComponentStyle>
      <ChMainMessage/>
      <h2>이전 예약 내역</h2>
      <PrevBookings/>
    </ComponentStyle>
  );
};

export default BookingList;
