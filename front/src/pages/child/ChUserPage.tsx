import React, { useState } from 'react';
import MainComponent from '../../components/ui/MainComponent';
import Profile from '../../components/child/Profile';
import Settings from '../../components/child/Setting';
import Sidebar from '../../components/ui/Sidebar';

const menuItems = [
  { title: 'Home', component: () => <MainComponent width={50} /> },
  { title: 'Profile', component: () => <Profile /> },
  { title: 'Settings', component: () => <Settings /> },
];

function ChUserPage() {
  const [currentMenuItemIndex, setCurrentMenuItemIndex] = useState(0);


  return (
    <>
      <h1>아동 마이페이지 입니다.</h1>
      <div>
        <Sidebar
          title="메뉴"
          menuItems={menuItems}
          currentMenuItemIndex={currentMenuItemIndex}
          setCurrentMenuItemIndex={setCurrentMenuItemIndex}
        />
        <div>
            {menuItems[currentMenuItemIndex].component()}
        </div>
      </div>
    </>
  );
}

export default ChUserPage;
