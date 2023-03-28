import React, { useEffect } from 'react';
import kakaoLoginIMG from '../../resources/images/kakao_login.png';

const Login = () => {
  const kakaoLogin =
    'http://j8d109.p.ssafy.io/api/oauth2/authorization/kakao';

  return (
    <div>
      <h1>로그인 페이지</h1>
      <img
        src={kakaoLoginIMG}
        alt="kakaologin"
        onClick={() => window.location.replace(kakaoLogin)}
      />
    </div>
  );
};
export default Login;

  //  로컬 스토리지 저장 방법
  // const query = queryString.parse(window.location.search);
  // console.log(window.location.search);

  // React.useEffect(() => {
  //   if (query.code) {
  //     getKakaoTokenHandler(query.code.toString());
  //   }
  // }, []);
  // const getKakaoTokenHandler = async (code: string) => {
  //   const data: any = {
  //     grant_type: 'authorization_code',
  //     client_id: process.env.REACT_APP_KAKAO_REST_KEY,
  //     redirect_uri: 'redirect URI 입력',
  //     code: code,
  //   };
  //   const queryString = Object.keys(data)
  //     .map(
  //       (k: any) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
  //     )
  //     .join('&');

  //   //토큰 발급 REST API
  //   axios
  //     .post('https://kauth.kakao.com/oauth/token', queryString, {
  //       headers: {
  //         'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
  //       },
  //     })
  //     .then((res) => {
  //       //서버에 토큰 전송
  //       sendKakaoTokenToServer(res.data.access_token);
  //     });
  // };

  // const sendKakaoTokenToServer = (token: string) => {
  //   axios.post('/auth/kakao', { access_token: token }).then((res) => {
  //     if (res.status === 201 || res.status === 200) {
  //       const user = res.data.user;
  //       window.localStorage.setItem(
  //         'token',
  //         JSON.stringify({
  //           access_token: res.data.jwt,
  //         })
  //       );
  //     } else {
  //       window.alert('로그인에 실패하였습니다.');
  //     }
  //   });
  // };