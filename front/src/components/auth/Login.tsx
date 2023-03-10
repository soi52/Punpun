import React from 'react';
import kakaoLoginIMG from '../resources/images/kakao_login.png';

// kakao social login
import { KAKAO_AUTH_URL } from './OAuth';

const Login = () => {
  return (
    <div>
      <h1> 페이지</h1>
      <a id="kakao-login-btn" href={KAKAO_AUTH_URL}>
        <img src={kakaoLoginIMG} alt="kakaologin" />
      </a>
    </div>
  );
};
export default Login;
