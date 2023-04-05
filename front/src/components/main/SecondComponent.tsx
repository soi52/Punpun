import React from 'react';
import styled from 'styled-components';
import second from '../../resources/images/image2.png';
import { Fade } from 'react-awesome-reveal';

const ComponentStyle = styled.div`
  background: url(${second}) no-repeat center
  height: 100%;
  width: 100%;
  display: flex;
`;

const ContentDivStyle = styled.div`
  height: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #a3c3f2;
`;

const TitleStyle = styled.h2`
  margin: 0 auto;
  width: 50%;
`;

const ContentStyle = styled.h4`
  margin: 0 auto;
  width: 40%;
`;

function SecondComponent() {
  return (
    <ComponentStyle>
      <ContentDivStyle>
        <Fade duration={1000} direction={'left'}>
          <TitleStyle>
            상생하는 세상 꿈꾸는 ‘선한영향력’ 에 동행 하실 분들을 모집합니다!
          </TitleStyle>
        </Fade>
        <Fade duration={1000} direction={'right'}>
          <ContentStyle>
            선한영향력가게는 결식 아동을 자발적으로 지원하는 가게입니다. 지난
            2019년 서울시 마포에 위치한 ‘진짜파스타’ 매장에서 시작한 이 캠페인은
            결식아동들을 위한 따듯한 손길이 모여 ‘선한영향력’ 이라는 단체로
            만들어졌습니다. 음식점 뿐만 아니라 아이들에게 도움이 될 수 있는
            선한영향력을 함께하는 다양한 분야의 점주님들이 함께하고 있습니다.
            세상을 위한 좋은 변화를 위해 함께 하실 분들은 신청해 주세요!
          </ContentStyle>
        </Fade>
      </ContentDivStyle>
    </ComponentStyle>
  );
}
export default SecondComponent;
