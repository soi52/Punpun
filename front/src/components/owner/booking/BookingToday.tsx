import styled from 'styled-components';
import StoreInfo from '../StoreInfo';
import BookingFix from './BookingFix';
import BookingRequest from './BookingRequest';
import { useEffect, useState } from 'react';
import API from '../../../store/API';
import { useRecoilValue } from 'recoil';
import { selectedStoreState } from '../../../store/atoms';

interface Booking {
  id: number; // id 프로퍼티 추가
  childId: number;
  childName: string;
  menuId: number;
  menuName: string;
  reservationId: number;
  reservationSate: string;
  reservationTime: string;
}

interface BookingListProps {
  bookings: Booking[];
}

const Wrapper = styled.div`
  padding: 20px;
`;

// 목록 2개 감싸기
const BookingContainer = styled.div`
  display: flex;
  justify-content: center;
`;

// 플렉스 비율 50%씩 가져오기
const RequestList = styled.div`
  flex-basis: 50%;
  /* border */
`;

const ConfirmList = styled.div`
  flex-basis: 50%;
  border-left: 1px dotted grey;
`;

// 제목 감싸기
const WrapMenu = styled.div`
  display: flex;
`;
const Menu = styled.h2`
  flex-basis: 50%;
`;


function BookingToday() {
  const selectedStore = useRecoilValue(selectedStoreState);
  const [bookings, setBookings] = useState<Booking[]>([]); // bookings의 타입을 명시적으로 지정

  useEffect(() => {
    API.get(`bookings/store/${selectedStore?.storeId}`)
      .then((response: any) => {
        // console.log(response.data.content);
        setBookings(response.data.content);
      })
      .catch((error: any) => {
        // console.error(error);
      });
  }, []);

  return (
    <Wrapper>
      <StoreInfo />
        <WrapMenu>
          <Menu>예약 요청 목록</Menu>
          <Menu>예약 확정 목록</Menu>
        </WrapMenu>
      <BookingContainer>
        <RequestList>
          <BookingRequest bookings={bookings} />
        </RequestList>
        <ConfirmList>
          <BookingFix bookings={bookings} />
        </ConfirmList>
      </BookingContainer>
    </Wrapper>
  );
}

export default BookingToday;
