import React, { useState } from 'react';
import styled from 'styled-components';

const MessageDiv = styled.div`
    width: 700px;
    display: flex;
    justify-content: center;
`;

const MessageButtonDiv = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 10px;
`;

const MessageButton1 = styled.button`
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
  background-color: purple;
  text-align: center;
  white-space: nowrap;
`;

const Input = styled.input`
  border: none;
  border-radius: 25px;
//   background-color: hsl(0, 0%, 90%);
  padding: 10px;
  font-size: medium;
  width: 20rem;
`;

const InputBoxDiv = styled.div`
    display: flex;
    justify-content: center;
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

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonValue = event.currentTarget.innerText;
    setInputValue(inputValue + ' ' + buttonValue);
  };

  return (
    <MessageDiv>
        <form onSubmit={handleAddMessage}>
            <MessageButtonDiv id="buttondiv">
                <MessageButton1 onClick={handleButtonClick}>🥰 감사해요</MessageButton1>
                <MessageButton1 onClick={handleButtonClick}>😋 맛있어요</MessageButton1>
                <MessageButton1 onClick={handleButtonClick}>⚡ 음식이 빨리 나와요</MessageButton1>
                <MessageButton1 onClick={handleButtonClick}>✨ 청결해요</MessageButton1>
                <MessageButton1 onClick={handleButtonClick}>😊 친절해요</MessageButton1>
                <MessageButton1 onClick={handleButtonClick}>👍 최고예요</MessageButton1>
                <MessageButton1 onClick={handleButtonClick}>🤍 편히 먹을 수 있어요</MessageButton1>
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
