import React, { useState } from 'react';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import Cookies from 'js-cookie';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 300px;
  margin: 0 auto;
`;

const InputLabel = styled.label`
  font-size: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid gray;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #0077ff;
  color: white;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #0060b6;
  }
`;

const StyledInput = styled.input`
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  height: 40px;
  padding: 10px;
  font-size: 18px;
  border-radius: 25px;
  border: 1px solid #bdbdbd;
  margin-right: 10px;
`;

const NumberForm = () => {
  const [error, setError] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`전화번호: ${phoneNumber}`);
    // 유효성 검사
    if (phoneNumber.length !== 11) {
      setError('전화번호는 11자리로 입력해야 합니다.');
      Swal.fire({
        icon: 'warning',
        text: '전화번호는 11자리로 입력해야 합니다.',
        width: '30%',
      })
    //   alert('전화번호는 11자리로 입력해야 합니다.');
      return;
    };

    const accessToken = Cookies.get('access_token');
    if (phoneNumber) {
      fetch('https://j8d109.p.ssafy.io/api/user/phone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ phoneNumber }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          // 서버 응답 데이터 처리
        })
        .catch((error) => {
          console.error('There was a problem with the fetch operation:', error);
          // 에러 처리
        });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <InputLabel htmlFor="phone-input">전화번호 입력</InputLabel>
        <StyledInput
          id="phone-input"
          type="number"
          placeholder="※ 숫자만 입력해 주세요."
          value={phoneNumber}
          onChange={handleChange}
          required
        />
        <Button type="submit">전송</Button>
      </Form>
    </>
  );
};

export default NumberForm;
