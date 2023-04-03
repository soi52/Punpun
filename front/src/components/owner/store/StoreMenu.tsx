import styled from 'styled-components';
import API from '../../../store/API';
import { useEffect, useState } from 'react';
import MenuModal, { Menu } from './MenuModal';
import defaultMenuImage from '../../../resources/images/profileDefault.png';
import {
  MenuDTO,
  isUpdatedState,
  selectedStoreState,
} from '../../../store/atoms';
import { useRecoilState, useRecoilValue } from 'recoil';

interface StoreMenuProps {
  storeMenus: MenuDTO[];
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
  height: 280px; // 추가된 속성
  text-align: center; // 추가된 속성
`;

const MenuCardTitle = styled.h4`
  margin-bottom: 0.5rem;
  text-align: center; // 추가된 속성
`;

const MenuCardPrice = styled.p`
  font-weight: bold;
  text-align: center; // 추가된 속성
`;

const MenuCardImage = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
`;

function StoreMenu({ storeMenus }: StoreMenuProps) {
  const selectedStore = useRecoilValue(selectedStoreState);
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
            <MenuCardImage
              src={menu.menuImage || defaultMenuImage}
              alt={menu.menuName}
            />
            <MenuCardTitle>{menu.menuName}</MenuCardTitle>
            <MenuCardPrice>{menu.menuPrice}원</MenuCardPrice>
            <button onClick={() => handleEditMenu(menu)}>수정하기</button>
            <button onClick={() => handleDeleteMenu(menu)}>삭제하기</button>
          </MenuCard>
        ))}
        <MenuCard onClick={() => setShowModal({ mode: 'register' })}>
          <MenuCardTitle>메뉴 추가하기</MenuCardTitle>
          <MenuCardPrice>➕</MenuCardPrice>
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
