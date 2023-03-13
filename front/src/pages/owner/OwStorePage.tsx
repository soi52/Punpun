import React, { useState } from 'react';
import styled from 'styled-components';
import StoreSidebarComponent from '../../components/owner/sidebar/StoreSidebar';
import StoreComponent from '../../components/owner/store/StoreComponent';
import ThanksComponent from '../../components/owner/store/ThanksComponent';
import MainComponent from '../../components/ui/MainComponent';

const ComponentStyle = styled.div`
  padding: 0px 30px 0px 30px;
  display: flex;
  justify-content: center;
`;

const OwStorePage: React.FC = () => {
  const [show, setShow] = useState({
    Store: true,
    Thanks: false,
  });

  const onClickStore = () => {
    setShow({
      Store: true,
      Thanks: false,
    });
  };

  const onClickThanks = () => {
    setShow({
      Store: false,
      Thanks: true,
    });
  };

  return (
    <ComponentStyle>
      <StoreSidebarComponent
        onClickStore={onClickStore}
        onClickThanks={onClickThanks}
      />
      <MainComponent width={70}>
        {show.Store ? <StoreComponent /> : null}
        {show.Thanks ? <ThanksComponent /> : null}
      </MainComponent>
    </ComponentStyle>
  );
};

export default OwStorePage;
