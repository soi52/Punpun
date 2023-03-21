import React, { useRef, useEffect, MutableRefObject } from 'react';
import styled from 'styled-components';
import useGeolocation from './useGeolocation';

const Div = styled.div`
  width: 500px;
  height: 400px;
  margin: 0px 20px;
`;

const Button = styled.button`
  position: relative;
  z-index: 3;
  padding: 10px;
  font-size: 16px;
  line-height: 1;
  border: none;
  background-color: transparent;
`;

// const Map = () => {
//   const mapRef = useRef<kakao.maps.Map | null>(null);
//   const location: any = useGeolocation();

//   const initMap = () => {
//     const handleZoomChanged = () => {
//       const map = mapRef.current;

//       if (map) {
//         const level = map.getLevel();
//         console.log('zoom level changed to ' + level);
//       }
//     };
//     if (typeof location !== 'string') {
//       // 이전 지도 인스턴스의 이벤트 리스너를 제거
//       if (mapRef.current) {
//         kakao.maps.event.removeListener(
//           mapRef.current,
//           'zoom_changed',
//           handleZoomChanged
//         );
//       }

//       const container = document.getElementById('map');
//       const options = {
//         center: new kakao.maps.LatLng(location.latitude, location.longitude),
//         level: 2,
//       };

//       const map = new kakao.maps.Map(container as HTMLElement, options);
//       const markerPosition = new kakao.maps.LatLng(
//         location.latitude,
//         location.longitude
//       );
//       const marker = new kakao.maps.Marker({
//         position: markerPosition,
//       });

//       marker.setMap(map);
//       (mapRef as MutableRefObject<any>).current = map;
//       // 새로운 지도 인스턴스에 이벤트 리스너 등록
//       kakao.maps.event.addListener(map, 'zoom_changed', handleZoomChanged);
//     }
//   };

//   useEffect(() => {
//     kakao.maps.load(() => initMap());
//   }, [mapRef, location]);

//   return (
//     <Div id="map">
//       <Button onClick={() => initMap()}>현재 위치로</Button>
//     </Div>
//   );
// };
// export default Map;
const Map = () => {
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const location: any = useGeolocation();

  const initMap = () => {
    if (typeof location !== 'string') {
      if (mapRef.current === null) {
        const container = document.getElementById('map');
        const options = {
          center: new kakao.maps.LatLng(location.latitude, location.longitude),
          level: 4,
        };
        const map = new kakao.maps.Map(container as HTMLElement, options);
        const markerPosition = new kakao.maps.LatLng(
          location.latitude,
          location.longitude
        );
        const marker = new kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);
        mapRef.current = map;
      } else {
        const center = new kakao.maps.LatLng(
          location.latitude,
          location.longitude
        );
        (mapRef.current as kakao.maps.Map).setCenter(center);
        (mapRef.current as kakao.maps.Map).setLevel(4); // 레벨 값을 2로 변경
      }
    }
  };

  useEffect(() => {
    kakao.maps.load(() => initMap());
  }, [mapRef, location]);

  return (
    <Div id="map">
      <button
        style={{ position: 'relative', zIndex: '3' }}
        onClick={() => initMap()}
      >
        현재 위치로
      </button>
    </Div>
  );
};

export default Map;
