import styled from 'styled-components';

import SuMainMessage from './SuMainMessage';
import { useEffect, useState } from 'react';
import API from '../../store/API';
import ReviewItem from '../ui/ReviewItem';

const ComponentStyle = styled.div`
  padding: 20px;
`;

interface Reviews {
  reviewId: number;
  reviewContent: string;
  reviewCreatedTime: string;
  keywords: [];
  childId: number;
  childName: string;
  childProfileUrl: string;
}

function ThanksMessage() {
  const [supportMessage, setSupportMessage] = useState<Reviews[]>([]);

  useEffect(() => {
    API.get('reviews/supporter')
      .then((response: any) => {
        console.log(response.data.content);
        setSupportMessage(response.data.content);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }, []);

  return (
    <ComponentStyle>
      <SuMainMessage />
      <h2>감사 메세지</h2>
      <ReviewItem reviews={supportMessage} />
    </ComponentStyle>
  );
}

export default ThanksMessage;
