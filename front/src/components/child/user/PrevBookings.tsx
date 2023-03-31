import API from '../../../store/API';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

const BookingDiv = styled.div`
  padding-top: 20px;
`;

type Booking = {
  reservationId: number;
  reservationState: boolean;
  reservationTime: string;
  menuId: number;
  menuName: string;
  storeId: number;
  storeName: string;
};

const PrevBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    API
      .get('/bookings/child')
      .then((response) => {
        const data: Booking[] = response.data.map((booking: Booking) => ({
          reservationId: booking.reservationId,
          reservationState: booking.reservationState,
          reservationTime: booking.reservationTime,
          menuId: booking.menuId,
          menuName: booking.menuName,
          storeId: booking.storeId,
          storeName: booking.storeName,
        }));
        setBookings(data);
      })
      .catch((error) => {
        console.error('Error fetching bookings:', error);
      });
  }, []);

  return (
    <>
      <BookingDiv>
        {bookings.map((booking) => (
          <div key={booking.reservationId}>
            <p>Reservation ID: {booking.reservationId}</p>
            <p>Reservation state: {booking.reservationState}</p>
            <p>Reservation time: {booking.reservationTime}</p>
            <p>Menu ID: {booking.menuId}</p>
            <p>Menu name: {booking.menuName}</p>
            <p>Store ID: {booking.storeId}</p>
            <p>Store name: {booking.storeName}</p>
            <hr />
          </div>
        ))}
      </BookingDiv>
    </>
  );
};

export default PrevBookings;
