import styled from 'styled-components';
import SelectedMenu, { SelectedMenuProps } from './SelectedMenu';

export interface SelectedMenuListProps {
  selectedMenus: SelectedMenuProps[];
  onQuantityChange: (id: number, quantity: number) => void;
  onClearClick: (id: number) => void;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const SelectedMenuListContainer = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const SelectedMenuListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const SelectedMenuList: React.FC<SelectedMenuListProps> = ({
  selectedMenus,
  onQuantityChange,
  onClearClick,
}) => {
  const handleRemoveClick = (menuId: number) => {
    onQuantityChange(menuId, 0);
  };
  const handleQuantityChange = (id: number, quantity: number) => {
    onQuantityChange(id, quantity);
  };

  const handleClearClick = (id: number) => {
    onClearClick(id);
  };

  return (
    <Wrapper>
      <label>Selected Menu List</label>
      {selectedMenus.length === 0 && <div>선택한 메뉴가 없습니다.</div>}
      {selectedMenus.length > 0 && (
        <>
          <SelectedMenuListContainer>
            {selectedMenus.map((menu) => (
              <SelectedMenu
                key={menu.id}
                id={menu.id}
                title={menu.title}
                price={menu.price}
                quantity={menu.quantity}
                onQuantityChange={onQuantityChange}
                onDelete={() => handleRemoveClick(menu.id)}
              />
            ))}
          </SelectedMenuListContainer>
        </>
      )}
    </Wrapper>
  );
};

export default SelectedMenuList;
