import { useState } from 'react';
import { messageState } from '../../../store/atoms';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import ChMainMessage from '../ChMainMessage';
import MessageList from './MessageList';

const ComponentStyle = styled.div`
  padding: 20px;
`;

const ThanksMessage = () => {
  const messageList = useRecoilValue(messageState);


  const [messages, setMessages] = useState<string[]>([]);
  const handleDeleteMessage = (index: number) => {
    const newMessages = [...messages];
    newMessages.splice(index, 1);
    setMessages(newMessages);
  };

  return (
    <ComponentStyle>
      <ChMainMessage/>
      <h2>내가 남긴 감사메세지</h2>
      {/* <MessageList
          messages={messages}
          onDeleteMessage={handleDeleteMessage}
        /> */}
      <div>{messageList}</div>
    </ComponentStyle>
  );
};

export default ThanksMessage;
