import React from 'react';
import styled from 'styled-components';
import Header from '../components/ui/Header';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  padding-top: 80px;
`;

function DebuggingPage() {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Header />
      <h1>디버깅 페이지</h1>
      <button onClick={() => navigate('/owstore/0')}>사장님-가게</button>
      <button onClick={() => navigate('/owstore/0/booking')}>
        사장님-예약
      </button>
      <button onClick={() => navigate('/owstorelist')}>
        사장님-가게리스트
      </button>
      <button onClick={() => navigate('/owregister')}>가맹점등록</button>
    </Wrapper>
  );
}
export default DebuggingPage;
