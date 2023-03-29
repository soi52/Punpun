import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import API from '../store/API';
import { useParams } from 'react-router-dom';

import Sidebar from '../components/ui/Sidebar';
import MainComponent from '../components/ui/MainComponent';

import StoreMenu from '../components/child/storedetail/StoreMenu';
import StoreInfo from '../components/child/storedetail/StoreInfo';
import ThanksMessage from '../components/child/storedetail/StoreThanksMessage';
import SuPointAdd from '../components/supporter/SuPointAdd';


// 아이콘

const ComponentStyle = styled.div`
  padding: 30px 30px 0px 30px;
  display: flex;
  justify-content: center;
`;

const menuItems = [
  { title: '🍝 메뉴', component: () => <StoreMenu /> },
  { title: '🗺 가게 정보', component: () => <StoreInfo /> },
  { title: '💌 감사 메세지', component: () => <ThanksMessage /> },
  { title: '충전하기', component: () => <SuPointAdd /> },

];

function ChStoreDetailPage() {
  const { storeId } = useParams();
  const [currentMenuItemIndex, setCurrentMenuItemIndex] = useState(0);

  useEffect(() => {
    // storeId를 사용하여 API를 호출하는 코드
    API.get(`stores/${storeId}`)
      .then((response) => {
        const stores = response.data
        console.log(stores);
        
      })
      .catch((error) => {
        // 오류 처리 코드
      });
  }, [storeId]);

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
  );
}
export default ChStoreDetailPage;
