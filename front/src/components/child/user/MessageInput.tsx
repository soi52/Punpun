import React, { useState } from 'react';
import styled from 'styled-components';

interface MessageInputProps {
  onAddMessage: (message: string, selectedButtons: string[]) => void;
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
  border-radius: 5px;
  border: 1px solid #bdbdbd;
  margin-right: 10px;
`;

const Button = styled.button`
  width: 80px;
  height: 40px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  border-radius: 5px;
  border: none;
  background-color: #00adb5;
`;

const MessageButtonDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
`;
const Btndiv = styled.div<{ selected: boolean }>`
  display: inline-block;
  background-color: ${(props) => (props.selected ? '#f1c40f' : '#fff')};
  color: ${(props) => (props.selected ? '#fff' : '#f1c40f')};
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 20px;
  margin-right: 10px;
  margin-bottom: 10px;
`;

const MessageInput: React.FC<MessageInputProps> = ({ onAddMessage }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedButtons, setSelectedButtons] = useState<string[]>([]);

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
      const message = inputValue + ' ' + selectedButtons.join(' ');
      onAddMessage(message, selectedButtons);
      setInputValue('');
      setSelectedButtons([]);
    }
  };

  return (
    <MessageDiv>
      <form onSubmit={handleAddMessage}>
        <MessageButtonDiv id="buttondiv">
          <Btndiv
            selected={selectedButtons.includes('🥰 감사해요')}
            onClick={() => handleButtonSelect('🥰 감사해요')}
          >
            🥰 감사해요
          </Btndiv>
          <Btndiv
            selected={selectedButtons.includes('😋 맛있어요')}
            onClick={() => handleButtonSelect('😋 맛있어요')}
          >
            😋 맛있어요
          </Btndiv>
          <Btndiv
            selected={selectedButtons.includes('⚡ 음식이 빨리 나와요')}
            onClick={() => handleButtonSelect('⚡ 음식이 빨리 나와요')}
          >
            ⚡ 음식이 빨리 나와요
          </Btndiv>
          <Btndiv
            selected={selectedButtons.includes('✨ 청결해요')}
            onClick={() => handleButtonSelect('✨ 청결해요')}
          >
            ✨ 청결해요
          </Btndiv>
          <Btndiv
            selected={selectedButtons.includes('😊 친절해요')}
            onClick={() => handleButtonSelect('😊 친절해요')}
          >
            😊 친절해요
          </Btndiv>
          <Btndiv
            selected={selectedButtons.includes('👍 최고예요')}
            onClick={() => handleButtonSelect('👍 최고예요')}
          >
            👍 최고예요
          </Btndiv>
          <Btndiv
            selected={selectedButtons.includes('💛 편히 먹을 수 있어요')}
            onClick={() => handleButtonSelect('💛 편히 먹을 수 있어요')}
          >
            💛 편히 먹을 수 있어요
          </Btndiv>
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
