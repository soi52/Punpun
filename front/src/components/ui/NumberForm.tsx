import React, { useState } from 'react';
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

const NumberForm = () => {
  const [error, setError] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`전화번호: ${phoneNumber}`);
    // 유효성 검사
    if (phoneNumber.length !== 11) {
      console.log('전화번호 11자리가 아닙니다.');
      setError('전화번호는 11자리로 입력해야 합니다.');
      alert(error);
      return;
    }

    const blank_pattern = /^\s+|\s+$/g;
    if (phoneNumber.replace(blank_pattern, '') === '') {
      console.log('공백만 입력됨!');
      setError('공백은 사용할 수 없습니다.');
      alert(error);
      return;
    }
    const blank_pattern2 = /[\s]/g;
    if (blank_pattern2.test(phoneNumber) === true) {
      console.log('공백이 포함됨!');
      setError('공백은 사용할 수 없습니다.');
      alert(error);
      return;
    }

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
        ※ 숫자만 입력해 주세요.
        <Input
          id="phone-input"
          type="tel"
          placeholder="010-1234-5678"
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
