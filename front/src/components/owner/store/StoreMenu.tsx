import styled from 'styled-components';
import API from '../../../store/API';
import { useState } from 'react';
import MenuModal from './MenuModal';
import defaultMenuImage from '../../../resources/images/profileDefault.png';

interface StoreMenuProps {
  storeMenus: {
    menuCount: number;
    menuId: number;
    menuImage: string;
    menuImageName: string;
    menuName: string;
    menuPrice: number;
  }[];
}

const MenuCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const MenuCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 0.5rem;
  margin-bottom: 0.5em;
  padding: 0.5rem;
  width: 150px;
`;

const MenuCardTitle = styled.h4`
  margin-bottom: 0.5rem;
`;

const MenuCardPrice = styled.p`
  font-weight: bold;
`;

const MenuCardImage = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
`;

function StoreMenu({ storeMenus }: StoreMenuProps) {
  const [showModal, setShowModal] = useState(false); // 모달 표시 여부를 관리하는 상태

  const handleModalClose = () => {
    setShowModal(false); // 모달을 닫는 함수
  };

  return (
    <>
      <MenuCardContainer>
        {storeMenus.map((menu) => (
          <MenuCard key={menu.menuId}>
            <MenuCardImage
              src={menu.menuImage || defaultMenuImage}
              alt={menu.menuName}
            />
            <MenuCardTitle>{menu.menuName}</MenuCardTitle>
            <MenuCardPrice>{menu.menuPrice}원</MenuCardPrice>
            <button>수정하기</button>
          </MenuCard>
        ))}
        <MenuCard onClick={() => setShowModal(true)}>
          <MenuCardTitle>메뉴 추가하기</MenuCardTitle>
          <MenuCardPrice>➕</MenuCardPrice>
        </MenuCard>
      </MenuCardContainer>

      {/* 모달 */}
      {showModal && <MenuModal onClose={handleModalClose} />}
    </>
  );
}

export default StoreMenu;
