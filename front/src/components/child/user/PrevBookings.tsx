import API from '../../../store/API';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Loading from '../../ui/Loading';
import { useNavigate } from 'react-router-dom';
import Calendar from '../../../common/Calendar';

const CalendarDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  // justify-content: space-between;
`;

const CalDiv = styled.div`
  margin-left: 490px;
`;

const Wrapper = styled.div`
    display; flex;
    align-items: center;
    margin: 30px;
`;

const PostIt = styled.div<{ reservationState: 'END' | 'CANCEL' | 'BOOKING' }>`
  position: relative;
  width: 90%;
  height: 200px;
  background-color: ${(props) => {
    switch (props.reservationState) {
      case 'END':
        return '#FCFCFF';
      case 'CANCEL':
        return '#F2F2F2';
      case 'BOOKING':
        return '#F2F2F2';
      default:
        return '#F2F2F2';
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
  background-color: #4bd37b;
  text-align: center;
  color: white;
`;

const StatusIcon2 = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  border-radius: 50%;
  background-color: #e86b6b;
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
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const fetchBookings = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${
      day < 10 ? '0' : ''
    }${day}`;

    API.get(`/bookings/child?localDateTime=${formattedDate}T23:59:59`)
      .then((response) => {
        setBookings(response.data.content);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching bookings:', error);
      });
  };

  const handleDateChange = (date: Date) => {
    if (date) {
      const formattedDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        23,
        59,
        59
      );
      setSelectedDate(formattedDate);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchBookings(selectedDate);
    } else {
      API.get('/bookings/child')
        .then((response) => {
          setBookings(response.data.content);
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Error fetching bookings:', error);
        });
    }
  }, [selectedDate]);

  const formattedBookings = bookings
    .map((booking) => {
      const date = new Date(booking.reservationTime);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const minute = date.getMinutes();
      const formattedTime = `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;

      return {
        ...booking,
        reservationTime: formattedTime,
      };
    })
    .reverse();

  const Navigate = useNavigate();
  const toStore = (storeId: number) => {
    Navigate(`/store/${storeId}`);
  };

  console.log(formattedBookings);

  if (!formattedBookings) {
    return <div>아직 예약을 하지 않았어요 :(</div>;
  }

  return (
    <>
      <CalendarDiv>
        <h2>이전 예약 내역</h2>
        <CalDiv>
          {/* <p>날짜 검색　</p> */}
          <Calendar
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
          />
        </CalDiv>
      </CalendarDiv>
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
                <StoreName onClick={() => toStore(booking.storeId)}>
                  {booking.storeName}
                </StoreName>
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
