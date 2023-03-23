import styled from 'styled-components';

export interface SelectedMenuProps {
  id: number;
  title: string;
  price: number;
  quantity: number;
  onQuantityChange: (id: number, quantity: number) => void;
  onDelete: () => void;
}

const Wrapper = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  margin-right: 10px;
`;

const Price = styled.div`
  margin-right: 10px;
`;

const Quantity = styled.div``;

const Button = styled.button``;

const SelectedMenu = ({
  id,
  title,
  price,
  quantity,
  onQuantityChange,
  onDelete,
}: SelectedMenuProps) => {
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value);
    onQuantityChange(id, newQuantity);
  };

  return (
    <Wrapper>
      <Info>
        <Title>{title}</Title>
        <Price>({price}원)</Price>
        <Quantity>
          수량:
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
          />
        </Quantity>
      </Info>
      <Button onClick={onDelete}>삭제</Button>
    </Wrapper>
  );
};

export default SelectedMenu;
