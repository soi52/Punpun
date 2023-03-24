import { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 20px 0px 10px 0px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  appearance: none;
  background-color: #fff;
  background-image: linear-gradient(to bottom, #fff, #f2f2f2);
  background-repeat: no-repeat;
  background-position: center right 10px;
  cursor: pointer;
  outline: none;
  font-size: 16px;

  /* 드롭다운 화살표 스타일 변경 */
  &::-ms-expand {
    display: none;
  }
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    border: solid #333;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px;
  }

  /* 드롭다운 목록 스타일 변경 */
  option {
    font-size: 16px;
    color: #333;
  }
`;

interface Menu {
  id: number;
  title: string;
  image: string;
  price: number;
}

type MenuDropdownProps = {
  menuList: Menu[];
  onMenuSelect: (menu: Menu) => void;
};

const MenuDropdown = ({ menuList, onMenuSelect }: MenuDropdownProps) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(event.target.value);
    const selectedMenu = menuList.find((menu) => menu.id === selectedId);
    if (selectedMenu) {
      onMenuSelect(selectedMenu);
    }
  };

  return (
    <Wrapper>
      <Select onChange={handleSelectChange} defaultValue="">
        <option value="" disabled hidden>
          메뉴를 선택하세요.
        </option>
        {menuList.map((menu) => (
          <option key={menu.id} value={menu.id}>
            {menu.title} ({menu.price}원)
          </option>
        ))}
      </Select>
    </Wrapper>
  );
};

export default MenuDropdown;
