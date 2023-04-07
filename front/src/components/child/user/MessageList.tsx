import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 50rem;
  justify-content: flex-start;
  padding: 20px;
`;

const StyledLi = styled.li`
  display: flex;
  justify-content: space-between;
`;

const ListContent = styled.div`
  display: flex;
  // flex-direction: column;
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

const MessageButton = styled.button`
  border: none;
  border-radius: 15px;
  text-align: center;
  padding: 7px;
  background-color: #E7E6F2;
`;

type MessageSet = {
  inputValue: string;
  selectedButtons: string[];
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
          <ListContent>
            {messages.inputValue}
            {(messages.selectedButtons).map((selectedButtons, index) => (
              <MessageButton key={index}>{selectedButtons}</MessageButton>
            ))}
          </ListContent>
          {/* <Button onClick={() => handleDeleteMessage(index)}>Delete</Button> */}
        </StyledLi>
      ))}
    </Div>
  );
};

export default MessageList;
