import React, { useState } from 'react';
import styled from 'styled-components';
import BookingItem, { Booking } from '../../ui/BookingItem';

export interface BookingListProps {
  bookings: Booking[];
}

const BookingListContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
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
      {bookings.map((booking) => (
        <BookingItem
          key={booking.reservationId}
          booking={booking}
          isActive={booking.reservationId === selectedId}
          onClick={() => onSelect(booking.reservationId)}
          isRequest={true}
        />
      ))}
    </BookingListContainer>
  );
};

export default BookingRequest;
