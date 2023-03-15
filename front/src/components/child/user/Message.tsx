import React, { useState } from 'react';
import styled from 'styled-components';

import MainTitle from '../../ui/MainTitle';
import MainMessage from '../../ui/MainMessage';

import MessageInput from './MessageInput';
import MessageList from './MessageList';

const ComponentStyle = styled.div`
  padding: 20px;
`;

const ThanksMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: nowrap;
`;

const Message: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);

  const handleAddMessage = (message: string) => {
    setMessages([...messages, message]);
  };

  const handleDeleteMessage = (index: number) => {
    const newMessages = [...messages];
    newMessages.splice(index, 1);
    setMessages(newMessages);
  };

  return (
    <ComponentStyle>
      <ThanksMessage id="thanksmessage">
        <MessageInput onAddMessage={handleAddMessage} />
        <MessageList
          messages={messages}
          onDeleteMessage={handleDeleteMessage}
        />
      </ThanksMessage>
    </ComponentStyle>
  );
};

export default Message;
