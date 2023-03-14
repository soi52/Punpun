import React, { useState } from 'react';
import styled from 'styled-components';

import Sidebar from '../../components/ui/Sidebar';
import MainComponent from '../../components/ui/MainComponent';

import ChUserMain from '../../components/child/ChUserMain';
import BookingList from '../../components/child/BookingList';
import Message from '../../components/child/Message';
import Preference from '../../components/child/Preference';


const ComponentStyle = styled.div`
  padding: 30px 30px 0px 30px;
  display: flex;
  justify-content: center;
`;

const menuItems = [
  { title: '', component: () => <ChUserMain />},
  { title: '예약내역', component: () => <BookingList /> },
  { title: '감사 메세지', component: () => <Message /> },
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
        <MainComponent width={70}>
          {menuItems[currentMenuItemIndex].component()}
        </MainComponent>
    </ComponentStyle>
  );
}

export default ChUserPage;
