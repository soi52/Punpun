import React from 'react';
import styled from 'styled-components';
import Header from '../../components/ui/Header';
import MainComponent from '../../components/ui/MainComponent';

const ContentsStyle = styled.div`
  display: flex;
  justify-content: center;
`;

function StoreRegisterPage() {
  return (
    <>
      <Header />
      <ContentsStyle>
        <h1>StoreRegisterPage</h1>
        <MainComponent width={80} />
      </ContentsStyle>
    </>
  );
}
export default StoreRegisterPage;
