import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { storeState } from '../../../store/atoms';
import MenuCard from '../../ui/MenuCard';
import MenuCart from '../../supporter/MenuCart';

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

type Menu = {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
};

const data: Menu[] = [
  {
    id: 1,
    title: '메뉴1',
    image: 'https://sample.com/menu1.jpg',
    price: 10000,
    quantity: 1,
  },
  {
    id: 2,
    title: '메뉴2',
    image: 'https://sample.com/menu2.jpg',
    price: 12000,
    quantity: 1,
  },
  {
    id: 3,
    title: '메뉴3',
    image: 'https://sample.com/menu3.jpg',
    price: 15000,
    quantity: 1,
  },
  {
    id: 4,
    title: '메뉴4',
    image: 'https://sample.com/menu4.jpg',
    price: 8000,
    quantity: 1,
  },
  {
    id: 5,
    title: '메뉴5',
    image: 'https://sample.com/menu5.jpg',
    price: 11000,
    quantity: 1,
  },
  {
    id: 6,
    title: '메뉴6',
    image: 'https://sample.com/menu6.jpg',
    price: 9000,
    quantity: 1,
  },
];

interface CartItem {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

const MenuList: React.FC = () => {
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

  return (
    <Container>
      <MenuListContainer>
        {data.map((data, index) => (
          <MenuCard
            key={index}
            id={data.id}
            title={data.title}
            image={data.image}
            price={data.price}
            quantity={data.quantity}
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
