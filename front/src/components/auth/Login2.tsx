import Swal from 'sweetalert2';
import axios from 'axios';
import { getCookie } from './Cookie';

const JWT_EXPIRY_TIME = 24 * 3600 * 1000; // 만료 시간 (24시간 밀리 초로 표현)

export function onLogin() {
  // const navigate = useNavigate();

//   const accessToken = getCookie('accessToken');

//   if (accessToken !== undefined) {
//     // accessToken header로 설정
//     axios.defaults.headers.common[
//       'Authorization'
//     ] = `Bearer ${accessToken}`;
//   } else {
//     // alert('로그인 후 접근 가능해요!');
//     Swal.fire({
//       icon: 'warning',
//       text: '로그인 후 접근 가능해요!',
//       width: '80%',
//     }).then(function () {
//       // navigate(`/SignIn`, {
//       //   replace: true,
//       // });
//       window.location.replace('/SignIn');
//     });
//   }

  // accessToken 만료하기 1분 전에 로그인 연장
//   setTimeout(onSilentAccess, JWT_EXPIRY_TIME - 60000);
}
