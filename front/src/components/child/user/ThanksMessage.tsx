import { useState } from 'react';
import styled from 'styled-components';

import ChMainMessage from '../ChMainMessage';
// import MessageList from './MessageList';
import ThanksMessageList from './ThanksMessageList';

const ComponentStyle = styled.div`
  padding: 20px;
`;

const BookingDiv = styled.div`
  padding-top: 20px;
`;

const ThanksMessage = () => {
  // const [messages, setMessages] = useState<string[]>([]);
  // const handleDeleteMessage = (index: number) => {
  //   const newMessages = [...messages];
  //   newMessages.splice(index, 1);
  //   setMessages(newMessages);
  // };

  return (
    <ComponentStyle>
      <ChMainMessage />
      <BookingDiv>
        <h2>내가 남긴 감사메세지</h2>
        <ThanksMessageList/>
      </BookingDiv>
    </ComponentStyle>
  );
};

export default ThanksMessage;
