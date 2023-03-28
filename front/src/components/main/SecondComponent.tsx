import React from 'react';
import styled from 'styled-components';
import useScrollFadeInPage from '../../pages/owner/useScrollFadeInPage';
import second from '../../resources/images/2.jpg';

const ComponentStyle = styled.div`
  background: url(${second}) no-repeat center
  height: 100%;
  width: 100%;
  display: flex;
`;

const ContentStyle = styled.h3`
  margin-top: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
`;

function SecondComponent() {
  const { ref: ref2, style: style2 } = useScrollFadeInPage({
    direction: 'up',
    duration: 1,
    delay: 0,
  });
  return (
    <ComponentStyle>
      <div ref={ref2} style={{ ...style2, opacity: 1 }}>
        <ContentStyle>
          <div>우리나라에 결식 아동이 아직 있나요?</div>
          <div>
            현재, 전국 결식 우려 아동은
            <br />
            <b>무려 33만명입니다.</b>
          </div>
          <div>
            더 이상 아이들이 먹는 것에 눈치보지 않도록 많은 후원 부탁드립니다.
          </div>
          <button>후원하기</button>
        </ContentStyle>
      </div>
    </ComponentStyle>
  );
}
export default SecondComponent;
