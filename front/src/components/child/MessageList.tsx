import React from 'react';

interface MessageListProps {
  messages: string[];
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
    <ul>
      {messages.map((message, index) => (
        <li key={index}>
          {message}
          <button onClick={() => handleDeleteMessage(index)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default MessageList;
