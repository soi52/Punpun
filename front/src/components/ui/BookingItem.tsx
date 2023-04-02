import React from 'react';
import styled, { keyframes } from 'styled-components';
import API from '../../store/API';

export interface Booking {
  id: number; // id 프로퍼티 추가
  childId: number;
  childName: string;
  menuId: number;
  menuName: string;
  reservationId: number;
  reservationSate: string;
  reservationTime: string;
}

interface BookingItemProps {
  booking: Booking;
  isActive: boolean;
  onClick: () => void;
  isRequest?: boolean;
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
  isRequest = false,
}) => {
  const handleButtonClickAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    API.post('bookings/today', {
      approveState: 'OK',
      bookingId: booking.reservationId,
    })
      .then((response) => {
        // 예약 수락 성공 처리
        console.log('예약이 수락되었습니다.');
      })
      .catch((error) => {
        // 예약 수락 실패 처리
        console.error(error);
      });
  };
  const handleButtonClickDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    API.post('bookings/today', {
      approveState: 'NO',
      bookingId: booking.reservationId,
    })
      .then((response) => {
        console.log('예약이 거절되었습니다.');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <BookingItemContainer isActive={isActive} onClick={onClick}>
      <div>
        {booking.childName} - {booking.reservationTime}
      </div>
      {isActive && (
        <>
          <BookingItemContent>
            <p>{booking.reservationId}</p>
            <p>{booking.menuName}</p>
            <p>{booking.reservationTime}</p>
            {/* <p>{booking.time}</p> */}
          </BookingItemContent>
          {isRequest && (
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
