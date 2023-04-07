import React from 'react';
import styled from 'styled-components';
import first from '../../resources/images/main/main2-1.png';
import { Fade } from 'react-awesome-reveal';
import ThirdText from './ThirdText';

const ComponentStyle = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #8dace5;
  align-items: center;
`;

const MainImageStyle = styled.img`
  position: absolute;
  width: 500px;
  height: 65%;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ContentDivStyle = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Component1 = styled.div``;
const Component2 = styled.div``;
const Component3 = styled.div``;

const TitleStyle1 = styled.h1`
  color: #256f9c;
  position: absolute;
  top: 13%;
  left: 58%;
  font-weight: bold;
  font-family: GmarketSansMedium, sans-serif, Arial;
`;

const ContentStyle1 = styled.h3`
  posiditon: absolute !important;
  left: 58% !important;
  font-family: GmarketSansMedium, sans-serif, Arial;
`;

const TitleStyle2 = styled.h1`
  color: #a267aa;
  position: absolute;
  /* width: 100%; */
  top: 57%;
  left: 26%;
  font-weight: bold;
  font-family: GmarketSansMedium, sans-serif, Arial;
`;

const ContentStyle2 = styled.h3`
  posiditon: absolute;
  white-space: pre-line;
  top: 57%;
  left: 21.8%;
  font-family: GmarketSansMedium, sans-serif, Arial;
`;

const TitleStyle3 = styled.h1`
  color: #d7e37d;
  position: absolute;
  /* width: 100%; */
  top: 57%;
  left: 68%;
  font-weight: bold;
  font-family: GmarketSansMedium, sans-serif, Arial;
`;

const ContentStyle3 = styled.h3`
  posiditon: absolute;
  white-space: pre-line;
  top: 57%;
  left: 68%;
  font-family: GmarketSansMedium, sans-serif, Arial;
`;

const Title = styled.text`
  font-family: GmarketSansMedium, sans-serif, Arial;
`;
const Label = styled.text`
  font-family: GmarketSansLight, sans-serif, Arial;
`;

function SecondComponent() {
  return (
    <ComponentStyle>
      <ThirdText/>
      <Component1>
        <TitleStyle1>
          <Fade duration={1500} direction="right">
            <Title>아동</Title>
          </Fade>
        </TitleStyle1>
        <ContentStyle1 style={{ position: 'absolute', top: '20%', color: 'white' }}>
          <Fade duration={1700} direction="right">
            <Label>건강한 식사를 눈치 볼 필요 없이</Label>
          </Fade>
          <Fade duration={2000} direction="right">
            <Label>편하게 검색, 예약</Label>
          </Fade>
        </ContentStyle1>
      </Component1>
      <Component2>
        <TitleStyle2>
          <Fade duration={2200} direction="left">
            <Title>사장님</Title>
          </Fade>
        </TitleStyle2>
        <ContentStyle2 style={{ position: 'absolute', top: '65%', color: 'white' }}>
          <Fade duration={2300} direction="left">
            <Label>남음 대신 나눔으로</Label>
          </Fade>
        </ContentStyle2>
      </Component2>
      <Component3>
        <TitleStyle3>
          <Fade duration={2200} direction="right">
            <Title>후원자</Title>
          </Fade>
        </TitleStyle3>
        <ContentStyle3 style={{ position: 'absolute', top: '65%', color: 'white' }}>
          <Fade duration={2300} direction="right">
            <Label>직접적 기부와 착한 소비로</Label>
          </Fade>
        </ContentStyle3>
      </Component3>
      <MainImageStyle src={first} />
    </ComponentStyle>
  );
}
export default SecondComponent;
