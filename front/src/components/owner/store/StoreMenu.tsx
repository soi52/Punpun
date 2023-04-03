import styled from 'styled-components';

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

function StoreMenu({ storeMenus }: StoreMenuProps) {
  return (
    <MenuCardContainer>
      {storeMenus.map((menu) => (
        <MenuCard key={menu.menuId}>
          <MenuCardTitle>{menu.menuName}</MenuCardTitle>
          <MenuCardPrice>{menu.menuPrice}원</MenuCardPrice>
          <button>수정하기</button>
        </MenuCard>
      ))}
    </MenuCardContainer>
  );
}

export default StoreMenu;
