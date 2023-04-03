import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import API from '../../../store/API';
import {
  Store,
  isRegisterState,
  isUpdatedState,
  owStoreMenuState,
  selectedStoreState,
  updatedStoreState,
} from '../../../store/atoms';
import StoreInfo from '../StoreInfo';
import StoreMenu from './StoreMenu';

const Wrapper = styled.div`
  padding: 20px;
`;

function StoreManage() {
  const navigate = useNavigate();
  const [store, setStore] = useState<Store>();
  const [storeMenus, setStoreMenus] = useRecoilState(owStoreMenuState);
  const [isRegister, setIsRegister] = useRecoilState(isRegisterState);
  const [isUpdated, setIsUpdated] = useRecoilState(isUpdatedState);
  const [selectedStore, setSelectedStore] = useRecoilState(selectedStoreState);

  useEffect(() => {
    setIsUpdated(!isUpdated);
  }, []);

  useEffect(() => {
    API.get(`stores/${selectedStore?.storeId}`)
      .then((response) => {
        setStore(response.data);
        setStoreMenus(response.data.menuMemberResponseDTOList);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [isUpdated, selectedStore]);

  const handleStoreUpdate = () => {
    navigate(`/owstore/${selectedStore?.storeId}/update`);
    setIsRegister(false);
  };

  return (
    <Wrapper>
      <StoreInfo />
      <h2>가게 정보</h2>
      <StoreMenu storeMenus={storeMenus} />
      <p>{store?.storePhoneNumber}</p>
      <p>{store?.storeInfo}</p>
      <p>{store?.storeOpenTime}</p>
      <button onClick={handleStoreUpdate}>수정하기</button>
    </Wrapper>
  );
}
export default StoreManage;
