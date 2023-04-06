import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import API from '../store/API';
import { useParams } from 'react-router-dom';

import Loading from '../components/ui/Loading';
import Sidebar from '../components/ui/Sidebar';
import MainComponent from '../components/ui/MainComponent';

import StoreMenu from '../components/child/storedetail/StoreMenu';
import ThanksMessage from '../components/child/storedetail/StoreThanksMessage';
import SuPointAdd from '../components/supporter/SuPointAdd';
import { useRecoilState } from 'recoil';
import { selectedStoreState } from '../store/atoms';
import StoreDetailInfo from '../components/ui/StoreDetailInfo';

// 아이콘

const ComponentStyle = styled.div`
  padding: 15px 30px 0px 30px;
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

type ChMenuDTO = {
  menuId: number;
  menuName: string;
  menuPrice: number;
  favoriteMenu: boolean;
  menuImage: string | null;
  menuImageName: string | null;
};

type ChStore = {
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
  menuDTOList: ChMenuDTO[];
};

function ChStoreDetailPage() {
  const { storeId: myStoreId } = useParams();
  const [currentMenuItemIndex, setCurrentMenuItemIndex] = useState(0);
  const [stores, setStores] = useState<Store>();
  const [chStores, setChStores] = useState<ChStore>();
  const [selectedStore, setSelectedStore] = useRecoilState(selectedStoreState);

  const role = localStorage.getItem('role');

  let menuItems = [
    { title: '🍝 메뉴', component: () => <StoreMenu myStoreId={myStoreId} /> },
    {
      title: '🗺 가게 정보',
      component: () => <StoreDetailInfo myStoreId={myStoreId} />,
    },
    {
      title: '💌 감사 메세지',
      component: () => <ThanksMessage myStoreId={myStoreId} />,
    },
  ];

  if (role !== 'CHILD') {
    menuItems.push({ title: '충전하기', component: () => <SuPointAdd /> });
  }

  useEffect(() => {
    async function fetchStores() {
      if (role === 'CHILD') {
        try {
          const response = await API.get(`stores/child/${myStoreId}`);
          console.log(response.data);
          setChStores(response.data);
          setSelectedStore(response.data);
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const response = await API.get(`stores/${myStoreId}`);
          console.log(response.data);
          setStores(response.data);
          setSelectedStore(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    }

    fetchStores();
  }, [myStoreId]);

  if (role === 'CHILD') {
    if (!chStores) {
      return <Loading />;
    }

    return (
      <ComponentStyle>
        <Sidebar
          title={chStores.storeName}
          menuItems={menuItems}
          currentMenuItemIndex={currentMenuItemIndex}
          setCurrentMenuItemIndex={setCurrentMenuItemIndex}
        />
        <MainComponent width={53.7}>
          {menuItems[currentMenuItemIndex].component()}
        </MainComponent>
      </ComponentStyle>
    );
  } else {
    if (!stores) {
      return <Loading />;
    }

    return (
      <ComponentStyle>
        <Sidebar
          title={stores.storeName}
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
}
export default ChStoreDetailPage;
