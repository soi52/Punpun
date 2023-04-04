import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import API from '../../../store/API';
import BookingItem, { Booking } from '../../ui/BookingItem';
import { useRecoilValue } from 'recoil';
import { selectedStoreState } from '../../../store/atoms';

export interface BookingListProps {
  bookings: Booking[];
}


const BookingListContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
`;

const BookingFix = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const selectedStore = useRecoilValue(selectedStoreState);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    API.get(`bookings/store/${selectedStore?.storeId}?state=END`)
      .then((response: any) => {
        console.log(response.data.content);
        setBookings(response.data.content);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }, []);

  const onSelect = (id: number) => {
    if (selectedId === id) {
      setSelectedId(null);
    } else {
      setSelectedId(id);
    }
  };

  return (
    <BookingListContainer>
      {bookings.map((booking) => 
          <BookingItem
            key={booking.reservationId}
            booking={booking}
            isActive={booking.reservationId === selectedId}
            onClick={() => onSelect(booking.reservationId)}
            isRequest={true}
          />
      )}
    </BookingListContainer>
  );
};

export default BookingFix;
