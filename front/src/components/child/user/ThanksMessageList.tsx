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


type Message = {
  reviewContent: string;
  keyword: string;
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
        <ReviewText key={index}>{message.reviewContent}</ReviewText>
      ))}
    </Review>
  );
};

export default ThanksMessageList;
