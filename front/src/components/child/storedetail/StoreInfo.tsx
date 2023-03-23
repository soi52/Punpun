import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import Map from '../../../common/Map';
import { storeState } from '../../../store/atoms';

import StoreBanner from './Storebanner';

const StoreInfo = () => {
  const { storeId } = useParams<{ storeId: string }>();
  const stores = useRecoilValue(storeState);
  const currentStore = stores.find((s) => s.storeId === Number(storeId));

  console.log(storeId);
  return (
    <>
      <StoreBanner />
      <h2>가게 정보</h2>
      {currentStore ? (
        <Map
          latitude={currentStore.latitude}
          longitude={currentStore.longitude}
          stores={[currentStore]} // 수정된 부분
        />
      ) : (
        <Map latitude={36.1083353} longitude={128.4181418} stores={[]} />
      )}
    </>
  );
};

export default StoreInfo;
