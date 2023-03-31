import { useState, useEffect } from 'react';
import styled from 'styled-components';
import StoreBanner from './Storebanner';
import ChMenuList from './ChMenuList';
import MenuList from './MenuList';
import API from '../../../store/API';

type MenuDTO = {
  menuId: number;
  menuName: string;
  menuPrice: number;
  menuCount: number;
};

type ChMenuDTO = {
  menuId: number;
  menuName: string;
  menuPrice: number;
  favoriteMenu: boolean;
};

type Props = {
  myStoreId: string | undefined;
};

const StoreMenu = ({ myStoreId }: Props) => {
  const [menuDTOList, setMenuDTOList] = useState<MenuDTO[]>([]);
  const [chMenuDTOList, setChMenuDTOList] = useState<ChMenuDTO[]>([]);
  const [storeName, setStoreName] = useState<string | undefined>();

  const role = localStorage.getItem('role');

  useEffect(() => {
    if (role === 'CHILD') {
      if (myStoreId) {
        API.get(`stores/child/${myStoreId}`)
          .then((response) => {
            setChMenuDTOList(response.data.favoriteMenuDTOList);
            setStoreName(response.data.storeName);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      if (myStoreId) {
        API.get(`stores/${myStoreId}`)
          .then((response) => {
            setMenuDTOList(response.data.menuResponseDTOList);
            setStoreName(response.data.storeName);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, [myStoreId]);

  return (
    <>
      <StoreBanner storeName={storeName} />
      {(role==='CHILD') ?
      <ChMenuList chMenuList={chMenuDTOList} />
      : <MenuList menuList={menuDTOList} />
      }
    </>
  );
};

export default StoreMenu;
