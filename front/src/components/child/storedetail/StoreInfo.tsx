import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import Map from '../../../common/Map';
import { storeState } from '../../../store/atoms';

import StoreBanner from './Storebanner';

const StoreInfo = () => {
  const { store } = useParams<{ store: string }>();
  const stores = useRecoilValue(storeState);
  const currentStore = stores.find((s) => s.storeId === Number(store));

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
        <p>가게를 찾을 수 없습니다.</p>
      )}
    </>
  );
};

export default StoreInfo;
