import React, { useState } from 'react';
import API from '../../../store/API';
import BookingModal from './BookingModal';
import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

import styled from 'styled-components';

type ChMenu = {
  id: number;
  title: string;
  price: number;
  favoriteMenu: boolean;
};

interface MenuCardImageProps
  extends DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  image: string;
}

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

const MenuCardImage = styled.div<MenuCardImageProps>`
  width: 100%;
  border-radius: 4px;
  margin-bottom: 16px;
  background-image: url(${(props) => props.image})
  background-size: cover;
  background-position: center;
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

const HeartButtonWrapper = styled.div`
  margin-left: 190px;
  background-color: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const ChMenuCard: React.FC<ChMenu> = ({ id, title, price, favoriteMenu }) => {
  const [showModal, setShowModal] = useState(false);
  const [liked, setLiked] = useState(false);

  const onClose = () => {
    setShowModal(false);
  };

  const toggleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setLiked(!liked);
    console.log('liked: ' + liked);

    if (favoriteMenu) {
      API.delete('favors', { data: { menuId: id } })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      API.post('favors', { menuId: id })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleClick = () => {
    setShowModal(true);
    console.log(id);
  };

  return (
    <>
      <MenuCardContainer>
        <div onClick={handleClick}>
          {/* <MenuCardImage image={image}> */}
          <HeartButtonWrapper>
            <button onClick={toggleLike}>{favoriteMenu ? '💖' : '🖤'}</button>
          </HeartButtonWrapper>
          {/* </MenuCardImage> */}
          <div>
            <MenuCardTitle>{title}</MenuCardTitle>
            <MenuCardPrice>{price}원</MenuCardPrice>
          </div>
        </div>
      </MenuCardContainer>
      {showModal && (
        <BookingModal menu={{ id, title, price }} onClose={onClose} />
      )}
    </>
  );
};

export default ChMenuCard;
