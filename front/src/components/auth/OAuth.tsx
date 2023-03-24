import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { accessTokenState } from '../../store/atoms';

const CLIENT_ID = 'f5fc41fb0dbb439ad7bfb0e9f0e341cf';
const REDIRECT_ID = 'http://192.168.100.94:8888/login/oauth';

export const handleLogin = () => {
  const redirectUri = encodeURIComponent(`${REDIRECT_ID}/login/oauth`);
  window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code`;
  console.log(localStorage.getItem('accessToken'));
};

function LoginButton() {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [, setAccessToken] = useRecoilState(accessTokenState);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const code = urlSearchParams.get('code');

    if (code) {
      axios
        .post(
          'https://kauth.kakao.com/oauth/token',
          new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: CLIENT_ID,
            redirect_uri: REDIRECT_ID,
            code,
          }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
          }
        )
        .then((response) => {
          const accessToken = response.data.access_token;
          setAccessToken(accessToken); // 액세스 토큰 저장
          localStorage.setItem('accessToken', accessToken); // 로컬 스토리지에 액세스 토큰 저장
          axios
            .get('https://kapi.kakao.com/v2/user/me', {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            })
            .then((response) => {
              setUserInfo(response.data);
            })
            .catch((error) => console.error(error));
        })
        .catch((error) => console.error(error));
    }
  }, []);
}
