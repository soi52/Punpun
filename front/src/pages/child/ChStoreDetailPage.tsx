import React, { useState } from 'react';
import styled from 'styled-components';

import Sidebar from '../../components/ui/Sidebar';
import MainComponent from '../../components/ui/MainComponent';

import StoreMenu from '../../components/child/storedetail/StoreMenu';
import StoreInfo from '../../components/child/storedetail/StoreInfo';
import ThanksMessage from '../../components/child/storedetail/StoreThanksMessage';

// 아이콘

const ComponentStyle = styled.div`
  padding: 30px 30px 0px 30px;
  display: flex;
  justify-content: center;
`;

const menuItems = [
  { title: '🍝 메뉴', component: () => < StoreMenu/> },
  { title: '🗺 가게 정보', component: () => <StoreInfo /> },
  { title: '💌 감사 메세지', component: () => <ThanksMessage /> },
];

function ChStoreDetailPage () {
  const [currentMenuItemIndex, setCurrentMenuItemIndex] = useState(0);
  
  return (
    <ComponentStyle>
      <Sidebar
        title="정은 치킨"
        menuItems={menuItems}
        currentMenuItemIndex={currentMenuItemIndex}
        setCurrentMenuItemIndex={setCurrentMenuItemIndex}
      />
      <MainComponent width={70}>
        {menuItems[currentMenuItemIndex].component()}
      </MainComponent>
    </ComponentStyle>
  )
}
export default ChStoreDetailPage;