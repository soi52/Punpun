import { useState } from 'react';
import styled from 'styled-components';
import StoreInfo from '../StoreInfo';
import MenuDropdown from './MenuDropdown';
import SelectedMenuList from './SelectedMenuList';

const Wrapper = styled.div`
  padding: 20px;
`;

type Menu = {
  id: number;
  title: string;
  image: string;
  price: number;
};

type SelectedMenuProps = Menu & {
  quantity: number;
  onQuantityChange: (menu: Menu, quantity: number) => void;
  onDelete: (menu: Menu) => void;
};

function Share() {
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  const [selectedMenus, setSelectedMenus] = useState<SelectedMenuProps[]>([]);

  const handleMenuSelect = (menu: Menu) => {
    setSelectedMenu(menu);
  };

  const handleQuantityChange = (menu: Menu, quantity: number) => {
    setSelectedMenus((prevSelectedMenus) =>
      prevSelectedMenus.map((prevMenu) => {
        if (prevMenu.id === menu.id) {
          return { ...prevMenu, quantity };
        }
        return prevMenu;
      })
    );
  };

  const handleClearClick = () => {
    setSelectedMenus([]);
  };

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
  return (
    <Wrapper>
      <StoreInfo />
      <h2>오늘의 나눔</h2>
      <MenuDropdown menuList={menuList} onMenuSelect={handleMenuSelect} />
      {/* <SelectedMenuList
        selectedMenus={selectedMenus}
        onQuantityChange={handleQuantityChange}
        onClearClick={handleClearClick}
      /> */}
      <input placeholder="퍈하게 와서 먹고가세요!" />
      <button onClick={() => alert('나눔 등록이 완료되었습니다!')}>
        등록하기
      </button>
    </Wrapper>
  );
}
export default Share;
