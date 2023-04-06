import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import Map from '../../../common/Map';
import API from '../../../store/API';
import {
  isRegisterState,
  isUpdatedState,
  owStoreMenuState,
  selectedStoreState,
} from '../../../store/atoms';
import { Store } from '../../../store/types';
import StoreDetailInfo from '../../ui/StoreDetailInfo';
import StoreInfo from '../StoreInfo';

const Wrapper = styled.div`
  padding: 20px;
`;

const StoreInfoDiv = styled.div`
  display: flex;
`;

const SubmitBox = styled.div`
  display: flex;
  justify-content: end;
`;

const SubmitButton = styled.button`
  width: 100px;
  height: 40px;
  background-color: #000000;
  border-radius: 25px;
  border: none;
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin-right: 50px;
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
    if (selectedStore) {
      API.get(`stores/${selectedStore.storeId}`)
        .then((response) => {
          setStore(response.data);
          setStoreMenus(response.data.menuMemberResponseDTOList);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [isUpdated, selectedStore]);

  const handleStoreUpdate = () => {
    navigate(`/owstore/${selectedStore?.storeId}/update`);
    setSelectedStore(store || null);
    setIsRegister(false);
  };

  return (
    <Wrapper>
      <StoreInfo />
      <StoreDetailInfo storeId={store?.storeId} />
      <SubmitBox>
        <SubmitButton onClick={handleStoreUpdate}>수정하기</SubmitButton>
      </SubmitBox>
    </Wrapper>
  );
}
export default StoreManage;
