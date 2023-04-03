import API from '../../../store/API';
import { useEffect, useState } from 'react';
import Loading from '../../ui/Loading';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../../../store/atoms';
import defaultUserImage from '../../../resources/images/profileDefault.png';


const ReviewItem = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 20px;
  flex-direction: column;
`;

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
};

const UserImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 20px;
`;

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

  if (!messages) {
    return <Loading />;
  }

  return (
    <Review>
      {messages.map((message, index) => (
        <ReviewItem key={index}>
          <UserImage
            src={userInfo.userProfileImage || defaultUserImage}
            alt="User Image"
          />
          <ReviewText>{message.reviewContent}</ReviewText>
          {message.keywords.map((keyword, index) => (
            <>
              <p>
                {new Date(message.keywords[0].createdDateTime).toLocaleString(
                  'ko-KR',
                  {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    // second: 'numeric',
                    hour12: false,
                  }
                )}
              </p>
              <MessageButton>{message.keywords[0].content}</MessageButton>
            </>
          ))}
        </ReviewItem>
      ))}
    </Review>
  );
};

export default ThanksMessageList;
