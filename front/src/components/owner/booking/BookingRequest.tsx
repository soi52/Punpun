import React, { useState } from 'react';
import styled from 'styled-components';
import BookingItem, { Booking } from '../../ui/BookingItem';

export interface BookingListProps {
  bookings: Booking[];
}

const BookingListContainer = styled.div`
  /* display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  padding: 16px;
  margin: 0.5rem 1rem 1rem 0.5rem;
  max-width: 175px;
  width: 100%;
  height: 200px; */
  /* cursor: pointer; */
  /* perspective: 1000px; */
  position: relative;

  display: grid;
  grid-template-columns: 1fr;
  /* overflow: auto; */
  /* row-gap: 5em; */
  place-items: center;
`;

const NoBookingMessage = styled.p`
  /* align-items: center; */
  text-align: center;
  font-size: 1.2rem;
  /* margin: 2rem 0; */
  /*  */
  width: 100%;
  height: 200px;
  border-radius: 20px;
  margin: 1rem 1rem 1rem 1rem;
  max-width: 300px;
  // border: 3px solid pink;
  padding: 16px;
`;

const BookingRequest: React.FC<BookingListProps> = ({ bookings }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const onSelect = (id: number) => {
    if (selectedId === id) {
      setSelectedId(null);
    } else {
      setSelectedId(id);
    }
  };

  return (
    <BookingListContainer>
      {bookings.length === 0 ? (
        <NoBookingMessage>신청된 예약이 없습니다.</NoBookingMessage>
      ) : (
        bookings.map((booking) => (
          <BookingItem
            booking={booking}
            key={booking.reservationId}
            isActive={booking.reservationId === selectedId}
            onClick={() => onSelect(booking.reservationId)}
            isRequest={true}
          />
        ))
      )}
    </BookingListContainer>
  );
};

export default BookingRequest;
