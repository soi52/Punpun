import React, { useState } from "react";
import styled from "styled-components";

type MenuCardProps = {
  id: number;
  title: string;
  image: string;
  price: number;
  onAddToCart: (menu: Menu) => void;
};

type Menu = {
  id: number;
  title: string;
  image: string;
  price: number;
};

const MenuCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 16px;
  max-width: 300px;
  cursor: pointer;
`;

const MenuCardImage = styled.img`
  width: 100%;
  border-radius: 4px;
  margin-bottom: 16px;
`;

const MenuCardTitle = styled.div`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 8px;
`;

const MenuCardPrice = styled.div`
  font-size: 14px;
  color: #666666;
`;

const MenuCard: React.FC<MenuCardProps> = ({ id, title, image, price, onAddToCart }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    const menu: Menu = { id, title, image, price };
    onAddToCart(menu);
    setIsSelected(true);
  };

  return (
    <MenuCardContainer onClick={handleClick}>
      <MenuCardImage src={image} alt={title} />
      <div>
        <MenuCardTitle>{title}</MenuCardTitle>
        <MenuCardPrice>{price}원</MenuCardPrice>
      </div>
      {isSelected && <div>선택됨</div>}
    </MenuCardContainer>
  );
};

export default MenuCard;
