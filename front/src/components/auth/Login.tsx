import React from 'react';
import kakaoLoginIMG from '../../resources/images/kakao_login.png';

// kakao social login
import { handleLogin } from './OAuth';

const Login = () => {

  return (
    <div>
      <h1>로그인 페이지</h1>
        <img
          src={kakaoLoginIMG}
          alt="kakaologin"
          onClick={handleLogin} />
    </div>
  );
};
export default Login;
