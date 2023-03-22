import React from 'react';
import styled from 'styled-components';
import alone_child from '../resources/images/alone_child.jpg';

const Wrapper = styled.div`
  height: 100vh;
`;

const MainImg = styled.div`
  height: calc(100% - 80px);
  background-size: cover;
  background-image: url(${alone_child});
`;

function MainPage() {
  return (
    <Wrapper>
      <div>
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
      </div>
    </Wrapper>
  );
}

export default MainPage;
