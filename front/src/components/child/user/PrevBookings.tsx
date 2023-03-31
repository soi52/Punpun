import API from '../../../store/API';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Loading from '../../ui/Loading';

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
        setBookings(response.data.content);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching bookings:', error);
      });
  }, []);

  if (!bookings) {
    return <Loading />;
  }

  return (
    <>
      <BookingDiv>
        {bookings && bookings.length > 0 ? (
          bookings.map((booking) => (
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
          ))
        ) : (
          <p>No bookings found.</p>
        )}
      </BookingDiv>
    </>
  );
};

export default PrevBookings;
