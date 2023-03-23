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
`;

const SearchStore = () => {
  const stores = useRecoilValue(storeState);

  const location = useGeolocation();
  const { latitude = 0, longitude = 0 } =
    typeof location === 'object' ? location : {};

  return (
    <Wrapper>
      <Map latitude={latitude} longitude={longitude} stores={stores} />
      <SearchStoreList stores={stores} />
    </Wrapper>
  );
};
export default SearchStore;
