import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setCookie } from './Cookie';

const Oauth = () => {
  const navigate = useNavigate();
  const getUrlParameter = (name:string) => {
    // 쿼리 파라미터에서 값을 추출해주는 함수
    let search = window.location.search;
    let params = new URLSearchParams(search);
    return params.get(name);
  };

  useEffect(() => {
    const token = getUrlParameter('accessToken');
    const refreshToken = getUrlParameter('refreshToken')
    // console.log(token);
    console.log(refreshToken);
    
    const accessToken = token || '';
    setCookie('accessToken', accessToken, {
      path: '/',
      secure: true,
      // httpOnly: true,
      sameSite: 'none',
    });
  }, []);
    return(
        <></>
    )
}

export default Oauth;