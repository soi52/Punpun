import styled from 'styled-components';

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

// const MenuCardImage = styled.div`
//   width: 100%;
//   border-radius: 4px;
//   margin-bottom: 16px;
//   background-image: url(${(props) => props.image})
//   background-size: cover;
//   background-position: center;
// `;

const MenuCardTitle = styled.div`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 8px;
`;

const MenuCardPrice = styled.div`
  font-size: 14px;
  color: #666666;
`;

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

function StoreMenu({ storeMenus }: StoreMenuProps) {
  return (
    <MenuCardContainer>
      {storeMenus.map((menu) => (
        <div key={menu.menuId}>
          <MenuCardTitle>{menu.menuName}</MenuCardTitle>
          <MenuCardPrice>{menu.menuPrice}원</MenuCardPrice>
        </div>
      ))}
    </MenuCardContainer>
  );
}

export default StoreMenu;
