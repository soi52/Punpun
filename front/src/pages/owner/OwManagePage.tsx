import React from 'react';
import styled from 'styled-components';
import StoreList from '../../components/owner/store/StoreList';
import MainComponent from '../../components/ui/MainComponent';

const ComponentStyle = styled.div`
  padding: 15px 30px 0px 30px;
  display: flex;
  justify-content: center;
`;

function OwManagePage() {
  return (
    <ComponentStyle>
      <MainComponent width={68}>{<StoreList />}</MainComponent>
    </ComponentStyle>
  );
}

export default OwManagePage;
