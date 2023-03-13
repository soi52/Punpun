import React, { useState } from 'react';
import ChMain from '../../components/child/MainComponent';
import Profile from '../../components/child/Profile';
import Settings from '../../components/child/Setting';
import Sidebar from '../../components/ui/Sidebar';
import MainComponent from '../../components/ui/MainComponent';

const menuItems = [
  { title: '예약내역', component: () => <ChMain /> },
  { title: '감사 메세지', component: () => <Profile /> },
  { title: '선호메뉴', component: () => <Settings /> },
];

function ChUserPage() {
  const [currentMenuItemIndex, setCurrentMenuItemIndex] = useState(0);

  return (
    <>
      <h1>아동 마이페이지 입니다.</h1>
      <div>
        <Sidebar
          title="My Page"
          menuItems={menuItems}
          currentMenuItemIndex={currentMenuItemIndex}
          setCurrentMenuItemIndex={setCurrentMenuItemIndex}
        />
        <MainComponent width={70}>
          {menuItems[currentMenuItemIndex].component()}
        </MainComponent>
      </div>
    </>
  );
}

export default ChUserPage;
