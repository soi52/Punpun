import API from '../../../store/API';
import { useEffect, useState } from 'react';
import Loading from '../../ui/Loading';

const ThanksMessageList = () => {
  const [messages, setMessages] = useState();

  useEffect(() => {
    API.get('/reviews/child')
      .then((response) => {
        console.log('Message sent:', response.data);
        setMessages(response.data.content);
      })
      .catch((error) => {
        console.error('Error sending message:', error);
      });
  });

  if (!messages) {
    <Loading />;
  }

  return (
    <>
      {/* {messages.map((message) => (
            <li>{message.content}</li>
        ))} */}
    </>
  );
};

export default ThanksMessageList;
