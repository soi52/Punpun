import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Map from '../../../common/Map';
import useGeolocation from '../../../common/useGeolocation';
import StoreBanner from './Storebanner';
import StoreHour from './Storehours';
import StoreData from '../../../common/StoreData.json';

const ComponentStyle = styled.div`
  padding: 20px;
`;

const StoreInfo = () => {
  const { storeId } = useParams<{ storeId: string }>();
  // const stores = useRecoilValue(storeState);
  const stores = StoreData
  const currentStore = stores.find((s) => s.storeId === Number(storeId));
  const location = useGeolocation();
  const { latitude = 0, longitude = 0 } =
    typeof location === 'object' ? location : {};

  return (
    <>
      <StoreBanner />
      <ComponentStyle>
        <h2>가게 정보</h2>
        <span>위치</span>
        {currentStore ? (
          <Map
            latitude={currentStore.storeLat}
            longitude={currentStore.storeLon}
            stores={[currentStore]} // 수정된 부분
          />
        ) : (
          <Map latitude={latitude} longitude={longitude} stores={[]} />
        )}
        <StoreHour />
      </ComponentStyle>
    </>
  );
};

export default StoreInfo;
