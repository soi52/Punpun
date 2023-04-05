import React, { useState } from 'react';
import styled from 'styled-components';
// import { useRecoilState } from 'recoil';
// import { messageState } from '../../../store/atoms';

type MessageBtn = {
  id: number;
  value: string;
};

interface MessageInputProps {
  btnMessage: MessageBtn[];
  onAddMessage: (message: string, selectedButtons: string[]) => void;
  setInputValue: (message: string) => void;
  inputValue: string
  setSelectedButtons: (selectedButtons: string[]) => void;
  selectedButtons: string[]
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
  background-color: #5D5A88;
  cursor: pointer;
`;

const MessageButtonDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
`;

const BtnDiv = styled.div<{ selected: boolean }>`
  display: inline-block;
  background-color: ${(props) => (props.selected ? '#5D5A88' : '#fff')};
  color: ${(props) => (props.selected ? '#fff' : '#5D5A88')};
  font-size: 14px;
  padding: 5px 10px;
  border: 1px solid #5D5A88;
  border-radius: 20px;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;
`;




const MessageInput: React.FC<MessageInputProps> = ({
  btnMessage,
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

  const handleButtonSelect = (value: string) => {
    if (selectedButtons.includes(value)) {
      setSelectedButtons(selectedButtons.filter((button) => button !== value));
    } else {
      setSelectedButtons([...selectedButtons, value]);
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
          {btnMessage.map((btnMessage, index) => (
            <BtnDiv
              key={index}
              selected={selectedButtons.includes(btnMessage.value)}
              onClick={() => handleButtonSelect(btnMessage.value)}
            >
              {btnMessage.value}
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
