import React, { useState, useEffect } from 'react';
import API from '../../../store/API';
import BookingModal from './BookingModal';
import { useRecoilValue } from 'recoil';
import { selectedStoreState } from '../../../store/atoms';
import defaultMenuImage from '../../../resources/images/profileDefault.png';

import styled from 'styled-components';
import Swal from 'sweetalert2';
import { log } from 'console';

type ChMenu = {
  id: number;
  title: string;
  price: number;
  favoriteMenu: boolean;
  menuCount: number;
  menuImageName: string | null;
  menuImage: string | null;
};

const MenuCardContainer = styled.div<{ isDisabled: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => (props.isDisabled ? '#cccccc' : '#ffffff')};
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 16px;
  width: 30%;
  cursor: ${(props) => (props.isDisabled ? 'default' : 'pointer')};
  transition: transform 0.2s ease, opacity 0.2s ease;
  &:hover {
    opacity: ${(props) => (props.isDisabled ? '1' : '0.8')};
    transform: ${(props) => (props.isDisabled ? 'none' : 'scale(1.05)')};
  }
`;

const MenuCardImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
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
  display: flex;
  justify-content: flex-end;
  background-color: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const ChMenuCard: React.FC<ChMenu> = ({
  id,
  title,
  price,
  favoriteMenu,
  menuImage,
  menuImageName,
  menuCount,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [liked, setLiked] = useState(favoriteMenu);

  const onClose = () => {
    setShowModal(false);
  };

  const toggleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setLiked(!liked);

    if (favoriteMenu) {
      API.delete('favors', { data: { menuId: id } })
        .then((response) => {
          setLiked(false);
          Swal.fire(
            '좋아요 취소!',
            '선호메뉴에서 해제되었습니다.',
            'success'
          )
        })
        .catch((error) => {
        });
    } else {
      API.post('favors', { menuId: id })
        .then((response) => {
          setLiked(true);
          Swal.fire(
            '좋아요!',
            '선호메뉴로 등록되었습니다.',
            'success'
          )
        })
        .catch((error) => {
        });
    }
  };

  const handleClick = () => {
    if (!isDisabled) {
      setShowModal(true);
      console.log(id);
    } else {
      Swal.fire({
        icon: 'error',
        title: '활성화 되지 않은 메뉴입니다.',
        text: '다른 메뉴를 선택해주세요!',
      });
    }
  };

  const selectedStore = useRecoilValue(selectedStoreState);
  const isDisabled = !selectedStore?.storeAlwaysShare && menuCount === 0;

  return (
    <>
      <MenuCardContainer isDisabled={isDisabled} onClick={handleClick}>
        <div>
          <HeartButtonWrapper>
            <span onClick={toggleLike}>{liked ? '💖' : '🖤'}</span>
          </HeartButtonWrapper>
          <MenuCardImage
            src={menuImage || defaultMenuImage}
            alt={title}
          />
          <div>
            <MenuCardTitle>{title}</MenuCardTitle>
            <MenuCardPrice>{price.toLocaleString()}원</MenuCardPrice>
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
