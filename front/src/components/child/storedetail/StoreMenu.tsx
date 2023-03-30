import { useState, useEffect } from 'react';
import styled from 'styled-components';
import StoreBanner from './Storebanner';
import MenuList from './MenuList';
import API from '../../../store/API';

type MenuDTO = {
  menuId: number;
  menuName: string;
  menuPrice: number;
  menuCount: number;
};

type Props = {
  myStoreId: string | undefined;
};

const StoreMenu = ({ myStoreId }: Props) => {
  const [menuDTOList, setMenuDTOList] = useState<MenuDTO[]>([]);
  const [storeName, setStoreName] = useState<string | undefined>();

  useEffect(() => {
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
  }, [myStoreId]);

  return (
    <>
      <StoreBanner storeName={storeName}/>
      <MenuList menuList={menuDTOList}/>
    </>
  );
};

export default StoreMenu;
