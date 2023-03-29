import { useEffect } from 'react';
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
import useGeolocation from '../../common/useGeolocation';

const Oauth = () => {
  const navigate = useNavigate();
  const [isChild, setIsChild] = useRecoilState(isChildState);
  const [isSupporter, setIsSupporter] = useRecoilState(isSupporterState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
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
  console.log(location);
  const { latitude = 0, longitude = 0 } =
    typeof location === 'object' ? location : {};

    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 1 // 지도의 확대 레벨
    };  

// // 지도를 생성합니다    
// var map = new kakao.maps.Map(mapContainer, mapOption); 

// // 주소-좌표 변환 객체를 생성합니다
// var geocoder = new kakao.maps.services.Geocoder();

// var marker = new kakao.maps.Marker(), // 클릭한 위치를 표시할 마커입니다
//     infowindow = new kakao.maps.InfoWindow({zindex:1}); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

// // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
// searchAddrFromCoords(map.getCenter(), displayCenterInfo);

// // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
// kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
//     searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
//         if (status === kakao.maps.services.Status.OK) {
//             var detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
//             detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';
            
//             var content = '<div class="bAddr">' +
//                             '<span class="title">법정동 주소정보</span>' + 
//                             detailAddr + 
//                         '</div>';

//             // 마커를 클릭한 위치에 표시합니다 
//             marker.setPosition(mouseEvent.latLng);
//             marker.setMap(map);

//             // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
//             infowindow.setContent(content);
//             infowindow.open(map, marker);
//         }   
//     });
// });

// // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
// kakao.maps.event.addListener(map, 'idle', function() {
//     searchAddrFromCoords(map.getCenter(), displayCenterInfo);
// });

// function searchAddrFromCoords(coords, callback) {
//     // 좌표로 행정동 주소 정보를 요청합니다
//     geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);         
// }

// function searchDetailAddrFromCoords(coords, callback) {
//     // 좌표로 법정동 상세 주소 정보를 요청합니다
//     geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
// }

// // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
// function displayCenterInfo(result, status) {
//     if (status === kakao.maps.services.Status.OK) {
//         var infoDiv = document.getElementById('centerAddr');

//         for(var i = 0; i < result.length; i++) {
//             // 행정동의 region_type 값은 'H' 이므로
//             if (result[i].region_type === 'H') {
//                 infoDiv.innerHTML = result[i].address_name;
//                 break;
//             }
//         }
//     }    
// }

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
      userLocation: '',
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
  }, []);

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);
  return <></>;
};

export default Oauth;
