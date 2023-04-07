import React, { useState } from 'react';
import API from '../../../store/API';
import styled from 'styled-components';
import Swal from 'sweetalert2';

import MessageInput from './MessageInput';
import MessageList from './MessageList';

const ComponentStyle = styled.div`
  margin: auto;
  width: 80%;
`;

const ThanksMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: nowrap;
  justify-content: center;
`;

type MessageBtn = {
  id: number;
  value: string;
};

const btnMessage: MessageBtn[] = [
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
  selectedButtons: string[];
};

type MessageProps = {
  reservationId: number;
};

const Message: React.FC<MessageProps> = ({ reservationId }) => {
  const [messages, setMessages] = useState<MessageSet[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedButtons, setSelectedButtons] = useState<string[]>([]);

  const handleAddMessage = (inputValue: string, selectedButtons: string[]) => {
    const message = {
      keyword: selectedButtons[0],
      content: inputValue,
      reservationId: reservationId,
    };

    API.post('/reviews', message)
      .then((response) => {
        Swal.fire(
          '감사 메세지가 등록되었습니다!',
          '식사는 맛있게 하셨나요?',
          'success'
        )
        setMessages([
          { inputValue: inputValue, selectedButtons: selectedButtons },
          ...messages,
        ]);
      })
      .catch((error) => {
        console.error('Error sending message:', error);
      });
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
          btnMessage={btnMessage}
          onAddMessage={handleAddMessage}
          setInputValue={setInputValue}
          inputValue={inputValue}
          setSelectedButtons={setSelectedButtons}
          selectedButtons={selectedButtons}
        />
        {/* <MessageList
          messages={messages}
          onDeleteMessage={handleDeleteMessage}
        /> */}
      </ThanksMessage>
    </ComponentStyle>
  );
};

export default Message;
