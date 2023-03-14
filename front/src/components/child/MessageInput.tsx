import React, { useState } from 'react';
import styled from 'styled-components';

const Input = styled.input`
  border: none;
  border-radius: 25px;
//   background-color: hsl(0, 0%, 90%);
  padding: 10px;
  font-size: medium;
  width: 20rem;
`;

const Button = styled.button`
  border: none;
  border-radius: 15px;
  text-align: center;
  padding: 7px;
  color: #fff;
  font-size: 1em;
  font-weight: 500;
  transition: 0.3s;
  //   box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  //   display: block;
  margin: 5px;
  background-color: blue;
`;

interface MessageInputProps {
  onAddMessage: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onAddMessage }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleAddMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputValue.trim() !== '') {
      onAddMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleAddMessage}>
      <Input
        type="text"
        placeholder="감사 메세지를 남겨보세요 :)"
        value={inputValue}
        onChange={handleInputChange}
      />
      <Button type="submit">입력</Button>
    </form>
  );
};

export default MessageInput;
