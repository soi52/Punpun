import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { storeState } from '../store/atoms';
import Map from './Map';
import SearchStoreList from './SearchStoreList';
import useGeolocation from './useGeolocation';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  max-height: 100%; /* 컴포넌트의 최대 높이 */
`;

const MapDiv = styled.div`
  margin: auto;
`;

const SearchStore = () => {
  const stores = useRecoilValue(storeState);

  const location = useGeolocation();
  console.log(location);
  const { latitude = 0, longitude = 0 } =
    typeof location === 'object' ? location : {};

  return (
    <Wrapper>
      <MapDiv>
        <Map latitude={latitude} longitude={longitude} stores={stores} />
      </MapDiv>
      <SearchStoreList stores={stores} />
    </Wrapper>
  );
};
export default SearchStore;
