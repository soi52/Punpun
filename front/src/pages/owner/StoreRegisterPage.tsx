import React from 'react';
import styled from 'styled-components';
import Header from '../../components/ui/Header';
import MainComponent from '../../components/ui/MainComponent';

const Wrapper = styled.div`
  padding-top: 80px;
`;

function StoreRegisterPage() {
  return (
    <Wrapper>
      <Header />
      <h1>StoreRegisterPage</h1>
      <MainComponent width={80} />
    </Wrapper>
  );
}
export default StoreRegisterPage;
