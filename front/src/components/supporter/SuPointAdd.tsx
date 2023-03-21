import styled from 'styled-components';

import MainTitle from '../ui/MainTitle';
import MainMessage from '../ui/MainMessage';

const ComponentStyle = styled.div`
  padding: 20px;
`;

const PointButton = styled.button`
  width: 100px;
  height: 40px;
  font-size: 16px;
  font-weight: bold;
  color: black;
  border-radius: 5px;
  border: none;
  background-color: #ffffff;
  cursor: pointer;
`;

const Button = styled.button`
  width: 90px;
  height: 40px;
  font-size: 16px;
  font-weight: bold;
  color: black;
  border-radius: 25px;
  border: none;
  background-color: #e7e6f2;
  cursor: pointer;
`;

const ButtonDiv = styled.div``;

const SuPointAdd = () => {
  const mainMessage = {
    title: '',
    ownerName: '박정은 후원자님',
    message: '어느새 후원한 금액이 10,000원 이네요!',
    name: '정은 후원자님',
  };

  return (
    <ComponentStyle>
      <h2>
        <MainTitle title={`${mainMessage.name} ${mainMessage.title}`} />
      </h2>
      <MainMessage
        message={`${mainMessage.ownerName}, ${mainMessage.message}`}
      />
      <h2>충전 포인트</h2>
      <ButtonDiv>
        <PointButton>10,000 P</PointButton>
        <PointButton>30,000 P</PointButton>
        <PointButton>50,000 P</PointButton>
        <PointButton>70,000 P</PointButton>
        <PointButton>100,000 P</PointButton>
      </ButtonDiv>
      <h2>결제 수단</h2>
      <Button>충전하기</Button>
    </ComponentStyle>
  );
};

export default SuPointAdd;
