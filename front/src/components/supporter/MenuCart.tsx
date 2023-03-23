import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useRecoilState } from 'recoil';
import { pointState } from '../../store/atoms';

const Box = styled.div`
  width: 70%;
  margin: 20px auto;
  border: 1px solid grey;
  border-radius: 25px;
`;

const CartTitle = styled.h2`
  font-weight: bold;
`;

const StyledLi = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const CartContent = styled.div`
  display: flex;
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 10px;
  border-radius: 70%;
  overflow: hidden;
  border: 1px solid gray;
`;

const ItemTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
`;

const ItemPrice = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

const TotalPriceLabel = styled.span`
  font-weight: bold;
  margin-right: 10px;
`;

const TotalPrice = styled.span`
  font-weight: bold;
`;

interface CartItem {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

interface MenuCartProps {
  cartItems: CartItem[];
  updateCart: (id: number, quantity: number) => void;
  deleteCart: (id: number) => void;
}

const MenuCart: React.FC<MenuCartProps> = ({
  cartItems,
  updateCart,
  deleteCart,
}) => {
    const [point, setPoint] = useRecoilState(pointState);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleDonateClick = () => {
    if (totalPrice > point) {
      alert('포인트가 부족합니다. 포인트를 충전해주세요.');
    //   window.location.href = '/charge';
    } else {
      setPoint(point - totalPrice);
      alert(`${totalPrice.toLocaleString()}원이 후원되었습니다. 감사합니다!`);
      deleteCart(-1);
    }
  };

  return (
    <Box>
      <CartTitle>장바구니</CartTitle>
      {cartItems.length === 0 ? (
        <div>장바구니가 비어있습니다.</div>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <StyledLi key={index}>
              <CartContent>
                <ItemImage src={item.image} alt={item.title} />
                <ItemTitle>{item.title}</ItemTitle>
                <ItemPrice>{item.price}원</ItemPrice>
                <button onClick={() => deleteCart(item.id)}>X</button>
              </CartContent>
              <div>
                갯수: {item.quantity}
                <button onClick={() => updateCart(item.id, item.quantity - 1)}>
                  -
                </button>
                <button onClick={() => updateCart(item.id, item.quantity + 1)}>
                  +
                </button>
              </div>
            </StyledLi>
          ))}
          <div>
            <TotalPriceLabel>총 합계</TotalPriceLabel>
            <TotalPrice>{totalPrice.toLocaleString()}원</TotalPrice>
            <button onClick={handleDonateClick}> 후원하기</button>
          </div>
        </>
      )}
    </Box>
  );
};

export default MenuCart;
