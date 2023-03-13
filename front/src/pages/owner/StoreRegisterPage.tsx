import React from 'react';
import styled from 'styled-components';
import MainComponent from '../../components/ui/MainComponent';

const ContentsStyle = styled.div`
  padding: 0px 10px 0px 10px;
  display: flex;
  justify-content: center;
`;

function StoreRegisterPage() {
  return (
    <>
      <ContentsStyle>{/* <MainComponent width={80} /> */}</ContentsStyle>
    </>
  );
}
export default StoreRegisterPage;
