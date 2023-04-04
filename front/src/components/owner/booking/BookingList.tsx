import styled from 'styled-components';
import StoreInfo from '../StoreInfo';
import BookingFix from './BookingFix';
import BookingRequest from './BookingRequest';
import { useEffect, useState } from 'react';
import API from '../../../store/API';
import { useRecoilValue } from 'recoil';
import { selectedStoreState } from '../../../store/atoms';

interface Booking {
  id: number; // id 프로퍼티 추가
  childId: number;
  childName: string;
  menuId: number;
  menuName: string;
  reservationId: number;
  reservationSate: string;
  reservationTime: string;
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
  const selectedStore = useRecoilValue(selectedStoreState);
  const [bookings, setBookings] = useState<Booking[]>([]); // bookings의 타입을 명시적으로 지정

  useEffect(() => {
    API.get(`bookings/store/${selectedStore?.storeId}`)
      .then((response: any) => {
        console.log(response.data.content);
        setBookings(response.data.content);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <StoreInfo />
      <BookingContainer>
        <div>
          <h2>예약 요청 목록</h2>
          <BookingRequest bookings={bookings} />
        </div>
        <div>
          <h2>예약 확정 목록</h2>
          <BookingFix/>
        </div>
      </BookingContainer>
    </>
  );
}

export default BookingList;
