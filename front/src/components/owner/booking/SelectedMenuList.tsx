import { useEffect, useState } from 'react';
import styled from 'styled-components';
import API from '../../../store/API';
import SelectedMenu, { SelectedMenuProps } from './SelectedMenu';

export interface SelectedMenuListProps {
  selectedMenus: SelectedMenuProps[];
  onQuantityChange: (id: number, quantity: number) => void;
  onClearClick: (id: number) => void;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  padding: 20px 0px 60px 0px;
  position: relative;
`;
const SelectedMenuListContainer = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const Button = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 10px;
  padding: 10px 15px;
  background-color: #e6e6e6;
  border: none;
  border-radius: 3px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  cursor: pointer;

  &:hover {
    background-color: #ccc;
  }
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 16px;
  color: #333;
  ::placeholder {
    color: #bbb;
  }
`;

const SelectedMenuList: React.FC<SelectedMenuListProps> = ({
  selectedMenus,
  onQuantityChange,
  onClearClick,
}) => {
  const [inputValue, setInputValue] = useState('');
  const handleQuantityChange = (id: number, quantity: number) => {
    onQuantityChange(id, quantity);
  };
  const handleClearClick = (id: number) => {
    onClearClick(id);
  };

  // const shareSubmit = () => {
  //   const postData = async () => {
  //     const data = {
  //       selectedMenus: selectedMenus.map((menu) => ({
  //         menuId: menu.id,
  //         menuCount: menu.quantity,
  //         usePoint: menu.quantity * menu.price,
  //       })),
  //     };
  //     const response = await API.post('supports/share', data);
  //     console.log(response.data);
  //   };
  // };

  const postShare = async () => {
    const data = selectedMenus.reduce<{
      menuId: number[];
      menuCount: number[];
      usePoint: number;
    }>(
      (acc, menu) => {
        acc.menuId.push(menu.id);
        acc.menuCount.push(menu.quantity);
        acc.usePoint += menu.quantity * menu.price;
        return acc;
      },
      { menuId: [], menuCount: [], usePoint: 0 }
    );

    const response = await API.post('supports/share', data);
    console.log(response.data);
  };

  return (
    <Wrapper>
      {selectedMenus.length === 0 && <div>선택한 메뉴가 없습니다.</div>}
      {selectedMenus.length > 0 && (
        <>
          <SelectedMenuListContainer>
            {selectedMenus.map((menu) => (
              <SelectedMenu
                key={menu.id}
                id={menu.id}
                title={menu.title}
                price={menu.price}
                quantity={menu.quantity}
                onQuantityChange={handleQuantityChange}
                onDelete={() => handleClearClick(menu.id)}
              />
            ))}
          </SelectedMenuListContainer>
        </>
      )}
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={inputValue === '' ? '편하게 와서 먹고가세요!' : ''}
      />
      <Button onClick={postShare}>나눔 등록하기</Button>
    </Wrapper>
  );
};

export default SelectedMenuList;
