import styled from 'styled-components';

import MainTitle from '../../ui/MainTitle';
import MainMessage from '../../ui/MainMessage';

import Message from './Message';

const ComponentStyle = styled.div`
  padding: 20px;
`;

const ChUserMain = () => {
  const mainMessage = {
    title: '',
    ownerName: '정은 학생',
    message: '오늘도 맛있는 밥 먹어요~!',
    name: '박정은 학생',
  };

  return (
    <ComponentStyle>
      <h2>
        <MainTitle title={`${mainMessage.name} ${mainMessage.title}`} />
      </h2>
      <MainMessage message={`${mainMessage.ownerName}, ${mainMessage.message}`} />
      <h2>오늘의 예약</h2>

      <h2>감사메세지 작성</h2>
      <Message/>
    </ComponentStyle>
  );
};

export default ChUserMain;
