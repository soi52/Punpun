import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 20rem;
  justify-content: flex-start;
  padding: 20px;
`;

const StyledLi = styled.li`
  display: flex;
  justify-content: space-between;
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

type MessageSet = {
  inputValue: string;
  selectedButtons: number[];
};

interface MessageListProps {
  messages: MessageSet[];
  onDeleteMessage: (index: number) => void;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  onDeleteMessage,
}) => {
  const handleDeleteMessage = (index: number) => {
    onDeleteMessage(index);
  };

  return (
    <Div>
      {messages.map((messages, index) => (
        <StyledLi key={index}>
          {messages.inputValue}
          {messages.selectedButtons}
          <Button onClick={() => handleDeleteMessage(index)}>Delete</Button>
        </StyledLi>
      ))}
    </Div>
  );
};

export default MessageList;
