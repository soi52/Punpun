import styled from 'styled-components';

const Box = styled.div`
    width: 70%;
    margin: 20px auto;
    border: 1px solid grey;
    border-radius: 25px;
`;

const StyledLi = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const CartContent = styled.div`
  display: flex;
  align-items: center;
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 10px;
  border-radius: 70%;
  overflow: hidden;
  border: 1px solid gray;
`;

const ItemTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
`;

const ItemPrice = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const QuantityButton = styled.button`
  width: 30px;
  height: 30px;
  margin: 0 5px;
  border: none;
  border-radius: 50%;
  background-color: #ddd;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
`;

interface CartItem {
  id: number;
  title: string;
  image: string;
  price: number;
  // quantity: number;
}

interface MenuCartProps {
  cartItems: CartItem[];
}

const MenuCart: React.FC<MenuCartProps> = ({ cartItems }) => {
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <Box>
      {cartItems.map((item, index) => (
        <StyledLi key={index}>
          <CartContent>
            <ItemImage src={item.image} alt={item.title} />
            <ItemTitle>{item.title}</ItemTitle>
            <ItemPrice>{item.price}원</ItemPrice>
          </CartContent>
        </StyledLi>
      ))}
      <div>Total price: {totalPrice}원</div>
    </Box>
  );
};

export default MenuCart;
