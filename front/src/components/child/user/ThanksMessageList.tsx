import API from '../../../store/API';
import { useEffect, useState } from 'react';
import Loading from '../../ui/Loading';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../../../store/atoms';

const Review = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 20px;
  max-width: 100%;
`;

const ReviewItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 10px;
  padding: 10px;
  background-color: #ffffff;
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  word-wrap: break-word;
  flex-basis: calc(33.333% - 20px);
  max-width: calc(33.333% - 20px);
`;
const ReviewContent = styled.div`
  width: 100%;
`;

const ReviewStoreName = styled.p`
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  margin: 0px 0px 10px 0px;
`;

const ReviewText = styled.p`
  font-size: 16px;
  text-align: center;
`;

const ReviewTextDeco = styled.span`
  font-size: 20px;
  color: gray;
`;

const ReviewDate = styled.p`
  font-size: 14px;
  text-align: center;
`;

const ButtonDiv = styled.div`
  text-align: center;
`;

const MessageButton = styled.button`
  border: none;
  border-radius: 15px;
  text-align: center;
  padding: 7px;
  background-color: #e7e6f2;
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
  reviewCreatedTime: string;
  storeName: string;
};

export type Review = {
  reviewId: number;
  reviewContent: string;
  reviewCreatedTime: string;
  storeName: string;
  keywords: {
    content: string;
    createdDateTime: string;
    lastModifiedDateTime: string;
    id: number;
  }[];
  childId: number;
  childName: string;
  childProfileUrl: string;
};

const ThanksMessageList = () => {
  const [userInfo] = useRecoilState(userInfoState);
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

  if (!messages || messages.length === 0) {
    return <div>남긴 메세지가 없어요 :(</div>;
  }

  return (
    <Review>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {messages.map((message, index) => (
          <ReviewItem key={index}>
            {/* <UserImage
              src={userInfo.userProfileImage || defaultUserImage}
              alt="User Image"
            /> */}
            <ReviewContent>
              <ReviewStoreName>{message.storeName}</ReviewStoreName>
              <ReviewText>
                <ReviewTextDeco>❝ </ReviewTextDeco>
                {message.reviewContent}
                <ReviewTextDeco> ❞</ReviewTextDeco>
              </ReviewText>
              <ButtonDiv>
                {message.keywords.map((keyword, index) => (
                  <MessageButton key={index}>{keyword.content}</MessageButton>
                ))}
              </ButtonDiv>
              <ReviewDate>
                {new Date(message.reviewCreatedTime).toLocaleString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: false,
                })}
              </ReviewDate>
            </ReviewContent>
          </ReviewItem>
        ))}
      </div>
    </Review>
  );
};

export default ThanksMessageList;
