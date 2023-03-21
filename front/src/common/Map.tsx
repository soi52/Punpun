import { useEffect } from 'react';

import styled from 'styled-components';
import useGeolocation from './useGeolocation';

const Div = styled.div`
  width: 500px;
  height: 400px;
  margin: 0px 20px;
`;

declare global {
  interface Window {
    kakao: any;
  }
}

const Map = () => {
  const location = useGeolocation();

  useEffect(() => {
    let container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    let options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng(36.1071535, 128.4112384), //지도의 중심좌표.
      level: 5, //지도의 레벨(확대, 축소 정도)
    };

    let map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
  }, []);
  return <Div id="map" />;
};

export default Map;
