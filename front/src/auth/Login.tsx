import React from 'react';
import kakaoLoginIMG from '../resources/images/kakao_login.png';

const LoginPage: React.FC = () => {
  return (
    <div>
      <h1>메인 페이지</h1>
      <img src={kakaoLoginIMG} alt="kakaologin" />
    </div>
  );
};
export default LoginPage;
