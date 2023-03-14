import React, { useState } from 'react';
import styled from 'styled-components';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

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
    <div>
      <ThanksMessage id="thanksmessage">
        <MessageInput onAddMessage={handleAddMessage} />
        <MessageList
          messages={messages}
          onDeleteMessage={handleDeleteMessage}
        />
      </ThanksMessage>
    </div>
  );
};

export default Message;
