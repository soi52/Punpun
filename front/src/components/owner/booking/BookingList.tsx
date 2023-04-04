import StoreInfo from '../StoreInfo';
import PrevBookings from './PrevBookings';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 20px;
`;

function BookingList() {
  return (
    <Wrapper>
      <StoreInfo />
      <h2>이전 예약 내역</h2>
      <PrevBookings />
    </Wrapper>
  );
}
export default BookingList;
