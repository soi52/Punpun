import React from 'react';
import styled from 'styled-components';

type CartItem = {
  id: number;
  title: string;
  image: string;
  price: number;
};

type MenuCartProps = {
  cartItems: CartItem[];
  onAddToCart: (item: CartItem) => void;
};

const CartContainer = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 16px;
`;

const CartTitle = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 16px;
`;

const CartItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 16px;
`;

const CartItemTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const CartItemImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 4px;
  margin-right: 16px;
`;

const CartItemPrice = styled.div`
  font-size: 16px;
`;

const CartTotalPrice = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-top: 16px;
`;

const MenuCart: React.FC<MenuCartProps> = ({ cartItems }) => {
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <CartContainer>
      <CartTitle>장바구니</CartTitle>
      {cartItems.map((item, index) => (
        <CartItemContainer key={index}>
          <CartItemImage src={item.image} alt={item.title} />
          <CartItemTitle>{item.title}</CartItemTitle>
          <CartItemPrice>{item.price}원</CartItemPrice>
        </CartItemContainer>
      ))}
      <CartTotalPrice>총 가격: {totalPrice}원</CartTotalPrice>
    </CartContainer>
  );
};

export default MenuCart;
