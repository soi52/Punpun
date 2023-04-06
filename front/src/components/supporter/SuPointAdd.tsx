import { useState } from 'react';
import styled from 'styled-components';
import API from '../../store/API';
import Swal from 'sweetalert2';

import SuMainMessage from './SuMainMessage';

import { useRecoilState } from 'recoil';
import { pointState } from '../../store/atoms';

const ComponentStyle = styled.div`
  padding: 20px;
`;

const Div = styled.div`
  padding-top: 20px;
`;

const PaymentDiv = styled.div`
  margin-top: 40px;
`;

const PointButton = styled.button`
  margin: 10px;
  width: 100px;
  height: 40px;
  font-size: 16px;
  font-weight: bold;
  color: ${({ selected }: { selected: boolean }) =>
  selected ? 'white' : 'Black'};
  border-radius: 5px;
  border: none;
  background-color: ${({ selected }: { selected: boolean }) =>
  selected ? 'rgba(140, 150, 181, 1)' : '#ffffff'};
  cursor: pointer;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  &:hover,
  &:focus {
    color: white;
    background-color: rgba(140, 150, 181, 1);
  }
`;

const Button = styled.button`
  margin: 50px;
  width: 90px;
  height: 40px;
  font-size: 16px;
  font-weight: bold;
  color: black;
  border-radius: 25px;
  border: none;
  background-color: #e7e6f2;
  cursor: pointer;
  &:hover,
  &:focus {
    color: white;
    background-color: rgba(140, 150, 181, 1);
  }
`;

const Button2Div = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CheckBoxDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 70%;
`;

const SuPointAdd = () => {
  const [selectedPoint, setSelectedPoint] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [point, setPoint] = useRecoilState(pointState);

  const handlePointSelection = (event: any) => {
    setSelectedPoint(parseInt(event.target.value));
  };

  const handlePaymentSelection = (event: any) => {
    setSelectedPayment(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (selectedPoint === 0 || selectedPayment === '') {
      alert('충전 포인트와 결제 수단을 모두 선택해주세요.');
      return;
    }
    console.log(`충전 포인트: ${selectedPoint}, 결제 수단: ${selectedPayment}`);

    try {
      // point post
      await API.post('payments', {
        point: selectedPoint,
      });

      // point get하고 state 변경
      const response = await API.get('payments');
      setPoint(response.data.memberPoint);
      Swal.fire(
        '결제가 완료되었습니다!',
        `${selectedPoint.toLocaleString()}원이 충전되었습니다.`,
        'success'
      )
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '결제 중 오류가 발생했습니다!',
        text: '다시 시도해주세요.',
      })
    }
  };

  const points = [
    { id: 0, name: '10,000', value: 10000 },
    { id: 1, name: '30,000', value: 30000 },
    { id: 2, name: '50,000', value: 50000 },
    { id: 3, name: '70,000', value: 70000 },
    { id: 4, name: '100,000', value: 100000 },
  ];

  return (
    <ComponentStyle>
      <SuMainMessage />
      <Div>
        <h2>충전 포인트</h2>
        <>
          {points.map((point) => (
            <PointButton
              key={point.id}
              name="point"
              value={point.value}
              selected={selectedPoint === point.value}
              onClick={handlePointSelection}
            >
              {point.name} P
            </PointButton>
          ))}
        </>
        <PaymentDiv>
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
        </PaymentDiv>
        <Button2Div>
          <Button onClick={handleSubmit}>충전하기</Button>
        </Button2Div>
      </Div>
    </ComponentStyle>
  );
};

export default SuPointAdd;
