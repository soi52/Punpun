import React, { useState } from 'react';
import styled from 'styled-components';

import Sidebar from '../../components/ui/Sidebar';
import MainComponent from '../../components/ui/MainComponent';

import ChUserMain from '../../components/child/user/ChUserMain';
import BookingList from '../../components/child/user/BookingList';
import Preference from '../../components/child/user/Preference';
import ThanksMessage from '../../components/child/user/ThanksMessage';

const ComponentStyle = styled.div`
  padding: 30px 30px 0px 30px;
  display: flex;
  justify-content: center;
`;

const menuItems = [
  { title: '오늘의 예약', component: () => <ChUserMain /> },
  { title: '예약내역', component: () => <BookingList /> },
  { title: '감사 메세지', component: () => <ThanksMessage /> },
  { title: '선호메뉴', component: () => <Preference /> },
];

function ChUserPage() {
  const [currentMenuItemIndex, setCurrentMenuItemIndex] = useState(0);
  
  return (
    <ComponentStyle>
      <Sidebar
        title="My Page"
        menuItems={menuItems}
        currentMenuItemIndex={currentMenuItemIndex}
        setCurrentMenuItemIndex={setCurrentMenuItemIndex}
      />
      <MainComponent width={53.7}>
        {menuItems[currentMenuItemIndex].component()}
      </MainComponent>
    </ComponentStyle>
  );
}

export default ChUserPage;
