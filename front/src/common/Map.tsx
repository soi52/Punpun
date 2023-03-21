import { MutableRefObject, useEffect, useRef } from 'react';
import useGeolocation from './useGeolocation';
import styled from 'styled-components';

// const Div = styled.div`
//   width: 500px;
//   height: 400px;
//   margin: 0px 20px;
// `;

// declare global {
//   interface Window {
//     kakao: any;
//   }
// }

// const Map = () => {
//   const location: any = useGeolocation();

//   useEffect(() => {
//     const container = document.getElementById('map');
//     const options = {
//       center: new kakao.maps.LatLng(location.latitude, location.longitude),
//       level: 5,
//     };
//     let map = new kakao.maps.Map(container as HTMLElement, options); //지도 생성 및 객체 리턴
//   }, []);
//   return <Div id="map" />;
// };

// export default Map;

const Div = styled.div`
  width: 500px;
  height: 400px;
  margin: 0px 20px;
`;

const Map = () => {
  const mapRef = useRef<HTMLElement | null>(null);
  const location: any = useGeolocation();

  const initMap = () => {
    if (typeof location !== 'string') {
      const container = document.getElementById('map');
      const options = {
        center: new kakao.maps.LatLng(location.latitude, location.longitude),
        level: 2,
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
      (mapRef as MutableRefObject<any>).current = map;
    }
  };

  useEffect(() => {
    kakao.maps.load(() => initMap());
  }, [mapRef, location]);

  return (
    <>
      <Div id="map" />
      <button
        style={{ position: 'relative', zIndex: '3' }}
        onClick={() => initMap()}
      >
        위치
      </button>
    </>
  );
};
export default Map;
