import React from 'react';
import styled from 'styled-components';
import first from '../../resources/images/main/main2-1.png';
import { Fade } from 'react-awesome-reveal';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';

const ComponentStyle = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
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
  top: 10%;
  left: 30%;
`;

const ContentStyle1 = styled.h4`
  posiditon: absolute !important;
  left: 30% !important;
`;

const TitleStyle2 = styled.h1`
  color: #a267aa;
  position: absolute;
  /* width: 100%; */
  top: 57%;
  left: 26%;
`;

const ContentStyle2 = styled.h4`
  posiditon: absolute;
  white-space: pre-line;
  top: 57%;
  left: 18.5%;
`;

const TitleStyle3 = styled.h1`
  color: #d7e37d;
  position: absolute;
  /* width: 100%; */
  top: 57%;
  left: 68%;
`;

const ContentStyle3 = styled.h4`
  posiditon: absolute;
  white-space: pre-line;
  top: 57%;
  left: 68%;
`;

function SecondComponent() {
  return (
    <ComponentStyle>
      {/* <Fade duration={2000} direction="right"> */}
      <Component1>
        <TitleStyle1>
          <Fade duration={1500} direction="left">
            <span>아동</span>
          </Fade>
        </TitleStyle1>
        <ContentStyle1 style={{ position: 'absolute', top: '18%' }}>
          <Fade duration={1700} direction="left">
            <span>눈치보지 않고 언제든지</span>
          </Fade>
          <br />
          <Fade duration={2000} direction="left">
            <span>배부르게 끼니를 때울 수 있는 아이들</span>
          </Fade>
        </ContentStyle1>
      </Component1>
      {/* </Fade> */}
      <Component2>
        <TitleStyle2>
          <Fade duration={2200} direction="left">
            <span>사장님</span>
          </Fade>
        </TitleStyle2>
        <ContentStyle2 style={{ position: 'absolute', top: '65%' }}>
          <Fade duration={2300} direction="left">
            <span>나눔으로 마음을 나누는 사장님</span>
          </Fade>
        </ContentStyle2>
      </Component2>
      <Component3>
        <TitleStyle3>
          <Fade duration={2200} direction="right">
            <span>후원자</span>
          </Fade>
        </TitleStyle3>
        <ContentStyle3 style={{ position: 'absolute', top: '65%' }}>
          <Fade duration={2300} direction="right">
            <span>후원으로 마음을 나누는 후원자</span>
          </Fade>
        </ContentStyle3>
      </Component3>
      <MainImageStyle src={first} />
    </ComponentStyle>
  );
}
export default SecondComponent;
