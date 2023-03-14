import React from 'react';
import { useNavigate } from 'react-router-dom';

function DebuggingPage() {
  const navigate = useNavigate();

  return (
    <>
      <h1>디버깅 페이지</h1>
      <button onClick={() => navigate('/owstore/0')}>사장님-가게</button>
      <button onClick={() => navigate('/owstore/0/booking')}>
        사장님-예약
      </button>
      <button onClick={() => navigate('/owstorelist')}>
        사장님-가게리스트
      </button>
      <button onClick={() => navigate('/owregister')}>가맹점등록</button>
    </>
  );
}
export default DebuggingPage;
