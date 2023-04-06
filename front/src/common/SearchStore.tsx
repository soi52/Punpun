import styled from 'styled-components';
import Map from './Map';
import SearchStoreList from './SearchStoreList';
import useGeolocation from './UseGeolocation';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { isRegisterState, isUpdatedState } from '../store/atoms';
import StoreData from './StoreData.json';
import API from '../store/API';

export interface SearchStore {
  storeAlwaysShare: Boolean;
  storeId: number;
  storeLat: number;
  storeLon: number;
  storeName: string;
  storeSupport: Boolean;
}

type SearchStoreProps = {
  message: string;
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-height: 100%; /* 컴포넌트의 최대 높이 */
`;

const ContentDiv = styled.div`
  display: flex;
`;

const SearchStoreDiv = styled.div`
  font-size: 32px;
  font-weight: bold;
  padding-top: 20px;
`;

const MapDiv = styled.div`
  margin: auto;
`;

const SearchStore = ({ message }: SearchStoreProps) => {
  const [isRegister, setIsRegister] = useRecoilState(isRegisterState);
  const [isUpdated, setIsUpdated] = useRecoilState(isUpdatedState);
  const [searchStoreList, setSearchStoreList] = useState([]);

  useEffect(() => {
    setIsRegister(false);
  }, []);

  const location = useGeolocation();
  console.log(location);
  const { latitude = 0, longitude = 0 } =
    typeof location === 'object' ? location : {};

  useEffect(() => {
    if (longitude !== 0 || latitude !== 0) {
      API.get(`stores/dist/${longitude}/${latitude}`)
        .then((response: any) => {
          console.log(response.data);
          setSearchStoreList(response.data);
          setIsUpdated((prev) => !prev);
        })
        .catch((error: any) => {
          console.error(error);
        });
    }
  }, [latitude, longitude, setIsUpdated]);

  return (
    <Wrapper>
      <SearchStoreDiv>가게 찾기</SearchStoreDiv>
      <h3>{message}</h3>
      <ContentDiv>
        <MapDiv>
          <Map
            latitude={latitude}
            longitude={longitude}
            stores={searchStoreList}
          />
        </MapDiv>
        <SearchStoreList stores={searchStoreList} />
      </ContentDiv>
    </Wrapper>
  );
};

export default SearchStore;
