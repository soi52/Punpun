import React from 'react';
import styled from 'styled-components';
import Header from '../../components/ui/Header';
import MainComponent from '../../components/ui/MainComponent';
import Sidebar from '../../components/ui/Sidebar';

const ComponentStyle = styled.div`
  display: flex;
  justify-content: space-between;
`;

function OwStorePage() {
  return (
    <>
      <Header />
      <ComponentStyle>
        <Sidebar />
        <MainComponent width={50} />
      </ComponentStyle>
    </>
  );
}
export default OwStorePage;
