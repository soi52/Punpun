import React, { useState } from 'react';
import styled from 'styled-components';
import StoreInfo from '../StoreInfo';

import MenuDropdown from './MenuDropdown';
import { SelectedMenuProps } from './SelectedMenu';
import SelectedMenuList from './SelectedMenuList';

const Wrapper = styled.div`
  padding: 20px;
`;

interface Menu {
  id: number;
  title: string;
  image: string;
  price: number;
}

const Share: React.FC = () => {
  const [selectedMenus, setSelectedMenus] = useState<SelectedMenuProps[]>([]);
  const menuList: Menu[] = [
    {
      id: 1,
      title: '메뉴1',
      image: 'https://sample.com/menu1.jpg',
      price: 10000,
    },
    {
      id: 2,
      title: '메뉴2',
      image: 'https://sample.com/menu2.jpg',
      price: 12000,
    },
    {
      id: 3,
      title: '메뉴3',
      image: 'https://sample.com/menu3.jpg',
      price: 15000,
    },
    {
      id: 4,
      title: '메뉴4',
      image: 'https://sample.com/menu4.jpg',
      price: 8000,
    },
    {
      id: 5,
      title: '메뉴5',
      image: 'https://sample.com/menu5.jpg',
      price: 11000,
    },
    {
      id: 6,
      title: '메뉴6',
      image: 'https://sample.com/menu6.jpg',
      price: 9000,
    },
  ];

  const handleMenuSelect = (menu: Menu) => {
    const existingMenu = selectedMenus.find(
      (selectedMenu) => selectedMenu.id === menu.id
    );
    if (existingMenu) {
      const updatedSelectedMenus = selectedMenus.map((selectedMenu) =>
        selectedMenu.id === menu.id
          ? { ...selectedMenu, quantity: selectedMenu.quantity + 1 }
          : selectedMenu
      );
      setSelectedMenus(updatedSelectedMenus);
    } else {
      const newSelectedMenu: SelectedMenuProps = {
        ...menu,
        quantity: 1,
        onQuantityChange: handleQuantityChange,
        onDelete: () => handleClearClick(menu.id),
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
