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
          key={booking.id}
          booking={booking}
          isActive={booking.id === selectedId}
          onClick={() => onSelect(booking.id)}
          isRequest={true} // BookingRequest에서는 isRequest를 true로 설정
        />
      ))}
    </BookingListContainer>
  );
};

export default BookingRequest;
