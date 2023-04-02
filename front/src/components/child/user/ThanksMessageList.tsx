import API from '../../../store/API';
import { useEffect, useState } from 'react';
import Loading from '../../ui/Loading';
import styled from 'styled-components';

const Review = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 20px;
  flex-direction: column;
`;

const ReviewText = styled.p`
  font-size: 16px;
`;

const MessageButton = styled.button`
  border: none;
  border-radius: 15px;
  text-align: center;
  padding: 7px;
  background-color: #E7E6F2;
`;

interface KeywordType {
  content: string;
  createdDateTime: string;
  id: number;
  lastModifiedDateTime: string;
}

type Message = {
  reviewContent: string;
  keywords: KeywordType[];
  reviewId: number;
}

const ThanksMessageList = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    API.get('/reviews/child')
      .then((response) => {
        console.log('Message sent:', response.data);
        setMessages(response.data.content);
      })
      .catch((error) => {
        console.error('Error sending message:', error);
      });
  }, []);

  if (!messages) {
    return <Loading />;
  }

  return (
    <Review>
      {messages.map((message, index) => (
        <>
          <ReviewText key={index}>{message.reviewContent}</ReviewText>
          {message.keywords.map((keyword, index) => (
            <MessageButton key={index}>{keyword.content}</MessageButton>
          ))}
        </>
      ))}
    </Review>
  );
};

export default ThanksMessageList;
