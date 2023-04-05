import React, { useState } from 'react';
import API from '../../store/API';
import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

import styled from 'styled-components';
import BookingModal from '../child/storedetail/BookingModal';
import { useRecoilValue } from 'recoil';
import { MenuDTO, isChildState } from '../../store/atoms';
import { useRecoilState } from 'recoil';
import defaultImage from '../../resources/images/profileDefault.png';
import { CartItem } from '../child/storedetail/MenuList';

// interface MenuCardProps extends Menu {
//   key: number;
//   addToCart: (Item: Menu) => void;
// }

export interface MenuCardProps {
  addToCart: (menu: CartItem) => void;
  menu: MenuDTO;
}

const MenuCardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  margin: 0.5rem 1rem 1rem 0.5rem;
  max-width: 175px;
  width: 100%;
  height: 200px;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
  &:hover {
    opacity: 0.8;
    transform: scale(1.05);
  }
`;

const MenuCardTitle = styled.h4`
  margin: 10px 0px 5px 0px;
  text-align: center;
`;

const MenuCardPrice = styled.p`
  font-weight: bold;
  text-align: center;
  margin: 0px 0px 10px 0px;
`;

const MenuCardImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
`;

const MenuCard: React.FC<MenuCardProps> = ({ menu, addToCart }) => {
  const [showModal, setShowModal] = useState(false);
  const [isChild, setIsChild] = useRecoilState(isChildState);

  const role = localStorage.getItem('role');

  const handleClick = () => {
    if (role === 'CHILD') {
      // 어린이 회원일 때 클릭 이벤트
      setShowModal(true);
      console.log(isChild);
      console.log(menu.menuId);
    } else {
      // 어른 회원일 때 클릭 이벤트
      addToCart({
        id: menu?.menuId,
        title: menu.menuName,
        price: menu.menuPrice,
        quantity: 1,
        image: menu.menuImage,
      });
      console.log('장바구니에 상품이 담겼습니다.');
    }
  };

  return (
    <MenuCardContent onClick={handleClick}>
      <MenuCardImage image={menu?.menuImage} />
      <MenuCardTitle>{menu.menuName}</MenuCardTitle>
      <MenuCardPrice>{menu.menuPrice.toLocaleString()}원</MenuCardPrice>
    </MenuCardContent>
  );
};

export default MenuCard;
