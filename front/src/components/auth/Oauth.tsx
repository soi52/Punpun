import { useCallback, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';
import {
  isChildState,
  isLoggedInState,
  isOwnerState,
  isSupporterState,
  userInfoState,
} from '../../store/atoms';
import { decode } from 'punycode';
import useGeolocation from '../../common/UseGeolocation';

const Oauth = () => {
  const navigate = useNavigate();
  const [isChild, setIsChild] = useRecoilState(isChildState);
  const [isSupporter, setIsSupporter] = useRecoilState(isSupporterState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [address, setAddress] = useState('');
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

  const location = useGeolocation();
  const { latitude = 0, longitude = 0 } =
    typeof location === 'object' ? location : {};

  const getAddr = useCallback((lat: any, lng: any) => {
    let geocoder = new kakao.maps.services.Geocoder();

    let coord = new kakao.maps.LatLng(lat, lng);
    let callback = function (result: any, status: any) {
      if (status === kakao.maps.services.Status.OK) {
        const arr = { ...result };
        const _arr =
          arr[0].address.region_1depth_name +
          ' ' +
          arr[0].address.region_2depth_name;
        setAddress(_arr);
      }
    };
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  }, []);

  useEffect(() => {
    getAddr(latitude, longitude);
  }, [getAddr, latitude, longitude]);

  useEffect(() => {
    const token = getUrlParameter('token');

    const accessToken = token || '';
    console.log(accessToken);
    Cookies.set('access_token', accessToken, {
      expires: 7, // 쿠키 만료 일자
      path: '/', // 쿠키 경로
      secure: true, // HTTPS 프로토콜에서만 전송
      sameSite: 'strict', // SameSite 옵션
      httpOnly: true, // JavaScript를 통한 접근 방지
    });

    const decodedToken: any = jwt_decode(accessToken);
    console.log(decodedToken);
    console.log(decodedToken.role);
    console.log(decodedToken['role']);

    setUserInfo({
      userId: decodedToken.id,
      userName: decodedToken.name,
      userEmail: decodedToken.email,
      userLocation: address,
      userRole: decodedToken.role,
      userNumber: decodedToken.phoneNumber,
    });

    if (decodedToken['role'] === 'CHILD') {
      navigate('/');
      setIsChild(true);
      setIsLoggedIn(true);
      console.log(isChild);
      console.log(isLoggedIn);
    } else {
      if (decodedToken.number === 'NoNumber') {
        setIsLoggedIn(true);
        setIsSupporter(true);
        navigate('/addnumber');
      } else {
        setIsSupporter(true);
        setIsLoggedIn(true);
        navigate('/');
      }
    }

    // window.localStorage.setItem('accessToken', accessToken);
    // setCookie('accessToken', accessToken, {
    //   path: '/',
    //   secure: true,
    //   httpOnly: true,
    //   sameSite: 'none',
    // });
  }, [address]);

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);
  return <></>;
};

export default Oauth;
