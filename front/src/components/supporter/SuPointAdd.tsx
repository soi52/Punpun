import { useState } from 'react';
import styled from 'styled-components';

import MainTitle from '../ui/MainTitle';
import MainMessage from '../ui/MainMessage';

import { useRecoilState } from 'recoil';
import { pointState } from '../../store/atoms';

const ComponentStyle = styled.div`
  padding: 20px;
`;

const PointButton = styled.button`
  margin: 10px;
  width: 100px;
  height: 40px;
  font-size: 16px;
  font-weight: bold;
  color: black;
  border-radius: 5px;
  border: ${({ selected }: { selected: boolean }) =>
    selected ? '1px solid grey' : 'none'};
  background-color: #ffffff;
  cursor: pointer;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  width: 90px;
  height: 40px;
  font-size: 16px;
  font-weight: bold;
  color: black;
  border-radius: 25px;
  border: none;
  background-color: #e7e6f2;
  cursor: pointer;
`;

const ButtonDiv = styled.div``;

const CheckBoxDiv = styled.div``;

const SuPointAdd = () => {
  const mainMessage = {
    title: '',
    ownerName: '박정은 후원자님',
    message: '어느새 후원한 금액이 10,000원 이네요!',
    name: '정은 후원자님',
  };

  const [selectedPoint, setSelectedPoint] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [point, setPoint] = useRecoilState(pointState);

  const handlePointSelection = (event: any) => {
    setSelectedPoint(parseInt(event.target.value));
  };

  const handlePaymentSelection = (event: any) => {
    setSelectedPayment(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (selectedPoint === 0 || selectedPayment === '') {
      alert('충전 포인트와 결제 수단을 모두 선택해주세요.');
      return;
    }
    console.log(`충전 포인트: ${selectedPoint}, 결제 수단: ${selectedPayment}`);
    const paymentObj = {
      amount: point + selectedPoint,
    };
    setPoint(paymentObj.amount);
  };

  const points = [
    { id: 1, name: '10,000', value: 10000 },
    { id: 2, name: '30,000', value: 30000 },
    { id: 3, name: '50,000', value: 50000 },
    { id: 4, name: '70,000', value: 70000 },
    { id: 5, name: '100,000', value: 100000 },
  ];

  return (
    <ComponentStyle>
      <h2>
        <MainTitle title={`${mainMessage.name} ${mainMessage.title}`} />
      </h2>
      <MainMessage
        message={`${mainMessage.ownerName}, ${mainMessage.message}`}
      />
      <h2>충전 포인트</h2>
      <ButtonDiv>
        {points.map((point) => (
          <PointButton
            name="point"
            value={point.value}
            selected={selectedPoint === point.value}
            onClick={handlePointSelection}
          >
            {point.name} P
          </PointButton>
        ))}
      </ButtonDiv>
      <h2>결제 수단</h2>
      <CheckBoxDiv>
        <label htmlFor="checkbox1">
          <input
            type="radio"
            name="payment"
            value="account"
            checked={selectedPayment === 'account'}
            onChange={handlePaymentSelection}
          />
          계좌이체
        </label>
        <label>
          <input
            type="radio"
            name="payment"
            value="naverpay"
            checked={selectedPayment === 'naverpay'}
            onChange={handlePaymentSelection}
          />
          네이버페이
        </label>
        <label>
          <input
            type="radio"
            name="payment"
            value="kakaopay"
            checked={selectedPayment === 'kakaopay'}
            onChange={handlePaymentSelection}
          />
          카카오페이
        </label>
        <label>
          <input
            type="radio"
            name="payment"
            value="payco"
            checked={selectedPayment === 'payco'}
            onChange={handlePaymentSelection}
          />
          페이코
        </label>
        <label>
          <input
            type="radio"
            name="payment"
            value="toss"
            checked={selectedPayment === 'toss'}
            onChange={handlePaymentSelection}
          />
          TOSS
        </label>
      </CheckBoxDiv>
      <Button onClick={handleSubmit}>충전하기</Button>
    </ComponentStyle>
  );
};

export default SuPointAdd;
