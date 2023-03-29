import styled from 'styled-components';

import SuMainMessage from './SuMainMessage';
import SupportHistory from './SupportHistroy';

const ComponentStyle = styled.div`
  padding: 20px;
`;

function SuDetail() {
  const mainMessage = {
    title: '',
    ownerName: '박정은 후원자님',
    message: '어느새 후원한 금액이 10,000원 이네요!',
    name: '정은 후원자님',
  };

  return (
    <ComponentStyle>
      <SuMainMessage/>
      <h2>후원내역</h2>
      <SupportHistory/>
    </ComponentStyle>
  );
}

export default SuDetail;
