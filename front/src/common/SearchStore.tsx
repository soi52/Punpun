import styled from 'styled-components';
import Map from './Map';
import SearchStoreList from './SearchStoreList';
import useGeolocation from './UseGeolocation';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { isRegisterState } from '../store/atoms';
import StoreData from './StoreData.json';
import API from '../store/API';

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

  const location = useGeolocation();
  console.log(location);
  const { latitude = 0, longitude = 0 } =
    typeof location === 'object' ? location : {};

  useEffect(() => {
    setIsRegister(false);
  }, []);

  useEffect(() => {
    const mode = {
      params: {
        mode: 500,
      },
    };
    API.get(`stores/distTest/${longitude}/${latitude}`, mode)
      .then((response: any) => {
        console.log(response.data);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }, [latitude, longitude]);

  return (
    <Wrapper>
      <SearchStoreDiv>가게 찾기</SearchStoreDiv>
      <h3>{message}</h3>
      <ContentDiv>
        <MapDiv>
          <Map latitude={latitude} longitude={longitude} stores={StoreData} />
        </MapDiv>
        <SearchStoreList stores={StoreData} />
      </ContentDiv>
    </Wrapper>
  );
};
export default SearchStore;
