import styled from 'styled-components';
import { useState } from 'react';

import ChMainMessage from '../ChMainMessage';
import TodayBooking from './TodayBooking';
import Message from './Message';

const ComponentStyle = styled.div`
  padding: 20px;
`;

const BookingDiv = styled.div`
  padding-top: 20px;
`;

const MessageDiv = styled.div`
  padding-top: 20px;
`;

type Booking = {
  reservationId: number;
  reservationState: boolean;
  reservationTime: number;
  menuId: number;
  menuName: string;
  storeId: number;
  storeName: string;
};

const ChUserMain = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedReservationId, setSelectedReservationId] = useState<number | null>(null);

  const filteredBookings = bookings.filter((booking) => {
    const reservationTime = new Date(booking.reservationTime);
    const today = new Date();
    return (
      reservationTime.getFullYear() === today.getFullYear() &&
      reservationTime.getMonth() === today.getMonth() &&
      reservationTime.getDate() === today.getDate()
    );
  });

  // 메세지 컴포넌트를 보여줄지 여부
  const shouldShowMessage = filteredBookings.some((booking) => {
    const reservationTime = new Date(booking.reservationTime);
    const currentTime = new Date();
    const timeDifference = reservationTime.getTime() - currentTime.getTime();
    return timeDifference >= 0 && timeDifference < 1800000; // 30분 (60분 * 60초 * 1000밀리초)
  });

  // 마감시간이 지난 경우 메세지 컴포넌트를 숨김
  const shouldHideMessage = new Date().setHours(23, 59, 59, 999) < Date.now();

  return (
    <ComponentStyle>
      <ChMainMessage/>
      <BookingDiv>
        <h2>오늘의 예약</h2>
        <TodayBooking bookings={bookings} setBookings={setBookings} />
      </BookingDiv>
      {!shouldHideMessage && shouldShowMessage && selectedReservationId != null && (
        <MessageDiv>
          <h2>감사메세지 작성</h2>
          <Message reservationId={selectedReservationId}/>
        </MessageDiv>
      )}
    </ComponentStyle>
  );
};

export default ChUserMain;
