import styled from 'styled-components';
import { useState, useEffect } from 'react';
import API from '../../../store/API';
import ChMainMessage from '../ChMainMessage';
import TodayBooking from './TodayBooking';
import Message from './Message';
import Loading from '../../ui/Loading';

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
  reservationState: string;
  reservationTime: number;
  menuId: number;
  menuName: string;
  storeId: number;
  storeName: string;
};

const ChUserMain = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  useEffect(() => {
    const now = new Date();
    const todayStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59
    );
    const todayStartString = todayStart.toISOString().slice(0, 19);

    API.get(`bookings/child?localDateTime=${todayStartString}`)
      .then((response) => {
        // console.log("Today's bookings:", response.data.content);
        setBookings(response.data.content);
      })
      .catch((error) => {
        // console.error("Error fetching today's bookings:", error);
      });
  }, []);

  // console.log(bookings);

  const filteredBookings = bookings.filter((booking) => {
    const reservationTime = new Date(booking.reservationTime);
    const today = new Date();
    return (
      reservationTime.getFullYear() === today.getFullYear() &&
      reservationTime.getMonth() === today.getMonth() &&
      reservationTime.getDate() === today.getDate()
    );
  });

  const shouldShowMessage = filteredBookings.some((booking) => {
    const reservationTime = new Date(booking.reservationTime);
    const currentTime = new Date();
    const timeDifference = currentTime.getTime() - reservationTime.getTime();
    return timeDifference > 1800000; // 30분 (60분 * 60초 * 1000밀리초)
  });

  const shouldHideMessage = new Date().setHours(23, 59, 59, 999) < Date.now();

  if (!filteredBookings) {
    return <Loading />;
  }

  return (
    <ComponentStyle>
      <ChMainMessage />
      <BookingDiv>
        <h2>오늘의 예약</h2>
        {bookings.length > 0 && (
          <TodayBooking bookings={bookings} setBookings={setBookings} />
        )}
      </BookingDiv>
      {bookings.length > 0 &&
        bookings[0].reservationState === 'END' &&
        !shouldHideMessage &&
        shouldShowMessage &&
        filteredBookings.length > 0 && (
          <MessageDiv>
            <h2>감사메세지 작성</h2>
            <Message reservationId={filteredBookings[0].reservationId} />
          </MessageDiv>
        )}
    </ComponentStyle>
  );
};

export default ChUserMain;
