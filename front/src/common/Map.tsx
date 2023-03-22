import React, { useRef, useEffect, MutableRefObject } from 'react';
import styled from 'styled-components';

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

type MapProps = {
  latitude: number;
  longitude: number;
};

const Map = ({ latitude, longitude }: MapProps) => {
  const mapRef = useRef<kakao.maps.Map | null>(null);

  const initMap = () => {
    if (latitude && longitude && mapRef.current === null) {
      const container = document.getElementById('map');
      const options = {
        center: new kakao.maps.LatLng(latitude, longitude),
        level: 4,
      };
      const map = new kakao.maps.Map(container as HTMLElement, options);
      const markerPosition = new kakao.maps.LatLng(latitude, longitude);
      const marker = new kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map);
      mapRef.current = map;
    } else if (latitude && longitude && mapRef.current !== null) {
      const center = new kakao.maps.LatLng(latitude, longitude);
      (mapRef.current as kakao.maps.Map).setCenter(center);
      (mapRef.current as kakao.maps.Map).setLevel(4);
    }
  };

  useEffect(() => {
    if (latitude && longitude) {
      kakao.maps.load(() => initMap());
    }
  }, [latitude, longitude]);

  return (
    <Div id="map">
      <Button onClick={() => initMap()}>현재 위치로</Button>
    </Div>
  );
};

export default Map;
