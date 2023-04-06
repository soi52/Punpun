import styled from 'styled-components';
import API from '../../../store/API';
import { useEffect, useState } from 'react';
import MenuModal, { Menu } from './MenuModal';
import defaultMenuImage from '../../../resources/images/profileDefault.png';
import { isUpdatedState } from '../../../store/atoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import { MenuDTO } from '../../../store/types';

interface StoreMenuProps {
  storeMenus: MenuDTO[];
}

const MenuCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
`;

const MenuCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  padding: 16px;
  margin: 0.5rem 1rem 1rem 0.5rem;
  max-width: 175px;
  width: 100%;
  height: 200px;
  cursor: pointer;
  transition: transform 0.75s ease, opacity 0.2s ease;
  perspective: 1000px;
  transform-style: preserve-3d;
  position: relative;
  &:hover {
    transform: rotateY(180deg);
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

const MenuCardFront = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MenuCardBack = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background-color: #e7e6f2;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: rotateY(180deg);
`;

const MenuCardButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const MenuCardButton = styled.button`
  background-color: white;
  color: #546391;
  border: 2px solid #546391;
  border-radius: 4px;
  padding: 5px 10px;
  margin: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: #546391;
    color: white;
  }
`;

function StoreMenu({ storeMenus }: StoreMenuProps) {
  const [isUpdated, setIsUpdated] = useRecoilState(isUpdatedState);
  const [showModal, setShowModal] = useState<{
    mode: 'register' | 'update';
    menu?: Menu; // 선택적으로 Menu 타입의 객체를 포함할 수 있습니다.
  } | null>(null);

  useEffect(() => {
    console.log('storeMenus updated', storeMenus);
  }, []);

  const handleModalClose = () => {
    setShowModal(null);
  };

  const handleEditMenu = (menu: Menu) => {
    setShowModal({ mode: 'update', menu });
  };

  const handleDeleteMenu = (menu: Menu) => {
    if (window.confirm('메뉴를 삭제하시겠습니까?')) {
      API.delete(`stores/menu/${menu.menuId}`)
        .then((response: any) => {
          console.log('메뉴가 삭제되었습니다.');
          setIsUpdated(!isUpdated);
        })
        .catch((error: any) => {
          console.error(error);
        });
    }
  };
  return (
    <>
      <MenuCardContainer>
        {storeMenus.map((menu) => (
          <MenuCard key={menu.menuId}>
            <MenuCardFront>
              <MenuCardImage
                src={menu.menuImage || defaultMenuImage}
                alt={menu.menuName}
              />
              <MenuCardTitle>{menu.menuName}</MenuCardTitle>
              <MenuCardPrice>{menu.menuPrice}원</MenuCardPrice>
            </MenuCardFront>
            <MenuCardBack>
              <MenuCardButtonContainer>
                <MenuCardButton onClick={() => handleEditMenu(menu)}>
                  수정하기
                </MenuCardButton>
                <MenuCardButton onClick={() => handleDeleteMenu(menu)}>
                  삭제하기
                </MenuCardButton>
              </MenuCardButtonContainer>
            </MenuCardBack>
          </MenuCard>
        ))}
        <MenuCard onClick={() => setShowModal({ mode: 'register' })}>
          <MenuCardFront>
            <MenuCardPrice>메뉴를 추가하고 싶다면</MenuCardPrice>
          </MenuCardFront>
          <MenuCardBack>
            <MenuCardTitle>메뉴 추가하기</MenuCardTitle>
            <MenuCardPrice>➕</MenuCardPrice>
          </MenuCardBack>
        </MenuCard>
      </MenuCardContainer>

      {/* 모달 */}
      {showModal && (
        <MenuModal
          onClose={handleModalClose}
          mode={showModal?.mode}
          menu={showModal?.menu}
        />
      )}
    </>
  );
}

export default StoreMenu;
