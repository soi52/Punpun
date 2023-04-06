import React from 'react';
import styled, { keyframes } from 'styled-components';
import API from '../../store/API';
import Swal from 'sweetalert2';

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
        Swal.fire(
          '예약이 확정되었습니다!',
          `${booking.reservationTime}에 아동이 방문 예정입니다.`,
          'success'
        )
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: '오류가 발생했습니다!',
          text: '다시 시도해주세요.',
        })
      });
  };
  const handleButtonClickDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    API.post('bookings/today', {
      approveState: 'NO',
      bookingId: booking.reservationId,
    })
      .then((response) => {
        Swal.fire({
          icon: 'error',
          title: '예약이 거절되었습니다!',
          text: '',
        })
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: '오류가 발생했습니다!',
          text: '다시 시도해주세요.',
        })
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
            <p># {booking.reservationId}</p>
            <p>{booking.menuName}</p>
            <p>{booking.reservationTime}</p>
            {/* <p>{booking.time}</p> */}
          </BookingItemContent>
          {isRequest && booking.reservationSate === 'BOOKING' && (
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
