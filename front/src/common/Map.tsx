import React, { useRef, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { selectedStoreState } from '../store/atoms';
import { Store } from '../store/types';

const Div = styled.div`
  width: 400px;
  height: 400px;
  margin: 0px 20px;
  border-radius: 25px;
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
  stores: Store[];
};

const Map = ({ latitude, longitude, stores }: MapProps) => {
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const [currentLocationMarker, setCurrentLocationMarker] =
    useState<kakao.maps.Marker | null>(null);
  const storeMarkers = useRef<kakao.maps.Marker[]>([]);

  const initMap = () => {
    if (latitude && longitude && mapRef.current === null) {
      const container = document.getElementById('map');
      const options = {
        center: new kakao.maps.LatLng(latitude, longitude),
        level: 4,
      };
      const map = new kakao.maps.Map(container as HTMLElement, options);

      // 현재 위치에 마커를 찍는 로직 추가
      const currentLocationPosition = new kakao.maps.LatLng(
        latitude,
        longitude
      );

      const marker = new kakao.maps.Marker({
        position: currentLocationPosition,
      });
      marker.setMap(map);

      setCurrentLocationMarker(marker);

      mapRef.current = map;
    } else if (latitude && longitude && mapRef.current !== null) {
      const center = new kakao.maps.LatLng(latitude, longitude);
      (mapRef.current as kakao.maps.Map).setCenter(center);
      (mapRef.current as kakao.maps.Map).setLevel(4);
      if (currentLocationMarker) {
        const currentLocationPosition = new kakao.maps.LatLng(
          latitude,
          longitude
        );
        currentLocationMarker.setPosition(currentLocationPosition);
      }
    }

    // 각 가게들의 위치에 마커를 찍는 로직 추가
    if (stores) {
      stores.forEach((store, index) => {
        if (!storeMarkers.current[index]) {
          const markerPosition = new kakao.maps.LatLng(
            store.storeLat,
            store.storeLon
          );
          const marker = new kakao.maps.Marker({
            position: markerPosition,
          });
          marker.setMap(mapRef.current);
          storeMarkers.current[index] = marker;
        } else {
          storeMarkers.current[index].setPosition(
            new kakao.maps.LatLng(store.storeLat, store.storeLon)
          );
        }
      });
    } else {
      return [];
    }
  };
  useEffect(() => {
    if (latitude && longitude) {
      kakao.maps.load(() => initMap());
    }
  }, [latitude, longitude, stores]);

  return (
    <Div id="map">
      <Button onClick={() => initMap()}>현재 위치로</Button>
    </Div>
  );
};

export default Map;
