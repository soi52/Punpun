import React from 'react';
import styled from 'styled-components';
import Header from '../components/ui/Header';

const Wrapper = styled.div`
  padding-top: 80px;
`;

function MainPage () {
  return (
    <Wrapper>
      <Header />
      <h1>메인 페이지</h1>
    </Wrapper>
  );
};
export default MainPage;
