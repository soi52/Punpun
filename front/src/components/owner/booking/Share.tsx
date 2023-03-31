import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { owStoreMenuState, selectedStoreState } from '../../../store/atoms';
import StoreInfo from '../StoreInfo';

import MenuDropdown from './MenuDropdown';
import { SelectedMenuProps } from './SelectedMenu';
import SelectedMenuList from './SelectedMenuList';

const Wrapper = styled.div`
  padding: 20px;
`;

interface Menu {
  menuCount: number;
  menuId: number;
  menuImage: string;
  menuImageName: string;
  menuName: string;
  menuPrice: number;
}

const Share: React.FC = () => {
  const [selectedMenus, setSelectedMenus] = useState<SelectedMenuProps[]>([]);
  const owStoreMenus = useRecoilValue(owStoreMenuState);
  const menuList = owStoreMenus; // menuList 선언

  const handleMenuSelect = (menu: Menu) => {
    const existingMenu = selectedMenus.find(
      (selectedMenu) => selectedMenu.id === menu.menuId
    );
    if (existingMenu) {
      const updatedSelectedMenus = selectedMenus.map((selectedMenu) =>
        selectedMenu.id === menu.menuId
          ? { ...selectedMenu, quantity: selectedMenu.quantity + 1 }
          : selectedMenu
      );
      setSelectedMenus(updatedSelectedMenus);
    } else {
      const newSelectedMenu: SelectedMenuProps = {
        id: menu.menuId,
        title: menu.menuName,
        price: menu.menuPrice,
        quantity: 1,
        onQuantityChange: handleQuantityChange,
        onDelete: () => handleClearClick(menu.menuId),
      };
      setSelectedMenus([...selectedMenus, newSelectedMenu]);
    }
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    const updatedSelectedMenus = selectedMenus.map((selectedMenu) =>
      selectedMenu.id === id ? { ...selectedMenu, quantity } : selectedMenu
    );
    setSelectedMenus(updatedSelectedMenus);
  };

  const handleClearClick = (id: number) => {
    const updatedSelectedMenus = selectedMenus.filter(
      (selectedMenu) => selectedMenu.id !== id
    );
    setSelectedMenus(updatedSelectedMenus);
  };

  return (
    <Wrapper>
      <StoreInfo />
      <MenuDropdown menuList={menuList} onMenuSelect={handleMenuSelect} />
      <SelectedMenuList
        selectedMenus={selectedMenus}
        onQuantityChange={handleQuantityChange}
        onClearClick={handleClearClick}
      />
    </Wrapper>
  );
};

export default Share;
