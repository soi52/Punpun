import { useState } from 'react';
import styled from 'styled-components';
import SelectedMenu, { SelectedMenuProps } from './SelectedMenu';

interface Menu {
  id: number;
  title: string;
  image: string;
  price: number;
}

type MenuListProps = {
  menuList: Menu[];
};

type SelectedMenuListProps = {
  selectedMenus: SelectedMenuProps[];
  onQuantityChange: (id: number, quantity: number) => void;
  onClearClick: () => void;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Select = styled.select`
  margin-bottom: 10px;
`;

const SelectedMenuList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const SelectedMenuListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const MenuDropdown = (
  props: MenuListProps,
  { selectedMenus, onQuantityChange, onClearClick }: SelectedMenuListProps
) => {
  const { menuList } = props;
  const [selectedMenus, setSelectedMenus] = useState<Menu[]>([]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(event.target.value);
    const selectedMenu = menuList.find((menu) => menu.id === selectedId);
    if (selectedMenu) {
      setSelectedMenus((prev) => [...prev, { ...selectedMenu, quantity: 1 }]);
    }
  };

  const handleRemoveClick = (menu: Menu) => {
    setSelectedMenus((prev) => prev.filter((item) => item.id !== menu.id));
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    setSelectedMenus((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  return (
    <Wrapper>
      <label>Menu List</label>
      <Select onChange={handleSelectChange}>
        <option value="" disabled selected hidden>
          메뉴를 선택하세요.
        </option>
        {menuList.map((menu) => (
          <option key={menu.id} value={menu.id}>
            {menu.title} ({menu.price}원)
          </option>
        ))}
      </Select>
      <SelectedMenuList>
        {selectedMenus.map((menu) => (
          <SelectedMenu
            key={menu.id}
            id={menu.id}
            title={menu.title}
            price={menu.price}
            quantity={menu.quantity}
            onQuantityChange={handleQuantityChange}
            onDelete={() => handleRemoveClick(menu)}
          />
        ))}
      </SelectedMenuList>
    </Wrapper>
  );
};

export default MenuDropdown;
