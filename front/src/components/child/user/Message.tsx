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

type MessageBtn = {
  id: number;
  value: string;
};

const BtnMessage: MessageBtn[] = [
  {
    id: 1,
    value: '🥰 감사해요',
  },
  {
    id: 2,
    value: '😋 맛있어요',
  },
  {
    id: 3,
    value: '⚡ 음식이 빨리 나와요',
  },
  {
    id: 4,
    value: '✨ 청결해요',
  },
  {
    id: 5,
    value: '😊 친절해요',
  },
  {
    id: 6,
    value: '👍 최고예요',
  },
  {
    id: 7,
    value: '💛 편히 먹을 수 있어요',
  },
];

type MessageSet = {
    inputValue: string;
    selectedButtons: number[];
  };

const Message: React.FC = () => {
  const [messages, setMessages] = useState<MessageSet[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedButtons, setSelectedButtons] = useState<number[]>([]);

  const handleAddMessage = (inputValue: string, selectedButtons: number[]) => {
    setMessages([{inputValue: inputValue, selectedButtons: selectedButtons}, ...messages]);
  };

  const handleDeleteMessage = (index: number) => {
    const newMessages = [...messages];
    newMessages.splice(index, 1);
    setMessages(newMessages);
  };

  return (
    <ComponentStyle>
      <ThanksMessage id="thanksmessage">
        <MessageInput
          onAddMessage={handleAddMessage}
          setInputValue={setInputValue}
          inputValue={inputValue}
          setSelectedButtons={setSelectedButtons}
          selectedButtons={selectedButtons}
        />
        <MessageList
          messages={messages}
          onDeleteMessage={handleDeleteMessage}
        />
      </ThanksMessage>
    </ComponentStyle>
  );
};

export default Message;
