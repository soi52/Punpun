import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import useGeolocation from '../../common/UseGeolocation';
import { UserInfo, userInfoState } from '../../store/atoms';

function Address() {
  // const location = useGeolocation();
  // const { latitude = 0, longitude = 0 } =
  //   typeof location === 'object' ? location : {};

  // let geocoder = new kakao.maps.services.Geocoder();
  // let coord = new kakao.maps.LatLng(latitude, longitude);

  // let callback = function (result: any, status: any) {
  //   if (status === kakao.maps.services.Status.OK) {
  //     console.log(result[0].address.region_1depth_name +
  //       ' ' +
  //       result[0].address.region_2depth_name,);

  //     };
  //      // 업데이트된 userInfo 객체를 userInfoState에 반영합니다.
  //   }
  // };

  // geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);

  return null; // Address 컴포넌트는 렌더링할 JSX가 없으므로 null을 반환합니다.
}

export default Address;
