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
  padding: 10px;
  border: 1px solid lightgray;
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

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Quantity = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const QuantityButton = styled.button`
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  font-size: 16px;
  font-weight: bold;
  background-color: #fff;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #ccc;
    color: #fff;
    border-color: #ccc;
  }
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
  color: #aaa;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: #333;
  }
`;

const SelectedMenu = ({
  id,
  title,
  price,
  quantity,
  onQuantityChange,
  onDelete,
}: SelectedMenuProps) => {
  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(id, quantity - 1);
    }
  };

  const handleQuantityIncrease = () => {
    onQuantityChange(id, quantity + 1);
  };

  return (
    <Wrapper>
      <Info>
        <Title>{title}</Title>
        <Price>({price}원)</Price>
      </Info>
      <ButtonWrapper>
        <Quantity>
          <QuantityButton onClick={handleQuantityDecrease}>-</QuantityButton>
          <Quantity>{quantity}</Quantity>
          <QuantityButton onClick={handleQuantityIncrease}>+</QuantityButton>
        </Quantity>
        <Button onClick={onDelete}>삭제</Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default SelectedMenu;
