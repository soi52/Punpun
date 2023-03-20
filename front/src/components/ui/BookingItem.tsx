import React from 'react';
import styled, { keyframes } from 'styled-components';

export interface Booking {
  id: number;
  name: string;
  date: string;
  time: string;
}

interface BookingItemProps {
  booking: Booking;
  isActive: boolean;
  onClick: () => void;
  isRequest?: boolean; // BookingRequest에서만 수락, 거절 버튼을 보여주도록 추가
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const BookingItemContent = styled.div`
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const BookingItemContainer = styled.div<{ isActive: boolean }>`
  background-color: ${(props) => (props.isActive ? 'white' : 'white')};
  padding: 20px;
  margin-bottom: 20px;
`;

const BookingItem: React.FC<BookingItemProps> = ({
  booking,
  isActive,
  onClick,
  isRequest = false, // BookingRequest에서만 수락, 거절 버튼을 보여주도록 추가
}) => {
  const handleButtonClickAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log('예약 수락');
  };
  const handleButtonClickDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log('예약 거절');
  };

  return (
    <BookingItemContainer isActive={isActive} onClick={onClick}>
      <div>
        {booking.name} - {booking.date}
      </div>
      {isActive && (
        <>
          <BookingItemContent>
            <p>{booking.name}</p>
            <p>{booking.date}</p>
            <p>{booking.time}</p>
          </BookingItemContent>
          {isRequest && ( // BookingRequest에서만 수락, 거절 버튼을 보여주도록 변경
            <>
              <button onClick={handleButtonClickAdd}>수락</button>
              <button onClick={handleButtonClickDelete}>거절</button>
            </>
          )}
        </>
      )}
    </BookingItemContainer>
  );
};

export default BookingItem;
