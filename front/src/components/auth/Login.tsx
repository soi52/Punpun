import React from 'react';
import kakaoLoginIMG from '../../resources/images/kakao_login.png';

// kakao social login
// import { handleLogin } from './OAuth';

const Login = () => {
  const kakaoLogin = "http://192.168.100.94:8888/api/oauth2/authorization/kakao"
  return (
    <div>
      <h1>로그인 페이지</h1>
      {/* <img src={kakaoLoginIMG} alt="kakaologin" onClick={handleLogin} /> */}
      <img src={kakaoLoginIMG} alt="kakaologin" onClick={()=>window.open(kakaoLogin)} />
    </div>
  );
};
export default Login;
