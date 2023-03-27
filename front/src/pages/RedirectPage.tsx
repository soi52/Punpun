import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '../components/auth/Cookie';

function RedirectPage() {
  const navigate = useNavigate();
  const getUrlParameter = (name:string) => {
    // 쿼리 파라미터에서 값을 추출해주는 함수
    let search = window.location.search;
    let params = new URLSearchParams(search);
    return params.get(name);
  };

  useEffect(() => {
    const token = getUrlParameter('accessToken');
    console.log(token);
    
    const accessToken = token || '';
    setCookie('accessToken', accessToken, {
      path: '/',
      secure: true,
      // httpOnly: true,
      sameSite: 'none',
    });
  }, []);
  
  return (
    <div>
      <h1>메인 페이지</h1>
    </div>
  );
}
export default RedirectPage;
