import styled from 'styled-components';
import API from '../../store/API';
import { useRecoilState } from 'recoil';
import { pointState } from '../../store/atoms';
import Swal from 'sweetalert2';

const Box = styled.div`
  width: 85%;
  margin: 20px auto;
  // border: 1px solid grey;
  border-radius: 25px;
  // background-color: #f9f9f9;
`;

const CartTitle = styled.h2`
  font-weight: bold;
  color: #2d2d2d;
  margin: 0;
  padding: 20px;
  border-radius: 25px 25px 0 0;
  // background-color: #e6e6e6;
`;

const StyledLi = styled.li`
  display: flex;
  // flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const CartContent = styled.div`
  display: flex;
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

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;

  & > button {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
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
  margin: 0;
`;

const ItemPrice = styled.span`
  font-size: 14px;
  font-weight: 500;
  margin-left: auto;
`;

const TotalPriceLabel = styled.span`
  // font-weight: bold;
  margin-right: 10px;
`;

const TotalPrice = styled.span`
  font-weight: bold;
  // margin-right: 20px;
  // margin-bottom: 10px;
`;

const DonateButton = styled.button`
  border: none;
  outline: none;
  background-color: #5D5A88;
  color: white;
  font-size: 16px;
  font-weight: 600;
  padding: 10px 20px;
  margin-right: 10px;
  border-radius: 25px;
  cursor: pointer;
  align-items: center;
  width: 20%;
  &:hover,
  &:focus {
    color: #5D5A88;
    background-color: #e7e6f2;
  }
`;

const EmptyCartMessage = styled.div`
  padding: 20px;
`;

const FooterDiv = styled.div`
  display: flex;
  // flex-direction: column;
  justify-content: space-between;
  // align-items: space-between;
  margin: 10px;
`;

const TotalPriceDiv = styled.div``;

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

interface MenuCartProps {
  cartItems: CartItem[];
  updateCart: (id: number, quantity: number) => void;
  deleteCart: (id: number) => void;
}

const MenuCart: React.FC<MenuCartProps> = ({
  cartItems,
  updateCart,
  deleteCart,
}) => {
  const [point, setPoint] = useRecoilState(pointState);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleDonateClick = async () => {
    if (totalPrice > point) {
      // console.log(totalPrice, point);
      Swal.fire({
        icon: 'error',
        title: '포인트가 부족합니다.',
        text: '포인트를 충전해주세요.',
      })
    } else {
      try {
        const menuIds = cartItems.map((item) => item.id);
        const menuCounts = cartItems.map((item) => item.quantity);
        const requestBody = {
          menuCount: menuCounts,
          menuId: menuIds,
          usePoint: totalPrice,
        };
        await API.post('supports/payment', requestBody);
        const response = await API.get('payments');
        setPoint(response.data.memberPoint);
        Swal.fire(
          '감사합니다!',
          `${totalPrice.toLocaleString()}원이 후원되었습니다.`,
          'success'
        )
        deleteCart(-1);
      } catch (error) {
        // console.error(error);
        Swal.fire({
          icon: 'error',
          title: '결제 중 오류가 발생했습니다.',
          text: '다시 시도해주세요.',
        })
      }
    }
  };

  return (
    <Box>
      <CartTitle>장바구니</CartTitle>
      <hr />
      {cartItems.length === 0 ? (
        <EmptyCartMessage>장바구니가 비어있습니다.</EmptyCartMessage>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <StyledLi key={index}>
              <CartContent>
                {/* <ItemImage src={item.image} alt={item.title} /> */}
                <ItemTitle>{item.title}</ItemTitle>
                <ItemPrice>　( {item.price}원 )</ItemPrice>
              </CartContent>
              <ButtonGroup>
                <QuantityButton
                  onClick={() => updateCart(item.id, item.quantity - 1)}
                >
                  -
                </QuantityButton>
                {item.quantity}
                <QuantityButton
                  onClick={() => updateCart(item.id, item.quantity + 1)}
                >
                  +
                </QuantityButton>
                <Button onClick={() => deleteCart(item.id)}>삭제</Button>
              </ButtonGroup>
            </StyledLi>
          ))}
          <FooterDiv>
            <TotalPriceDiv>
              <TotalPriceLabel>총 합계</TotalPriceLabel>
              <TotalPrice>{totalPrice.toLocaleString()}원</TotalPrice>
            </TotalPriceDiv>
            <DonateButton onClick={handleDonateClick}> 후원하기</DonateButton>
          </FooterDiv>
        </>
      )}
    </Box>
  );
};

export default MenuCart;
