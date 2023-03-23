import { SelectedMenuProps } from './SelectedMenu';

type SelectedMenuListProps = {
  selectedMenus: SelectedMenuProps[];
  onQuantityChange: (id: number, quantity: number) => void;
  onClearClick: () => void;
};

function SelectedMenuList({
  selectedMenus,
  onQuantityChange,
  onClearClick,
}: SelectedMenuListProps) {
  return (
    <>
      {/* <Header>
        <Title>선택한 메뉴</Title>
        <ClearButton onClick={onClearClick}>전체삭제</ClearButton>
      </Header> */}
      {selectedMenus.length === 0 ? (
        <EmptyMessage>선택한 메뉴가 없습니다.</EmptyMessage>
      ) : (
        selectedMenus.map((menu) => (
          <SelectedMenu
            key={menu.id}
            id={menu.id}
            title={menu.title}
            price={menu.price}
            quantity={menu.quantity}
            onQuantityChange={onQuantityChange}
            onDelete={() => console.log('delete')}
          />
        ))
      )}
    </>
  );
}

export default SelectedMenuList;
