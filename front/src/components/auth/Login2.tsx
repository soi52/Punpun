import Swal from 'sweetalert2';
import axios from 'axios';
import { getCookie } from './Cookie';

const JWT_EXPIRY_TIME = 24 * 3600 * 1000; // 만료 시간 (24시간 밀리 초로 표현)

export function onLogin() {
  const accessToken = getCookie('accessToken');

  if (accessToken !== undefined) {
    // accessToken header로 설정
  } else {
    // alert('로그인 후 접근 가능해요!');
    Swal.fire({
      icon: 'warning',
      text: '로그인 후 접근 가능해요!',
      width: '80%',
    }).then(function () {
      // navigate(`/SignIn`, {
      //   replace: true,
      // });
      window.location.replace('/login');
    });
  }
  const onSilentRefresh = () => {
    axios
      .post('/user/refresh')
      .then(onLoginSuccess)
      .catch((error) => {
        // console.log('====================================');
        // console.log('AccessToken 재발급 오류: ' + error);
        // console.log('====================================');
      });
  };
  const onLoginSuccess = (response: any) => {
    const { accessToken } = response.data;

    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  };
  // accessToken 만료하기 1분 전에 로그인 연장
  setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60000);
}
