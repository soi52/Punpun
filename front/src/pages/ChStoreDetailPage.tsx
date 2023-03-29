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

type MenuDTO = {
  menuId: number;
  menuName: string;
  menuPrice: number;
  menuCount: number;
};

type Store = {
  storeId: number;
  storeName: string;
  storeOpenTime: string | null;
  storeInfo: string | null;
  storeAddress: string;
  storeLon: number;
  storeLat: number;
  storeImageName: string | null;
  storeImage: string | null;
  storePhoneNumber: string | null;
  menuDTOList: MenuDTO[];
};

function ChStoreDetailPage() {
  const { storeId: myStoreId } = useParams();
  const [currentMenuItemIndex, setCurrentMenuItemIndex] = useState(0);
  const [stores, setStores] = useState<Store>();

  const menuItems = [
    { title: '🍝 메뉴', component: () => <StoreMenu myStoreId={myStoreId}/> },
    { title: '🗺 가게 정보', component: () => <StoreInfo myStoreId={myStoreId}/> },
    { title: '💌 감사 메세지', component: () => <ThanksMessage myStoreId={myStoreId}/> },
    { title: '충전하기', component: () => <SuPointAdd /> },
  ];

  useEffect(() => {
    async function fetchStores() {
      try {
        const response = await API.get(`stores/${myStoreId}`);
        console.log(response.data);
        
        setStores(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchStores();
  }, [myStoreId]);

  if (!stores) {
    return <div>Loading...</div>;
  }

  return (
    <ComponentStyle>
      <Sidebar
        title={stores.storeName}
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
