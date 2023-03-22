import React, { useState } from 'react';
import styled from 'styled-components';
// import { useRecoilState } from 'recoil';
// import { messageState } from '../../../store/atoms';

interface MessageInputProps {
  onAddMessage: (message: string, selectedButtons: number[]) => void;
  setInputValue: (message: string) => void;
  inputValue: string
  setSelectedButtons: (selectedButtons: number[]) => void;
  selectedButtons: number[]
}

const MessageDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputBoxDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const Input = styled.input`
  width: 400px;
  height: 40px;
  padding: 10px;
  font-size: 18px;
  border-radius: 25px;
  border: 1px solid #bdbdbd;
  margin-right: 10px;
`;

const Button = styled.button`
  width: 80px;
  height: 40px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  border-radius: 25px;
  border: none;
  background-color: #00adb5;
`;

const MessageButtonDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
`;
const BtnDiv = styled.div<{ selected: boolean }>`
  display: inline-block;
  background-color: ${(props) => (props.selected ? '#f1c40f' : '#fff')};
  color: ${(props) => (props.selected ? '#fff' : '#f1c40f')};
  font-size: 14px;
  padding: 5px 10px;
  border: 1px solid #f1c40f;
  border-radius: 20px;
  margin-right: 10px;
  margin-bottom: 10px;
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

const MessageInput: React.FC<MessageInputProps> = ({
  onAddMessage,
  setInputValue,
  inputValue,
  setSelectedButtons,
  selectedButtons,
}) => {
  // const [message, setMessage] = useRecoilState(messageState);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleButtonSelect = (id: number) => {
    if (selectedButtons.includes(id)) {
      setSelectedButtons(selectedButtons.filter((button) => button !== id));
    } else {
      setSelectedButtons([...selectedButtons, id]);
    }
  };

  const handleAddMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      selectedButtons.length > 0 ||
      (selectedButtons.length === 0 && inputValue.trim() !== '')
    ) {
      onAddMessage(inputValue, selectedButtons);
      setInputValue('');
      setSelectedButtons([]);
      // setMessage(newMessage); // Update the message state in Recoil
    }
  };

  return (
    <MessageDiv>
      <form onSubmit={handleAddMessage}>
        <MessageButtonDiv id="buttondiv">
          {BtnMessage.map((BtnMessage, index) => (
            <BtnDiv
              key={index}
              selected={selectedButtons.includes(BtnMessage.id)}
              onClick={() => handleButtonSelect(BtnMessage.id)}
            >
              {BtnMessage.value}
            </BtnDiv>
          ))}
        </MessageButtonDiv>
        <InputBoxDiv>
          <Input
            type="text"
            placeholder="감사 메세지를 남겨보세요 :)"
            value={inputValue}
            onChange={handleInputChange}
          />
          <Button type="submit">입력</Button>
        </InputBoxDiv>
      </form>
    </MessageDiv>
  );
};

export default MessageInput;
