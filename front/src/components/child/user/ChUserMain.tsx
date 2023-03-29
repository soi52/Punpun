import styled from 'styled-components';

import ChMainMessage from '../ChMainMessage';
import TodayBooking from './TodayBooking';
import Message from './Message';

const ComponentStyle = styled.div`
  padding: 20px;
`;

const BookingDiv = styled.div`
  padding-top: 20px;
`;

const MessageDiv = styled.div`
  padding-top: 20px;
`;

const ChUserMain = () => {

  return (
    <ComponentStyle>
      <ChMainMessage/>
      <BookingDiv>
        <h2>오늘의 예약</h2>
        <TodayBooking />
      </BookingDiv>
      <MessageDiv>
        <h2>감사메세지 작성</h2>
        <Message />
      </MessageDiv>
    </ComponentStyle>
  );
};

export default ChUserMain;
