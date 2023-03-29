import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Map from '../../../common/Map';
import useGeolocation from '../../../common/UseGeolocation';
import StoreBanner from './Storebanner';
import StoreHour from './Storehours';
import { useEffect, useState } from 'react';
import API from '../../../store/API';

const ComponentStyle = styled.div`
  padding: 20px;
`;

type MenuDTO = {
  menuId: number;
  menuName: string;
  menuPrice: number;
  menuCount: number;
};


type Store = {
  storeId: number;
  storeName: string;
  storeOpenTime: string | null;
  storeInfo: string | null;
  storeAddress: string;
  storeLon: number;
  storeLat: number;
  storeImageName: string | null;
  storeImage: string | null;
  storePhoneNumber: string | null;
  menuDTOList: MenuDTO[];
};

const StoreInfo = () => {
  const { storeId: myStoreId } = useParams<{ storeId: string }>();
  const [stores, setStores] = useState<Store>();

  useEffect(() => {
    async function fetchStores() {
      try {
        const response = await API.get(`stores/${myStoreId}`);
        console.log(response.data);
        
        setStores(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchStores();
  }, [myStoreId]);

  const location = useGeolocation();
  const { latitude = 0, longitude = 0 } =
    typeof location === 'object' ? location : {};
    
  if (!stores) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <>
      <StoreBanner storeName={stores.storeName}/>
      <ComponentStyle>
        <h2>가게 정보</h2>
        <span>위치</span>
          <Map latitude={stores.storeLat} longitude={stores.storeLon} stores={[]} />
        <StoreHour />
      </ComponentStyle>
    </>
  );
};

export default StoreInfo;
