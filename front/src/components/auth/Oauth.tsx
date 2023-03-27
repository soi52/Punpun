import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setCookie } from './Cookie';
import axios from 'axios';

const Oauth = () => {
  const code = new URL(window.location.href).searchParams.get('code')
  console.log(code);
  const navigate = useNavigate();
//   const getUrlParameter = (name:any) => {
//     // 쿼리 파라미터에서 값을 추출해주는 함수
//     let search = window.location.search;
//     let params = new URLSearchParams(search);
//     return params.get(name);
//   };

useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`api/code=${code}`);
        const token = res.headers.authorization;
        window.localStorage.setItem('token', token);
        navigate('/kakaoLogin');
      } catch (e) {
        console.error(e);
        navigate('/kakaoLogin');
      }
    })();
  }, []);

//   useEffect(() => {
//     const token = getUrlParameter('accessToken');
//     console.log(token);
    
//     const accessToken = token || '';
//     setCookie('accessToken', accessToken, {
//       path: '/',
//       secure: true,
//       // httpOnly: true,
//       sameSite: 'none',
//     });
//   }, []);
    return(
        <></>
    )
}

export default Oauth;