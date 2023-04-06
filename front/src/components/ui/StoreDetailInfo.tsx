import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import API from '../../store/API';
import Loading from './Loading';
import StoreBanner from '../child/storedetail/Storebanner';
import Map from '../../common/Map';
import StoreHour from '../child/storedetail/Storehours';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  Store,
  isOwnerState,
  isUpdatedState,
  selectedStoreState,
} from '../../store/atoms';

const ComponentStyle = styled.div`
  // padding: 20px;
`;

const Div = styled.div`
  padding-top: 10px;
`;

const ContentDiv = styled.div`
  display: flex;
  // width: 80%
  justify-content: space-between;
`;

const Wrapper = styled.div`
  padding: 20px;
`;

const StoreDetailInfo = () => {
  const { storeId: myStoreId } = useParams<{ storeId: string }>();
  const [isUpdated, setIsUpdated] = useRecoilState(isUpdatedState);
  const isOwner = useRecoilValue(isOwnerState);
  const selectedStore = useRecoilValue(selectedStoreState);
  const [stores, setStores] = useState<Store>();

  useEffect(() => {
    setIsUpdated(!isUpdated);
  }, []);

  useEffect(() => {
    async function fetchStores() {
      try {
        const response = await API.get(`stores/${selectedStore?.storeId}`);
        console.log(response.data);
        setStores(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchStores();
  }, [myStoreId, isUpdated, selectedStore]);

  if (!stores) {
    return <Loading />;
  }

  return (
    <Wrapper>
      {isOwner ? null : <StoreBanner storeName={stores.storeName} />}
      <Div>
        <h2>가게 정보</h2>
        <ComponentStyle>
          <ContentDiv>
            <StoreHour
              storeAddress={stores.storeAddress}
              storeInfo={stores.storeInfo}
              storeOpenTime={stores.storeOpenTime}
              storePhoneNumber={stores.storePhoneNumber}
              storeAlwaysShare={stores.storeAlwaysShare}
            />
            <Map
              latitude={stores.storeLat}
              longitude={stores.storeLon}
              stores={[]}
            />
          </ContentDiv>
        </ComponentStyle>
      </Div>
    </Wrapper>
  );
};

export default StoreDetailInfo;
