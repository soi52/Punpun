import React, { useState } from 'react';
import styled from 'styled-components';
import MainComponent from '../../components/ui/MainComponent';
import StoreManage from '../../components/owner/store/StoreManage';
import ReviewManage from '../../components/owner/store/ReviewManage';
import Sidebar from '../../components/ui/Sidebar';

const ComponentStyle = styled.div`
  padding: 15px 30px 0px 30px;
  display: flex;
  justify-content: center;
`;

const menuItems = [
  { title: '가게 관리', component: () => <StoreManage /> },
  { title: '감사메세지 관리', component: () => <ReviewManage /> },
];

function OwBookingPage() {
  const [currentMenuItemIndex, setCurrentMenuItemIndex] = useState(0);

  return (
    <ComponentStyle>
      <Sidebar
        title="가게 운영"
        menuItems={menuItems}
        currentMenuItemIndex={currentMenuItemIndex}
        setCurrentMenuItemIndex={setCurrentMenuItemIndex}
      />
      <MainComponent width={70}>
        {menuItems[currentMenuItemIndex].component()}
      </MainComponent>
    </ComponentStyle>
  );
}

export default OwBookingPage;
