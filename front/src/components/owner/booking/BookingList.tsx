import styled from 'styled-components';
import StoreInfo from '../StoreInfo';
import BookingFix from './BookingFix';
import BookingRequest from './BookingRequest';

interface Booking {
  id: number;
  name: string;
  date: string;
  time: string;
}

interface BookingListProps {
  bookings: Booking[];
}

const Wrapper = styled.div`
  padding: 20px;
`;

const BookingContainer = styled.div`
  display: flex;
  justify-content: center;
`;

function BookingList() {
  const bookings: Booking[] = [
    { id: 1, name: 'John', date: '2022-03-20', time: '10:00' },
    { id: 2, name: 'Jane', date: '2022-03-21', time: '14:00' },
    { id: 3, name: 'Bob', date: '2022-03-22', time: '16:00' },
  ];

  return (
    <Wrapper>
      <StoreInfo />
      <BookingContainer>
        <div>
          <h2>예약 요청 목록</h2>
          <BookingRequest bookings={bookings} />
        </div>
        <div>
          <h2>예약 확정 목록</h2>
          <BookingFix bookings={bookings} />
        </div>
      </BookingContainer>
    </Wrapper>
  );
}

export default BookingList;
