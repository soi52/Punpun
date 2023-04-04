import React, { useState } from 'react';
import styled from 'styled-components';
import MenuCard from '../../ui/MenuCard';
import MenuCart from '../../supporter/MenuCart';
import Loading from '../../ui/Loading';
import { MenuDTO, isUpdatedState } from '../../../store/atoms';
import { useRecoilState } from 'recoil';

const Container = styled.div`
  padding: 20px;
`;

const MenuCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
`;

type MenuListProps = {
  menuDTOList: MenuDTO[];
};

export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

function MenuList({ menuDTOList }: MenuListProps) {
  // MenuListProps | ChMenuListProps로 수정
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    const alreadyInCart = cartItems.find((cartItem) => cartItem.id === item.id);
    if (alreadyInCart) {
      return;
    }
    setCartItems([...cartItems, { ...item, quantity: 1 }]);
  };

  const updateCart = (id: number, quantity: number) => {
    if (quantity < 1) {
      quantity = 1;
    }
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

  if (!menuDTOList) {
    return <Loading />;
  }

  return (
    <>
      <MenuCardContainer>
        {menuDTOList.map((menu) => {
          return <MenuCard addToCart={addToCart} menu={menu} />;
        })}
      </MenuCardContainer>
      <MenuCart
        cartItems={cartItems}
        updateCart={updateCart}
        deleteCart={deleteCart}
      />
    </>
  );
}

export default MenuList;
