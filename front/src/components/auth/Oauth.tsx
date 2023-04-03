import { useCallback, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  addressState,
  isChildState,
  isLoggedInState,
  isOwnerState,
  isSupporterState,
  userInfoState,
} from '../../store/atoms';

const Oauth = () => {
  const navigate = useNavigate();
  const [isChild, setIsChild] = useRecoilState(isChildState);
  const [isSupporter, setIsSupporter] = useRecoilState(isSupporterState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const address = useRecoilValue(addressState);
  //   const code = new URL(window.location.href).searchParams.get('code')
  //   console.log(code);
  //   const navigate = useNavigate();

  //   useEffect(() => {
  //     (async () => {
  //       try {
  //         const res = await axios.get(`api/code=${code}`);
  //         const token = res.headers.authorization;
  //         window.localStorage.setItem('token', token);
  //         // navigate('/kakaoLogin');
  //       } catch (e) {
  //         console.error(e);
  //         // navigate('/kakaoLogin');
  //       }
  //     })();
  //   }, []);

  const getUrlParameter = (name: any) => {
    // 쿼리 파라미터에서 값을 추출해주는 함수
    let search = window.location.search;
    let params = new URLSearchParams(search);
    return params.get(name);
  };

  useEffect(() => {
    const token = getUrlParameter('token');
    const accessToken = token || '';
    console.log(accessToken);
    Cookies.set('accessToken', accessToken, {
      expires: 7, // 쿠키 만료 일자
      path: '/', // 쿠키 경로
      secure: true, // HTTPS 프로토콜에서만 전송
      sameSite: 'strict', // SameSite 옵션
      httpOnly: true, // JavaScript를 통한 접근 방지
    });

    const decodedToken: any = jwt_decode(accessToken);
    localStorage.setItem('role', decodedToken.role);

    setUserInfo({
      userId: decodedToken.id,
      userName: decodedToken.name,
      userEmail: decodedToken.email,
      userRole: decodedToken.role,
      userNumber: decodedToken.phoneNumber,
      userSupportedPoint: 0,
      userRemainPoint: 0,
      userArea: '',
      userProfileName: decodedToken.profileName,
      userProfileImage: decodedToken.profileImage,
    });

    if (decodedToken['role'] === 'CHILD') {
      navigate('/chmain');
      setIsChild(true);
      setIsLoggedIn(true);
      console.log(isChild);
      console.log(isLoggedIn);
    } else {
      if (decodedToken.phoneNumber === 'NoNumber') {
        setIsLoggedIn(true);
        setIsSupporter(true);
        navigate('/addnumber');
      } else {
        setIsSupporter(true);
        setIsLoggedIn(true);
        navigate('/');
      }
    }
  }, []);

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);
  return <></>;
};

export default Oauth;
