import { useState } from 'react';
import { messageState } from '../../../store/atoms';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import MainTitle from '../../ui/MainTitle';
import MainMessage from '../../ui/MainMessage';

import MessageList from './MessageList';

const ComponentStyle = styled.div`
  padding: 20px;
`;

const ThanksMessage = () => {
  const storeInfo = {
    title: '',
    ownerName: '정은 학생',
    message: '오늘도 맛있는 밥 먹어요~!',
    name: '박정은 학생',
  };
  const messageList = useRecoilValue(messageState);


  const [messages, setMessages] = useState<string[]>([]);
  const handleDeleteMessage = (index: number) => {
    const newMessages = [...messages];
    newMessages.splice(index, 1);
    setMessages(newMessages);
  };

  return (
    <ComponentStyle>
      <h2>
        <MainTitle title={`${storeInfo.name} ${storeInfo.title}`} />
      </h2>
      <MainMessage message={`${storeInfo.ownerName}, ${storeInfo.message}`} />
      <h2>내가 남긴 감사메세지</h2>
      <MessageList
          messages={messages}
          onDeleteMessage={handleDeleteMessage}
        />
      <div>{messageList}</div>
    </ComponentStyle>
  );
};

export default ThanksMessage;
