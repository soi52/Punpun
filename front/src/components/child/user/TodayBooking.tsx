import { useState, useEffect } from 'react';
import styled from 'styled-components';
import API from '../../../store/API';

type Booking = {
  reservationId: number;
  reservationState: string;
  reservationTime: number;
  menuId: number;
  menuName: string;
  storeId: number;
  storeName: string;
};

type TodayBookingProps = {
  bookings: Booking[];
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
};

const Wrapper = styled.div`
    display; flex;
    align-items: center;
    margin: 30px;
`;

const PostIt = styled.div`
  position: relative;
  width: 90%;
  height: 200px;
  background-color: #fff8dc;
  //   border: 2px solid #ffd700;
  border-radius: 5px;
  margin: 10px;
  padding: 20px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
`;

const StoreName = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const ReservationInfo = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
`;

const IdDiv = styled.div`
  text-align: right;
`;

const ReservationId = styled.span`
  font-weight: bold;
`;

const MenuInfo = styled.div`
  margin-bottom: 5px;
`;

const HrDiv = styled.hr`
  margin-bottom: 30px;
`;

const TodayBooking = ({ bookings, setBookings }: TodayBookingProps) => {

const formattedBookings = bookings.map(booking => {
  const date = new Date(booking.reservationTime);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; 
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const formattedTime = `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
  
  return {
    ...booking,
    reservationTime: formattedTime
  };
}).reverse();

  return (
    <>
      {formattedBookings.map((booking, index) => (
        <Wrapper key={index}>
          <PostIt>
            <ReservationInfo>
              <IdDiv>
                <span>예약번호 </span>
                <ReservationId># {booking.reservationId}</ReservationId>
              </IdDiv>
              <StoreName>{booking.storeName}</StoreName>
              <HrDiv></HrDiv>
            </ReservationInfo>
            <MenuInfo>{`메뉴: ${booking.menuName}`}</MenuInfo>
            <span>{`식사 시간: ${booking.reservationTime}`}</span>
          </PostIt>
        </Wrapper>
      ))}
    </>
  );
};

export default TodayBooking;
