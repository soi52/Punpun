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
  const [storeName, setStoreName] = useState();

  useEffect(() => {
    API.get(`stores/${myStoreId}`)
      .then((response) => {
        setMenuDTOList(response.data.menuDTOList);
        setStoreName(response.data.storeName);
      })
      .catch((error) => {
        console.log(error);
      })
  })        

  return (
    <>
      <StoreBanner storeName={storeName}/>
      <MenuList menuList={menuDTOList}/>
    </>
  );
};

export default StoreMenu;
