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
  text-align: center;
`;

const BookingItemContainer = styled.div<{ isActive: boolean }>`
  background-color: ${(props) => (props.isActive ? 'white' : 'white')};
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Hr = styled.hr`
  margin: 30px;
`;

const ModalButton = styled.button`
  margin-top: 35px;
  background-color: white;
  border: 1px solid #DCA9AC;
  line-height: 0;
  font-size: 15px;
  display: inline-block;
  box-sizing: border-box;
  padding: 15px 10px;
  border-radius: 60px;
  color: #BC777B;
  font-weight: 100;
  letter-spacing: 0.01em;
  position: relative;
  transition: all 0.25s cubic-bezier(0.53, 0.01, 0.35, 1.5);

  &:hover,
  &:focus {
    color: white;
    background-color: #DCA9AC;
  }
`;

const ModalButton2 = styled.button`
  margin-top: 35px;
  margin-right: 20px;
  background-color: white;
  border: 1px solid #A3C5A7;
  line-height: 0;
  font-size: 15px;
  display: inline-block;
  box-sizing: border-box;
  padding: 15px 10px;
  border-radius: 60px;
  color: #7BAB80;
  font-weight: 100;
  letter-spacing: 0.01em;
  position: relative;
  transition: all 0.25s cubic-bezier(0.53, 0.01, 0.35, 1.5);

  &:hover,
  &:focus {
    color: white;
    background-color: #A3C5A7;
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
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
          `${diffInMinutes}분 후에 아동이 방문 예정입니다.`,
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

  const currentTime: Date = new Date();
  const reservationTime: Date = new Date(booking.reservationTime);

  const diffInMinutes: number = Math.floor((reservationTime.getTime() - currentTime.getTime()) / (1000 * 60));

  const reservationTime2 = new Date(booking.reservationTime);

const year = reservationTime2.getFullYear();
const month = reservationTime2.getMonth() + 1;
const day = reservationTime2.getDate();
const hours = reservationTime2.getHours();
const minutes = reservationTime2.getMinutes();

const formattedTime = `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`;


  return (
    <BookingItemContainer isActive={isActive} onClick={onClick}>
      <div>
        # {booking.reservationId}　{formattedTime}
      </div>
      {isActive && (
        <>
          <BookingItemContent>
            <p>{booking.menuName} 1인분</p>
            { diffInMinutes < 0 ? <p>시간이 만료된 예약입니다.</p> :
            <p>{diffInMinutes}분 후 예약입니다.</p>
            }
          </BookingItemContent>
          {isRequest && booking.reservationSate === 'BOOKING' && (
            <ButtonDiv>
              <ModalButton2 onClick={handleButtonClickAdd}>수락</ModalButton2>
              <ModalButton onClick={handleButtonClickDelete}>거절</ModalButton>
            </ButtonDiv>
          )}
        </>
      )}
      <Hr/>
    </BookingItemContainer>
  );
};

export default BookingItem;
