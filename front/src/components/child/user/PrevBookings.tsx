import API from '../../../store/API';
import styled, { DefaultTheme, ThemedStyledProps } from 'styled-components';
import { useEffect, useState } from 'react';
import Loading from '../../ui/Loading';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
    display; flex;
    align-items: center;
    margin: 30px;
`;

const PostIt = styled.div<{ reservationState: "END" | "CANCEL" | "BOOKING" }>`
  position: relative;
  width: 90%;
  height: 200px;
  background-color: ${props => {
    switch (props.reservationState) {
      case "END":
        return "#FCFCFF";
      case "CANCEL":
        return "#F8C1C1";
      case "BOOKING":
        return "#F2F2F2";
      default:
        return "#F2F2F2";
    }
  }};
  border-radius: 5px;
  margin: 10px;
  padding: 20px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
`;

const StatusIcon1 = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  border-radius: 50%;
  background-color: #4BD37B;
  text-align: center;
  color: white;
`;

const StatusIcon2 = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  border-radius: 50%;
  background-color: #E86B6B;
  text-align: center;
  color: white;
`;

const StatusIcon3 = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  border-radius: 50%;
  // background-color: #E86B6B;
  text-align: center;
  color: white;
`;

const StoreName = styled.div`
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    // background-color: #ff3b3b;
    opacity: 0.8;
    transform: scale(1.01);
  }
`;

const ReservationHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
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

type Booking = {
  reservationId: number;
  reservationState: any;
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

  
  const Navigate = useNavigate();
  const toStore = (storeId: number) => {
    Navigate(`/store/${storeId}`);
  };
  
  console.log(formattedBookings);

  if (!formattedBookings) {
    return <Loading />;
  }

  return (
    <>
        {formattedBookings && formattedBookings.length > 0 ? (
          formattedBookings.map((booking) => (
            <Wrapper key={booking.reservationId}>
              <PostIt reservationState={booking.reservationState}>
                <ReservationInfo>
                  <ReservationHeader>
                  {booking.reservationState === 'END' ? (
                  <StatusIcon1>✔</StatusIcon1>
                  ) : booking.reservationState === 'CANCEL' ? (
                  <StatusIcon2>✖</StatusIcon2>
                  ) : (
                  <StatusIcon3>💬</StatusIcon3>
                  )}
                    <IdDiv>
                      <span>예약번호 </span>
                      <ReservationId># {booking.reservationId}</ReservationId>
                    </IdDiv>
                  </ReservationHeader>
                  <StoreName onClick={() => toStore(booking.storeId)}>{booking.storeName}</StoreName>
                  <HrDiv></HrDiv>
                </ReservationInfo>
                <MenuInfo>{`메뉴: ${booking.menuName}`}</MenuInfo>
                <span>{`식사 시간: ${booking.reservationTime}`}</span>
              </PostIt>
            </Wrapper>
          ))
        ) : (
          <p>No bookings found.</p>
        )}
    </>
  );
};

export default PrevBookings;
