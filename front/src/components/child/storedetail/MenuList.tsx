import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { storeState } from '../../../store/atoms';
import MenuCard from '../../ui/MenuCard';
import MenuCart from '../../supporter/MenuCart';
import Loading from '../../ui/Loading';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MenuListContainer = styled.div`
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px auto;
  gap: 20px;
`;

type MenuDTO = {
  menuId: number;
  menuName: string;
  menuPrice: number;
  menuCount: number;
};

type MenuListProps = {
  menuList: MenuDTO[];
};

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

const MenuList: React.FC<MenuListProps> = (props) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    const alreadyInCart = cartItems.find((cartItem) => cartItem.id === item.id);
    if (alreadyInCart) {
      return;
    }
    setCartItems([...cartItems, item]);
  };

  const updateCart = (id: number, quantity: number) => {
    const newCartItems = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity };
      } else {
        return item;
      }
    });
    setCartItems(newCartItems);
  };

  const deleteCart = (id: number) => {
    if (id === -1) {
      // 장바구니에 있는 모든 아이템을 삭제합니다.
      setCartItems([]);
    } else {
      // 해당 아이템을 삭제합니다.
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    }
  };

  if (!props.menuList) {
    return <Loading />;
  }

  return (
    <Container>
      <MenuListContainer>
        {props.menuList.map((menu, index) => (
          <MenuCard
            key={index}
            id={menu.menuId}
            title={menu.menuName}
            price={menu.menuPrice}
            quantity={menu.menuCount}
            addToCart={addToCart}
          />
        ))}
      </MenuListContainer>

      <MenuCart
        cartItems={cartItems}
        updateCart={updateCart}
        deleteCart={deleteCart}
      />

    </Container>
  );
};

export default MenuList;
