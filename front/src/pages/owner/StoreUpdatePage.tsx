import React from 'react';
import styled from 'styled-components';
import StoreRegister from '../../components/owner/store/StoreRegister';
import MainComponent from '../../components/ui/MainComponent';

const ComponentStyle = styled.div`
  padding: 15px 30px 0px 30px;
  display: flex;
  justify-content: center;
`;

function StoreUpdatePage() {
  return (
    <ComponentStyle>
      <MainComponent width={80}>{<StoreRegister />}</MainComponent>
    </ComponentStyle>
  );
}

export default StoreUpdatePage;
